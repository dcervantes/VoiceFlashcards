let phrases = [];
let currentIndex = 0;
let correctCount = 0;
let errorCount = 0;
let startTime;
let timerInterval;
let currentLanguage = 'en-US'; // Idioma por defecto

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('file-input').addEventListener('change', handleFileSelect, false);
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(event.target.result);
        const workbook = XLSX.read(text, {type: 'string'});
        processWorkbook(workbook);
        nextStep();
    };

    currentLanguage = 'en-US'; // Establece el idioma por defecto para archivos locales
    reader.readAsArrayBuffer(file);
}

function handlePresetFileSelect(filePath, language) {
    fetch(filePath)
        .then(response => response.arrayBuffer())
        .then(data => {
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(data);
            const workbook = XLSX.read(text, {type: 'string'});
            processWorkbook(workbook);
            nextStep();
        })
        .catch(error => console.error('Error al cargar el archivo:', error));

    currentLanguage = language;
}

function processWorkbook(workbook) {
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    const jsonSheet = XLSX.utils.sheet_to_json(worksheet, {header: 1});
    
    // Ignora la primera fila
    phrases = jsonSheet.slice(1).map(row => row[1]).filter(item => item);
    
    if (phrases.length > 0) {
        currentIndex = 0;
        correctCount = 0;
        errorCount = 0;
        updateStats();
        showPhrase();
        resetTimer();
    } else {
        document.getElementById('flashcard').textContent = "No se encontraron frases en la segunda columna.";
    }
}

function nextStep() {
    const currentStep = document.querySelector('.step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
        setTimeout(() => currentStep.style.display = 'none', 500); // Esperar la transición antes de ocultar
    }
    const nextStep = document.getElementById('step-2');
    nextStep.style.display = 'flex';
    setTimeout(() => nextStep.classList.add('active'), 50); // Añadir un pequeño retraso para asegurar la transición
}

function showPhrase() {
    const flashcard = document.getElementById('flashcard');
    flashcard.textContent = phrases[currentIndex];
    flashcard.className = ''; // Clear previous class
    updateProgress();
    document.getElementById('recognized-text').textContent = '';
}

function showPrev() {
    if (currentIndex > 0) {
        currentIndex--;
        showPhrase();
    }
}

function showNext() {
    if (currentIndex < phrases.length - 1) {
        currentIndex++;
        showPhrase();
    } else {
        stopTimer();
        if (recognition) {
            recognition.stop();
        }
        recognizing = false;
        showResults();
    }
}

function showResults() {
    const currentStep = document.querySelector('.step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
        setTimeout(() => currentStep.style.display = 'none', 500); // Esperar la transición antes de ocultar
    }
    document.getElementById('final-correct-count').textContent = correctCount;
    document.getElementById('final-error-count').textContent = errorCount;
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    document.getElementById('final-time').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    const resultsStep = document.getElementById('step-3');
    resultsStep.style.display = 'flex';
    setTimeout(() => resultsStep.classList.add('active'), 50); // Añadir un pequeño retraso para asegurar la transición
}

function retry() {
    const currentStep = document.querySelector('.step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
        setTimeout(() => currentStep.style.display = 'none', 500); // Esperar la transición antes de ocultar
    }
    currentIndex = 0;
    correctCount = 0;
    errorCount = 0;
    updateStats();
    showPhrase();
    resetTimer();
    const retryStep = document.getElementById('step-2');
    retryStep.style.display = 'flex';
    setTimeout(() => retryStep.classList.add('active'), 50); // Añadir un pequeño retraso para asegurar la transición
}

function restart() {
    const currentStep = document.querySelector('.step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
        setTimeout(() => currentStep.style.display = 'none', 500); // Esperar la transición antes de ocultar
    }
    currentIndex = 0;
    correctCount = 0;
    errorCount = 0;
    phrases = [];
    document.getElementById('file-input').value = '';
    const startStep = document.getElementById('step-1');
    startStep.style.display = 'flex';
    setTimeout(() => startStep.classList.add('active'), 50); // Añadir un pequeño retraso para asegurar la transición
}

function updateProgress() {
    const progress = (currentIndex + 1) / phrases.length * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function updateStats() {
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('error-count').textContent = errorCount;
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(function() {
        const elapsedTime = Date.now() - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        document.getElementById('timer').textContent = `Tiempo: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    document.getElementById('timer').textContent = 'Tiempo: 0:00';
    stopTimer();
}
