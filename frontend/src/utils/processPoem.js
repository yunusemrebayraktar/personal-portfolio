// Function to process poem text and replace newlines with <br> tags
export const processPoemContent = (poemText) => {
    return poemText.split("\n").join("<br>");
  };
  