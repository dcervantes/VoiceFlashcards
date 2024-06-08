
# VoiceFlashcards

VoiceFlashcards is a web application designed to help users practice language phrases using speech recognition. Users can load a CSV file with phrases, configure the number of flashcards and levels, and then practice by speaking the phrases aloud. The application supports multiple languages and allows users to monitor their progress and results.

## Features

- Load CSV files with phrases in different languages.
- Configure the number of flashcards and levels (A1 to C2).
- Practice speaking phrases with real-time feedback using speech recognition.
- Display the phrase level on each flashcard.
- Track correct and incorrect responses.
- Timer to track the time spent practicing.
- Options to retry with the same phrases or regenerate new phrases based on the chosen configuration.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   \`\`\`sh
   git clone https://github.com/yourusername/voiceflashcards.git
   \`\`\`
2. Navigate to the project directory:
   \`\`\`sh
   cd voiceflashcards
   \`\`\`
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
\`\`\`csv
Level,Phrase
A1,Hello
A2,How are you?
B1,What is your name?
B2,Where do you live?
C1,Can you help me with this?
C2,This is a complex situation.
\`\`\`

## Screenshots

*Add relevant screenshots of your application here.*

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the open-source community for the tools and libraries used in this project.
- Special thanks to all contributors for their efforts and improvements.

## Contact

For questions or feedback, please contact [yourname](mailto:youremail@example.com).
