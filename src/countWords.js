export function countWords(textareaId) {
  const textarea = document.getElementById(textareaId);
  textarea.addEventListener("input", function () {
    setTimeout(() => {
      const wordCount = textarea.value.trim().split(/\s+/).length;
      document.getElementById("word-count").textContent = wordCount;
    }, 50);
  });
}
