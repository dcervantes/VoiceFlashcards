let recognizing = false;

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
        if (currentIndex < phrases.length - 1) {
            recognition.start();
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
    if (recognizing) {
        recognition.stop();
        return;
    }
    recognition.lang = currentLanguage;
    recognition.start();
}

function checkPhrase(transcript) {
    const flashcard = document.getElementById('flashcard').textContent.trim().toLowerCase();
    const userPhrase = transcript.toLowerCase().replace(/[.,!?]/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normalizedFlashcard = flashcard.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (userPhrase === normalizedFlashcard) {
        document.getElementById('flashcard').classList.add('correct');
        correctCount++;
        showNext();
    } else {
        document.getElementById('flashcard').classList.add('incorrect');
        errorCount++;
        setTimeout(() => {
            document.getElementById('flashcard').classList.remove('incorrect');
        }, 1000);
    }
    updateStats();
}
