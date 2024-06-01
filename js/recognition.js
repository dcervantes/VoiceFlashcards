let recognizing = false;
let recognition;
const correctSound = new Audio('sounds/correct.mp3');
const errorSound = new Audio('sounds/error.mp3');

correctSound.onerror = function() {
    console.error('Error loading correct sound');
};

errorSound.onerror = function() {
    console.error('Error loading error sound');
};

if (!('webkitSpeechRecognition' in window)) {
    alert("Esta aplicación sólo funciona en Google Chrome.");
} else {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = function() {
        recognizing = true;
        document.getElementById('start-rec-btn').classList.add('recording');
    };

    recognition.onerror = function(event) {
        console.error(event.error);
    };

    recognition.onend = function() {
        recognizing = false;
        document.getElementById('start-rec-btn').classList.remove('recording');
        // Restart recognition if there are more phrases to process
        if (currentIndex < phrases.length - 1) {
            setTimeout(() => recognition.start(), 1000); // Delay to avoid capturing TTS
        }
    };

    recognition.onresult = function(event) {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                checkPhrase(event.results[i][0].transcript.trim());
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        document.getElementById('recognized-text').textContent = interimTranscript;
    };
}

function toggleRecognition() {
    if (!recognition) return;
    
    if (recognizing) {
        recognition.stop();
        return;
    }
    recognition.lang = currentLanguage;
    recognition.start();
}

function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,!?¿]/g, '').toLowerCase();
}

function checkPhrase(transcript) {
    const flashcard = document.getElementById('flashcard').textContent.trim().toLowerCase();
    const normalizedFlashcard = normalizeString(flashcard);
    const userPhrase = normalizeString(transcript);

    if (userPhrase === normalizedFlashcard) {
        document.getElementById('flashcard').classList.add('correct');
        correctSound.play().catch(error => {
            console.error('Error playing correct sound:', error);
        });
        correctCount++;
        showNext();
    } else {
        document.getElementById('flashcard').classList.add('incorrect');
        errorSound.play().catch(error => {
            console.error('Error playing error sound:', error);
        });
        errorCount++;
        setTimeout(() => {
            document.getElementById('flashcard').classList.remove('incorrect');
        }, 1000);
    }
    updateStats();
}

function playPhrase() {
    recognition.stop();
    const flashcard = document.getElementById('flashcard').textContent;
    const utterance = new SpeechSynthesisUtterance(flashcard);
    utterance.lang = currentLanguage;
    utterance.onend = function() {
        setTimeout(() => recognition.start(), 1000); // Delay to avoid capturing TTS
    };
    speechSynthesis.speak(utterance);
}
