export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}


export async function pasteText() {
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (err) {
    console.error("Failed to paste text: ", err);
  }
}
