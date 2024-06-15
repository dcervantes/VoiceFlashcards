
# VoiceFlashcards

VoiceFlashcards is a web application designed to help users practice language phrases using speech recognition. Users can load a CSV file with phrases, configure the number of flashcards and levels, and then practice by speaking the phrases aloud. The application supports multiple languages and allows users to monitor their progress and results.

## Features

- Load CSV files with phrases in different languages.
- Configure the number of flashcards and levels (A1 to C2).
- Practice speaking phrases with real-time feedback using speech recognition.
- Display the phrase level on each flashcard.
- Track correct and incorrect responses.
- Options to retry with the same phrases or regenerate new phrases based on the chosen configuration.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/voiceflashcards.git
   ```
2. Navigate to the project directory:
   ```sh
   cd voiceflashcards
   ```
3. Open \`index.html\` in your preferred web browser.

## Usage

1. **Select a CSV File**: On the first step, choose a predefined CSV file or upload your own CSV file with phrases.
2. **Configure Flashcards**: Select the number of flashcards and the levels to include using the slider.
3. **Practice**: Speak the phrases displayed on the flashcards. The application will provide real-time feedback on your responses.
4. **View Results**: After practicing, view your results including the number of correct and incorrect responses and the total time spent.
5. **Retry or Regenerate**: Choose to retry with the same phrases or regenerate new phrases based on the chosen configuration.

## File Format

The CSV file should have the following format:
- The first column should contain the level of the phrase (e.g., A1, A2, B1, B2, C1, C2).
- The second column should contain the phrase.

Example:
```csv
Level,Phrase
A1,Hello
A2,How are you?
B1,What is your name?
B2,Where do you live?
C1,Can you help me with this?
C2,This is a complex situation.
```

## Generating CSV with ChatGPT

You can generate a CSV file with phrases using ChatGPT. Below are the steps and an example prompt to generate a CSV file of phrases in English.

### Example Prompt to Generate a CSV of Phrases in English

```
Generate a CSV file with 20 phrases for each level (A1, A2, B1, B2, C1, C2) in English. The CSV should have two columns: Level and Phrase.
```

### Steps to Generate a CSV with ChatGPT

1. **Prompt ChatGPT**: Use the example prompt above or create your own prompt to ask ChatGPT to generate phrases.
2. **Review and Edit**: Review the generated phrases and make any necessary edits.
3. **Format as CSV**: Ensure the output is formatted correctly as a CSV file with the required columns.
4. **Download CSV**: Download the generated CSV file from ChatGPT.

### Generating a CSV Based on a Document

If you have a document with phrases and levels, you can use ChatGPT to generate a CSV file based on that document.

1. **Upload Document**: Upload your document containing the phrases and levels to ChatGPT.
2. **Prompt ChatGPT**: Use a prompt like the following:
   ```
   Based on the uploaded document, generate a CSV file with the phrases and their corresponding levels. The CSV should have two columns: Level and Phrase.
   ```
3. **Review and Edit**: Review the generated CSV content and make any necessary edits.
4. **Download CSV**: Download the generated CSV file from ChatGPT.

## Screenshots

*Add relevant screenshots of your application here.*

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
