export function changeText(
  e,
  isLoading,
  loadingText = "Saving",
  textContent = "Save"
) {
  const submitButton = e.submitter;
  if (isLoading === true) {
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = textContent;
  }
}
