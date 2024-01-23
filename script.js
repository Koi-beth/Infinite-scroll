const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
 
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash Api
const count = 30;
const apiKey = 'SXSLTLlzEHGWhZvy7LLxcXTmh0-HSI2-mMuCXuqvm3s';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//  Check if all images were loaded
function imageLoaded () {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready =', ready);
  }
}

//  Helper Function to Set Attributes on DOM Elements
function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
 
//  Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
// Create <a> to link to Unsplash
const item = document.createElement('a');
setAttribute(item, {
  href: photo.links.html,
  target: '_blank',
});

// Create <img> for photo
const img = document.createElement('img');
setAttribute(img, {
  src: photo.urls.regular,
  alt: photo.alt_description,
  title: photo.alt_description,
});
// Event Listener, check when each is finished loading
img.addEventListener('load', imageLoaded);

// Put <img> directly inside imageContainer Element
imageContainer.appendChild(img);
imageContainer.appendChild(item);
  });
    
}

// Get photos from Unsplash Api
 async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
 }

// Check to see if scrolling near the bottom of the page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; // Set ready to false to prevent multiple requests
        getPhotos();
        console.log('load more');
    }
});


//  On Load 
getPhotos();




















