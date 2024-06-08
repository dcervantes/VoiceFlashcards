let phrases = [];
let currentIndex = 0;
let correctCount = 0;
let errorCount = 0;
let startTime;
let timerInterval;
let currentLanguage = 'en-US'; // Idioma por defecto
let allPhrases = []; // Para almacenar todas las frases del CSV

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
        goToStep1_5();
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
            goToStep1_5();
        })
        .catch(error => console.error('Error al cargar el archivo:', error));

    currentLanguage = language;
}

function goToStep1() {
    const currentStep = document.querySelector('.step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
        setTimeout(() => currentStep.style.display = 'none', 500); // Esperar la transición antes de ocultar
    }
    const previousStep = document.getElementById('step-1');
    previousStep.style.display = 'flex';
    setTimeout(() => previousStep.classList.add('active'), 50); // Añadir un pequeño retraso para asegurar la transición
}

function processWorkbook(workbook) {
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    const jsonSheet = XLSX.utils.sheet_to_json(worksheet, {header: 1});
    
    // Ignora la primera fila
    allPhrases = jsonSheet.slice(1).map(row => ({ level: row[0], phrase: row[1] })).filter(item => item.phrase);
}

function goToStep1_5() {
    const currentStep = document.querySelector('.step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
        setTimeout(() => currentStep.style.display = 'none', 500); // Esperar la transición antes de ocultar
    }
    const nextStep = document.getElementById('step-1.5');
    nextStep.style.display = 'flex';
    setTimeout(() => nextStep.classList.add('active'), 50); // Añadir un pequeño retraso para asegurar la transición
    // Añadir esta línea
    const initialSliderValue = document.getElementById('level-slider').value;
    updateLevels(initialSliderValue);
}

function updateLevels(value) {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const levelLabels = document.getElementById('level-labels');
    levelLabels.innerHTML = ''; // Limpiar niveles anteriores
    
    for (let i = 0; i < value; i++) {
        const levelElement = document.createElement('span');
        levelElement.textContent = levels[i];
        levelElement.classList.add('selected');
        levelLabels.appendChild(levelElement);
    }
}

function goToStep2() {
    const numFlashcards = parseInt(document.getElementById('num-flashcards').value);
    const levelSliderValue = parseInt(document.getElementById('level-slider').value);
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const selectedLevels = levels.slice(0, levelSliderValue);
    
    // Filtra y selecciona frases aleatorias según la configuración
    const filteredPhrases = allPhrases.filter(item => selectedLevels.includes(item.level));
    phrases = shuffleArray(filteredPhrases).slice(0, numFlashcards);

    const currentStep = document.querySelector('.step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
        setTimeout(() => currentStep.style.display = 'none', 500); // Esperar la transición antes de ocultar
    }
    const nextStep = document.getElementById('step-2');
    nextStep.style.display = 'flex';
    setTimeout(() => nextStep.classList.add('active'), 50); // Añadir un pequeño retraso para asegurar la transición
    
    currentIndex = 0;
    correctCount = 0;
    errorCount = 0;
    updateStats();
    showPhrase();
    resetTimer();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    const flashcardLevel = document.getElementById('flashcard-level');
    const currentPhrase = phrases[currentIndex];

    flashcard.textContent = currentPhrase.phrase;
    flashcard.className = ''; // Clear previous class
    flashcardLevel.textContent = currentPhrase.level; // Mostrar el nivel de la frase

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

function regeneratePhrases() {
    const numFlashcards = parseInt(document.getElementById('num-flashcards').value);
    const levelSliderValue = parseInt(document.getElementById('level-slider').value);
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const selectedLevels = levels.slice(0, levelSliderValue);
    
    // Filtra y selecciona frases aleatorias según la configuración
    const filteredPhrases = allPhrases.filter(item => selectedLevels.includes(item.level));
    phrases = shuffleArray(filteredPhrases).slice(0, numFlashcards);

    retry(); // Llamar a la función retry para reiniciar el paso 2 con las nuevas frases
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
