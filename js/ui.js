function playPhrase() {
    const flashcard = document.getElementById('flashcard').textContent;
    const utterance = new SpeechSynthesisUtterance(flashcard);
    utterance.lang = currentLanguage;
    speechSynthesis.speak(utterance);
}

function toggleSettings() {
    const popup = document.getElementById('settings-popup');
    popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
}
