/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
document.addEventListener('DOMContentLoaded', () => {
  const textArea = document.getElementById('text-area');
  const wordCountEl = document.getElementById('word-count');
  const characterCountEl = document.getElementById('character-count');
  const sentenceCountEl = document.getElementById('sentence-count');
  const pasteButton = document.getElementById('paste-button');
  const copyButton = document.getElementById('copy-button');
  const clearButton = document.getElementById('clear-button');
  const findPhrases = document.getElementById('phrase-button');
  const latToCyr = document.getElementById('latToCyr-button');
  const correctGrammar = document.getElementById('correctGrammar-button');
  const corrErr = document.getElementById('correct-button');

  const updateCounts = () => {
    const wordCount = textArea.value.trim().split(/\s+/).length;
    wordCountEl.innerText = textArea.value.length === 0 ? 'Word Count: 0' : `Word Count: ${wordCount}`;
    const characterCount = textArea.value.length;
    characterCountEl.innerText = `Character Count: ${characterCount}`;
    const sentences = textArea.value.split('.');
    const sentenceCount = textArea.value.length === 0 ? 0 : sentences.length;
    sentenceCountEl.innerText = `Sentence Count: ${sentenceCount}`;
  };

  const copyText = () => {
    navigator.clipboard.writeText(textArea.value).then(
      () => {
        console.log('Text copied to clipboard.');
      },
      (err) => {
        console.error('Failed to copy text: ', err);
      },
    );
  };

  const pasteText = () => {
    navigator.clipboard.readText().then((clipboardText) => {
      textArea.value = clipboardText;
      updateCounts();
    });
  };

  const removeText = () => {
    textArea.value = '';
    updateCounts();
  };

  function showFrequentPhrases() {
    // Retrieve the text from the text area
    const text = document.getElementById('text-area').value;
    // Split the text into an array of words
    const words = text.split(' ');

    // create a map to store the phrases and their frequency
    const phraseFrequency = new Map();

    // iterate through the words and store phrases in the map
    for (let i = 0; i < words.length; i++) {
      for (let j = 2; j <= 5; j++) {
        if (i + j > words.length) {
          break;
        }
        const phrase = words.slice(i, i + j).join(' ');
        if (phraseFrequency.has(phrase)) {
          phraseFrequency.set(phrase, phraseFrequency.get(phrase) + 1);
        } else {
          phraseFrequency.set(phrase, 1);
        }
      }
    }

    // create an array to store the most frequent phrases
    const frequentPhrases = {
      2: [],
      3: [],
      4: [],
      5: [],
    };

    // iterate through the map and add phrases that are repeated more than once to the array
    // eslint-disable-next-line no-restricted-syntax
    for (const [phrase, frequency] of phraseFrequency) {
      if (frequency > 1) {
        const phraseLength = phrase.split(' ').length;
        frequentPhrases[phraseLength].push(`${phrase} - ${frequency} times`);
      }
    }

    // Get the output container element
    const output = document.getElementById('output');

    // Clear any existing content in the output container
    output.innerHTML = '';

    // Loop through the repeated phrases and add them to the output container
    for (const phraseLength in frequentPhrases) {
      if (frequentPhrases[phraseLength].length > 0) {
        const h = document.createElement('h4');
        h.innerHTML = `Phrases with ${phraseLength} words:`;
        output.appendChild(h);
        for (let i = 0; i < frequentPhrases[phraseLength].length; i++) {
          const parts = frequentPhrases[phraseLength][i].split(' - ');
          const phrase = parts[0];
          const count = parts[1].split(' ')[0];
          const p = document.createElement('p');
          p.innerHTML = `${phrase} (repeated ${count} times)`;
          output.appendChild(p);
        }
      }
    }
  }

  function cyrillicConvert() {
    const latinChars = {
      a: '??',
      A: '??',
      b: '??',
      B: '??',
      c: '??',
      C: '??',
      ??: '??',
      ??: '??',
      ??: '??',
      ??: '??',
      d: '??',
      D: '??',
      d??: '??',
      D??: '??',
      ??: '??',
      ??: '??',
      e: '??',
      E: '??',
      f: '??',
      F: '??',
      g: '??',
      G: '??',
      h: '??',
      H: '??',
      i: '??',
      I: '??',
      j: '??',
      J: '??',
      k: '??',
      K: '??',
      l: '??',
      L: '??',
      lj: '??',
      Lj: '??',
      m: '??',
      M: '??',
      n: '??',
      N: '??',
      nj: '??',
      Nj: '??',
      o: '??',
      O: '??',
      p: '??',
      P: '??',
      r: '??',
      R: '??',
      s: '??',
      S: '??',
      ??: '??',
      ??: '??',
      t: '??',
      T: '??',
      u: '??',
      U: '??',
      v: '??',
      V: '??',
      z: '??',
      Z: '??',
      ??: '??',
      ??: '??',
    };

    let convertedText = '';
    const text = textArea.value;

    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const nextLetter = text[i + 1];

      if (latinChars[letter + nextLetter]) {
        convertedText += latinChars[letter + nextLetter];
        i++;
      } else if (latinChars[letter]) {
        convertedText += latinChars[letter];
      } else {
        convertedText += letter;
      }
    }
    textArea.value = convertedText;
  }

  function formatText() {
    let text = textArea.value;
    text = text.replace(
      /([,\.\?\!\:\;\=\-\+\*\$\%\&\(\)])([A-Za-z\u0400-\u04FF])/g,
      '$1 $2',
    ); // Add a space after punctuation
    text = text.replace(/\s+/g, ' '); // Turn many spaces into just one
    text = text.replace(/^(.)|([.!?]\s*)(.)/g, (match, p1, p2, p3) => {
      if (p1) return p1.toUpperCase();
      if (p3) return p2 + p3.toUpperCase();
    }); // Capitalize the beginning of a new sentence
    textArea.value = text;
  }

  let correctWords;

  fetch('correctWords.json')
    .then((response) => response.json())
    .then((data) => {
      correctWords = data;
    });

  function spellCheck() {
    const text = textArea.value;
    const words = text.split(' ');

    for (let i = 0; i < words.length; i++) {
      if (correctWords[words[i].toLowerCase()]) {
        words[i] = correctWords[words[i].toLowerCase()];
      }
    }

    textArea.value = words.join(' ');
  }

  textArea.addEventListener('input', updateCounts);
  pasteButton.addEventListener('click', pasteText);
  copyButton.addEventListener('click', copyText);
  clearButton.addEventListener('click', removeText);
  findPhrases.addEventListener('click', showFrequentPhrases);
  latToCyr.addEventListener('click', cyrillicConvert);
  correctGrammar.addEventListener('click', formatText);
  corrErr.addEventListener('click', spellCheck);
});
