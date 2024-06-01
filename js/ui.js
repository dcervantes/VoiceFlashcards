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


function toggleSettings() {
    const popup = document.getElementById('settings-popup');
    popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
}
