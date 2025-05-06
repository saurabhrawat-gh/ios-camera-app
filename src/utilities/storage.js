export const saveImageBlobToStorage = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = () => {
    const base64data = reader.result;
    const images = JSON.parse(localStorage.getItem("capturedImages") || "[]");
    images.push(base64data);
    localStorage.setItem("capturedImages", JSON.stringify(images));
    window.dispatchEvent(new Event("storage"));
  };
};

export const getSavedImages = () => {
  try {
    const images = JSON.parse(localStorage.getItem("capturedImages") || "[]");
    return Array.isArray(images) ? images : [];
  } catch (error) {
    console.error("Failed to parse saved images", error);
    return [];
  }
};

/* For later use - To delete a particular item from the list based on index */
// export const deleteImageByIndex = (index) => {
//   const images = JSON.parse(localStorage.getItem("capturedImages") || "[]");
//   if (images.length > index) {
//     images.splice(index, 1);
//     localStorage.setItem("capturedImages", JSON.stringify(images));
//     window.dispatchEvent(new Event("storage"));
//   }
// };