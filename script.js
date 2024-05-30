var page = "videos";

function newPage(id) {
    document.getElementById(page).style.display = "none";
    document.getElementById(id).style.display = "block";
    page = id;
}

function showMenu(id) {
  switch(id) {
    case "dropVid": 
      id = "downVid";
      break;
    case "dropQuo":
      id = "downQuo";
      break;
    case "dropGam":
      id = "downGam";
      break;
    case "dropShr":
      id = "downShr";
      break;
  }
  document.getElementById(id).classList.toggle("show");
}