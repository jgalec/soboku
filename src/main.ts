import "./style.css";

async function loadRandomUnsplashImage() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${
        import.meta.env.VITE_UNSPLASH_API_KEY
      }&orientation=landscape&query=landscape`
    );
    if (!response.ok) {
      throw new Error("Error fetching the image from Unsplash");
    }
    const data = await response.json();
    const imageUrl = data.urls.full;

    // Inject HTML into the body
    document.body.innerHTML = `
      <img id="background-image" src="${imageUrl}" alt="${data.description}" />
      <div id="info-container">
        <span id="author-label" class="info-label"><a href="${data.links.html}">Photo by ${data.user.name}</a></span>
      </div>
    `;
  } catch (error) {
    console.error("Error loading the image:", error);
  }
}

// Load image on page load
window.addEventListener("load", loadRandomUnsplashImage);
