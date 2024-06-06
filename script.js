var page = "videos";
var dropdown = "";
var dropPos = [];

document.getElementById(blocker).style.width = screen.width;
document.getElementById(blocker).style.height = screen.height;

function newPage(id) {
  document.getElementById(page).style.display = "none";
  document.getElementById(id).style.display = "block";
  page = id;
}

function showMenu(id) {
  id = "down" + id.slice(4);
  if (dropdown != "") {
    document.getElementById(dropdown).classList.toggle("show");
  }  
  if (dropdown != id) {
    document.getElementById(id).classList.toggle("show");
    dropdown = id;
  } else {
    dropdown = "";
  }
}

function goToPage(id) {
  switch(id.slice(0, 3)) {
    case "Vid":
      newPage("videos");
      break;
    case "Quo":
      newPage("quotes");
      break;
    case "Gam":
      newPage("gaming");
      break;
    case "Shr":
      newPage("shrine");
      break;
  }
}

window.onclick = function(event) {
  console.log(event.target);
  if (!event.target.matches('.arrowImage')) {
    for (let i = 0; i < document.querySelectorAll('.menu').length; i++) {
      if (document.querySelectorAll('.menu')[i].classList.contains('show')) {
        document.querySelectorAll('.menu')[i].classList.remove('show');
        dropdown = "";
      }
    }
  }
}
