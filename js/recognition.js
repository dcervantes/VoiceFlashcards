let recognizing = false;
let recognition;
const correctSound = new Audio('sounds/correct.mp3');
const errorSound = new Audio('sounds/error.mp3');

correctSound.onerror = function () {
    console.error('Error loading correct sound');
};

errorSound.onerror = function () {
    console.error('Error loading error sound');
};

function playActivationSound() {
    const audio = new Audio('sounds/activation-sound.mp3');
    audio.play();
}

if (!('webkitSpeechRecognition' in window)) {
    alert("This app only works on Google Chrome.");
} else {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = function () {
        recognizing = true;
        document.getElementById('start-rec-btn').classList.add('recording');
        document.getElementById('recording-mic1').classList.add('recording');
        document.getElementById('recording-mic2').classList.add('recording');
        document.getElementById('recording-mic-pad').classList.add('recording');
    };

    recognition.onerror = function (event) {
        console.error(event.error);
    };

    recognition.onend = function () {
        recognizing = false;
        document.getElementById('start-rec-btn').classList.remove('recording');
        document.getElementById('recording-mic1').classList.remove('recording');
        document.getElementById('recording-mic2').classList.remove('recording');
        document.getElementById('recording-mic-pad').classList.remove('recording');

        if (currentIndex < phrases.length - 1) {
            setTimeout(() => playPhrase(), 500);
        }
        else {
            if (correctCount == phrases.length - 1) {
                end = true;
                setTimeout(() => playPhrase(), 500);
            }
        }
    };

    recognition.onresult = function (event) {
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
    return str.toLowerCase()
        .replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u')
        .replace(/[^\w\s]|_/g, '')
        .replace(/\s+/g, ' ')
        .replace(/-/g, ' ');
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
        }, 100);
    }
    updateStats();
}
