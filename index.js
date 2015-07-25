var allImages;
var maxIndex;
var imgIndex = 0;
var sideA = 600;
var sideB = 400;

function createImage() {
  var image = document.getElementById("slideshow");
  image.setAttribute('src', allImages[imgIndex].src);

  if(allImages[imgIndex].orientation === "landscape")
  {
    image.setAttribute('width', sideA);
    image.setAttribute('height', sideB);
  }

  else
  {
    image.setAttribute('width', sideB);
    image.setAttribute('height', sideA);
  }

  ++imgIndex;
  if (imgIndex > maxIndex) {
    imgIndex = 0;
  }
}

allImages = [
{"src":"res/images/cat-stirfry.jpg"},
{"src":"res/images/cub-playing.png", "orientation":"landscape", "mood":"cute"},
{"src": "res/images/curious-raccoons.jpg", "orientation":"landscape", "mood":"cute"},
{"src": "res/images/tiger-boop.png", "orientation":"landscape", "mood":"cute"},
{"src": "res/images/tiger-cub.jpg", "orientation":"landscape", "mood":"cute"}
];

maxIndex = allImages.length - 1;

