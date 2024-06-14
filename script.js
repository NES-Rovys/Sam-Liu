var page = "quotes";
var dropdown = "";
var dropPos = [];
var quotes;

document.getElementById("blocker").style.width = screen.width;
document.getElementById("blocker").style.height = screen.height;

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

function signInPage(on) {
  if (on) {
    document.getElementById("blocker").style.display = "block";
    document.getElementById("signin").style.display = "block";
  } else {
    document.getElementById("blocker").style.display = "none";
    document.getElementById("signin").style.display = "none";
  }
}

function getSheet(response) {
  quotes = response.result.values;
  generateQuotes();
}

function generateQuotes() {
  //console.log(quotes);
  var temp = '';
  var search = document.getElementById("search").value;
  if (search == "Search") {
    search = "";
  }
  search = search.toLowerCase();
  //add quotes
  for (let i = 1; i < quotes.length; i++) {
    if ((quotes[i][0] + quotes[i][3] + quotes[i][6]).toLowerCase().includes(search)) {
      temp += '<tr><td class="quoteBody"><p class="quoteText">' + quotes[i][0] + "<br>- " + quotes[i][1] + quotes[i][2];
    if (quotes[i][4] != undefined & quotes[i][4] != "") {
      if (quotes[i][3] == undefined | quotes[i][3] == "") {
        temp += " " + quotes[i][4];
      } else {
        temp += "<br><br>" + quotes[i][3] + "<br>- " + quotes[i][4] + quotes[i][5];
      }
      if (quotes[i][7] != undefined & quotes[i][7] != "") {
        if (quotes[i][6] == undefined | quotes[i][6] == "") {
          temp += " " + quotes[i][7];
        } else {
          temp += "<br><br>" + quotes[i][6] + "<br>- " + quotes[i][7];
        }
      }
    }

    // add tags
    temp += '</p><br><div style="display: flex;"><p class="quoteTag">' + quotes[i][8] + '</p>';
    if (quotes[i][9] != undefined) {
      temp += '<p class="quoteTag">' + quotes[i][9] + '</p>';
      if (quotes[i][10] != undefined) {
        temp += '<p class="quoteTag">' + quotes[i][10] + '</p>'; 
      }
    }
    temp += '<br></div></td></tr>';
    }
  }
  document.getElementById("quoteRows").innerHTML = temp;
}