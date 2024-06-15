let phrases = [];
let currentIndex = 0;
let correctCount = 0;
let errorCount = 0;
let startTime;
let currentLanguage = 'en-US';
let allPhrases = [];
let end = false;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('step-1').style.display = 'flex';
});

function showUploadPopup() {
    document.getElementById('upload-popup').style.display = 'flex';
}

function closeUploadPopup() {
    document.getElementById('upload-popup').style.display = 'none';
}

function handleFileSelectFromPopup() {
    const fileInput = document.getElementById('file-input-popup');
    const selectedFile = fileInput.files[0];
    const selectedLanguage = document.getElementById('language-select').value;

    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(event.target.result);
            const workbook = XLSX.read(text, { type: 'string' });
            processWorkbook(workbook);
            currentLanguage = selectedLanguage;
            goToStep1_5();
        };

        reader.readAsArrayBuffer(selectedFile);
    }
    closeUploadPopup();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(event.target.result);
        const workbook = XLSX.read(text, { type: 'string' });
        processWorkbook(workbook);
        goToStep1_5();
    };

    currentLanguage = 'en-US';
    reader.readAsArrayBuffer(file);
}

function handlePresetFileSelect(filePath, language) {
    fetch(filePath)
        .then(response => response.arrayBuffer())
        .then(data => {
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(data);
            const workbook = XLSX.read(text, { type: 'string' });
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
        setTimeout(() => currentStep.style.display = 'none', 500);
    }
    const previousStep = document.getElementById('step-1');
    previousStep.style.display = 'flex';
    setTimeout(() => previousStep.classList.add('active'), 50);
}

function processWorkbook(workbook) {
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    const jsonSheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Ignora la primera fila
    allPhrases = jsonSheet.slice(1).map(row => ({ level: row[0], phrase: row[1] })).filter(item => item.phrase);
}

function goToStep1_5() {
    const currentStep = document.querySelector('.step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
        setTimeout(() => currentStep.style.display = 'none', 500);
    }
    const nextStep = document.getElementById('step-1.5');
    nextStep.style.display = 'flex';
    setTimeout(() => nextStep.classList.add('active'), 50);
    // Añadir esta línea
    const initialSliderValue = document.getElementById('level-slider').value;
    updateLevels(initialSliderValue);
}

function updateLevels(value) {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const levelLabels = document.getElementById('level-labels');
    levelLabels.innerHTML = '';

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

    const filteredPhrases = allPhrases.filter(item => selectedLevels.includes(item.level));
    phrases = shuffleArray(filteredPhrases).slice(0, numFlashcards);

    const currentStep = document.querySelector('.step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
        setTimeout(() => currentStep.style.display = 'none', 500);
    }
    const nextStep = document.getElementById('step-2');
    nextStep.style.display = 'flex';
    setTimeout(() => nextStep.classList.add('active'), 50);

    document.getElementById('progress-bar').style.display = 'block';

    currentIndex = 0;
    correctCount = 0;
    errorCount = 0;
    end = false;
    updateStats();
    resetCountdown();
    startCountdown();
}

function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    countdownElement.style.display = 'block';
    let countdown = 3;
    countdownElement.textContent = countdown;

    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownElement.textContent = countdown;
        } else {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none';
            showPhrase();
            playPhrase();
        }
    }, 1000);
}

function resetCountdown() {
    const countdownElement = document.getElementById('countdown');
    countdownElement.style.display = 'none';
    countdownElement.textContent = '3';
}

function playPhrase() {
    const currentPhrase = phrases[currentIndex].phrase;
    const utterance = new SpeechSynthesisUtterance(currentPhrase);
    utterance.lang = currentLanguage;

    utterance.onend = function () {
        playActivationSound();
        setTimeout(toggleRecognition, 1000);
    };

    window.speechSynthesis.speak(utterance);
}

function showPhrase() {
    const flashcard = document.getElementById('flashcard');
    const flashcardLevel = document.getElementById('flashcard-level');
    const currentPhrase = phrases[currentIndex];

    flashcard.textContent = currentPhrase.phrase;
    flashcard.className = '';

    if (currentPhrase.level) {
        flashcardLevel.textContent = currentPhrase.level;
        flashcardLevel.style.display = 'block';
        flashcard.style.display = 'block';
    } else {
        flashcardLevel.textContent = '';
        flashcardLevel.style.display = 'none';
        flashcard.style.display = 'none';
    }
    updateProgress();
    document.getElementById('recognized-text').textContent = '';
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
        setTimeout(() => currentStep.style.display = 'none', 500);
    }
    const nextStep = document.getElementById('step-2');
    nextStep.style.display = 'flex';
    setTimeout(() => nextStep.classList.add('active'), 50);
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
        setTimeout(() => currentStep.style.display = 'none', 500);
    }
    document.getElementById('final-correct-count').textContent = correctCount;
    document.getElementById('final-error-count').textContent = errorCount;
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    document.getElementById('final-time').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    const resultsStep = document.getElementById('step-3');
    resultsStep.style.display = 'flex';
    setTimeout(() => resultsStep.classList.add('active'), 50);
}

function retry() {
    const currentStep = document.querySelector('.step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
        setTimeout(() => currentStep.style.display = 'none', 500);
    }
    currentIndex = 0;
    correctCount = 0;
    errorCount = 0;
    end = false;
    updateStats();
    showPhrase();
    const retryStep = document.getElementById('step-2');
    retryStep.style.display = 'flex';
    setTimeout(() => retryStep.classList.add('active'), 50);
    playPhrase();
}

function regeneratePhrases() {
    const numFlashcards = parseInt(document.getElementById('num-flashcards').value);
    const levelSliderValue = parseInt(document.getElementById('level-slider').value);
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const selectedLevels = levels.slice(0, levelSliderValue);

    const filteredPhrases = allPhrases.filter(item => selectedLevels.includes(item.level));
    phrases = shuffleArray(filteredPhrases).slice(0, numFlashcards);

    retry();
}

function restart() {
    const currentStep = document.querySelector('.step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
        setTimeout(() => currentStep.style.display = 'none', 500);
    }
    currentIndex = 0;
    correctCount = 0;
    errorCount = 0;
    end = false;
    phrases = [];
    document.getElementById('file-input-popup').value = '';
    const startStep = document.getElementById('step-1');
    startStep.style.display = 'flex';
    setTimeout(() => startStep.classList.add('active'), 50);
}


function updateProgress() {
    const progress = (currentIndex + 1) / phrases.length * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function updateStats() {
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('error-count').textContent = errorCount;
}




