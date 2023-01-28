document.addEventListener("DOMContentLoaded", () => {
  const textArea = document.getElementById("text-area");
  const wordCountEl = document.getElementById("word-count");
  const characterCountEl = document.getElementById("character-count");
  const sentenceCountEl = document.getElementById("sentence-count");
  const pasteButton = document.getElementById("paste-button");
  const copyButton = document.getElementById("copy-button");
  const clearButton = document.getElementById("clear-button");
  const findPhrases = document.getElementById("phrase-button");

  const updateCounts = () => {
    const wordCount = textArea.value.trim().split(/\s+/).length;
    wordCountEl.innerText = textArea.value.length === 0 ? `Word Count: 0` : `Word Count: ${wordCount}`;
    const characterCount = textArea.value.length;
    characterCountEl.innerText =  `Character Count: ${characterCount}`;
    const sentences = textArea.value.split(".");
    const sentenceCount = textArea.value.length === 0 ? 0 : sentences.length;
    sentenceCountEl.innerText = `Sentence Count: ${sentenceCount}`;
  };

  const copyText = () => {
    navigator.clipboard.writeText(textArea.value).then(
      () => {
        console.log("Text copied to clipboard.");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  const pasteText = () => {
    navigator.clipboard.readText().then((clipboardText) => {
      textArea.value = clipboardText;
      updateCounts();
    });
  };

  const removeText = () => {
    textArea.value = "";
    updateCounts();
  };

function showFrequentPhrases() {
  // Retrieve the text from the text area
  const text = document.getElementById("text-area").value;
  // Split the text into an array of words
  const words = text.split(" ");

  // create a map to store the phrases and their frequency
  const phraseFrequency = new Map();

  // iterate through the words and store phrases in the map
  for (let i = 0; i < words.length; i++) {
    for (let j = 2; j <= 5; j++) {
      if (i + j > words.length) {
        break;
      }
      let phrase = words.slice(i, i + j).join(" ");
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
  for (const [phrase, frequency] of phraseFrequency) {
    if (frequency > 1) {
      const phraseLength = phrase.split(" ").length;
      frequentPhrases[phraseLength].push(`${phrase} - ${frequency} times`);
    }
  }

  // Get the output container element
  var output = document.getElementById("output");

  // Clear any existing content in the output container
  output.innerHTML = "";

  // Loop through the repeated phrases and add them to the output container
  for (let phraseLength in frequentPhrases) {
    if (frequentPhrases[phraseLength].length > 0) {
      var h = document.createElement("h3");
      h.innerHTML = `Phrases with ${phraseLength} words:`;
      output.appendChild(h);
      for (var i = 0; i < frequentPhrases[phraseLength].length; i++) {
        var parts = frequentPhrases[phraseLength][i].split(" - ");
        var phrase = parts[0];
        var count = parts[1].split(" ")[0];
        var p = document.createElement("p");
        p.innerHTML = phrase + " (repeated " + count + " times)";
        output.appendChild(p);
      }
    }
  }
}






  textArea.addEventListener("input", updateCounts);

  pasteButton.addEventListener("click", pasteText);
  copyButton.addEventListener("click", copyText);
  clearButton.addEventListener("click", removeText);
  findPhrases.addEventListener("click", showFrequentPhrases);
});
