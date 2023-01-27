export function correctGrammar(text) {
  let result = {
    correct: [],
    incorrect: [],
  };

  // Create a RegExp to match all words or phrases in the JSON file
  const regex = new RegExp(/\b([\w\s]+)\b/g);

  // Loop through the text, looking for matches
  let match;
  while ((match = regex.exec(text))) {
    // Check if the word or phrase is correctly written in Serbian Cyrillic
    if (isCorrect(match[1])) {
      result.correct.push(match[1]);
    } else {
      result.incorrect.push(match[1]);
    }
  }

  // Return the corrected text
  return correctText(text, result.correct, result.incorrect);
}

function isCorrect(word) {
  // Check if the word or phrase is correctly written in Serbian Cyrillic
  // ...
}

function correctText(text, correct, incorrect) {
  // Replace all incorrect words or phrases with the correct ones
  // ...

  return correctedText;
}