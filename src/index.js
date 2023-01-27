document.addEventListener("DOMContentLoaded", () => {
  const textArea = document.getElementById("text-area");
  const wordCountEl = document.getElementById("word-count");
  const characterCountEl = document.getElementById("character-count");
  const sentenceCountEl = document.getElementById("sentence-count");
  const pasteButton = document.getElementById("paste-button");
  const copyButton = document.getElementById("copy-button");
  const clearButton = document.getElementById("clear-button");

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

  textArea.addEventListener("input", updateCounts);

  pasteButton.addEventListener("click", pasteText);
  copyButton.addEventListener("click", copyText);
  clearButton.addEventListener("click", removeText);
});
