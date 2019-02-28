// const html = document.documentElement;
var html = document.getElementsByTagName("BODY")[0];
const images_container = document.querySelector(".images-container");
const image_grid = document.querySelector(".image-grid");
const photos = document.querySelectorAll(".photo");
var img_source;
var modal;

//               FUNCTIONS LIST                        //

function closeModal() {
  modal.classList.remove("appear");
  image_grid.classList.toggle("darken");
}

function grabsource() {
  img_source = this.src;
}

//                EVENT LISTENERS                  //

// images_container.addEventListener("click", closeModal);
for (var j = 0; j < photos.length; j++) {
  photos[j].addEventListener("click", grabsource);
  photos[j].addEventListener("click", makeThatShitAppear);
}

function makeThatShitAppear() {
  var vpHeight = window.innerHeight;
  var vpWidth = window.innerWidth;
  var nudgeLengthX = vpWidth / 2;
  var nudgeLengthY = vpHeight / 2;

  function applybg() {
    modal.style.backgroundImage = "url(" + img_source + ")";
    modal.style.backgroundSize = "cover";
    modal.style.backgroundPosition = "center";
  }

  if (!html.contains(modal)) {
    modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    html.appendChild(modal);
    modal.style.top = nudgeLengthY + "px";
    modal.style.left = nudgeLengthX + "px";
    setTimeout(function() {
      modal.classList.add("modal2build");
    }, 1);
    setTimeout(function() {
      modal.classList.add("modal2appear");
      applybg();
      image_grid.classList.toggle('darken');
      html.classList.toggle('noScroll');
    }, 50);
  } else if (html.contains(modal)) {
    modal.style.transform = "translate(-50%, -50%) scale(0)";
    setTimeout(function() {
      html.removeChild(modal);
      image_grid.classList.toggle('darken');
      html.classList.toggle('noScroll');
    }, 200);
  }
}
