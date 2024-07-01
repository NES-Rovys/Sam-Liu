var page = "quotes";
var dropdown = "";
var dropPos = [];
var quotes;
var names = [];
var nameCount = [];
var nameOff = [];
var nOnCount = 0;
var tags = [];
var tagCount = [];
var tagOff = [];
var tOnCount = 0;
var permNames = [];
var permTags = [];
var search = 2;
var stopper = true;
var themeId = 0;
var themes = [["#0b0a4f", "#072f85", "#096db5", "white"], ["#220278", "#8831ad", "#de5fd5", "black"], ["#220278", "#8831ad", "#de5fd5", "white"], ["#6b0202", "#c23917", "#f0782e", "black"], ["#f5f2f0", "#4dc48c", "#1c989c", "white"]];
var theObj = [["body", ".signin", ".searchTags", ".searchDiv"], [".tabs", ".reviewButton", ".menu", ".quoteTab", ".searchTable"], [".doco", ".quoteTag"], [".docHead", ".docText", ".reviewHead", ".reviewButton", ".reviewTitle", ".reviewDesc", ".reviewName", ".gameTitle", ".gameLink"]];
var logo = ["blue.png", "multiblack.png", "multiwhite.png", "red.png", "white.png"];

if (localStorage.currentId != undefined) {
  themeId = localStorage.currentId;
} else {
  localStorage.currentId = 0;
}

changeTheme(themeId);

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
  for (let i = 0; i < nameCount.length; i++) {
    nameCount[i] = 0;
  }
  for (let i = 0; i < tagCount.length; i++) {
    tagCount[i] = 0;
  }
  if (search == "Search" | stopper) {
    search = "";
  }
  search = search.toLowerCase();
  //add quotes
  for (let i = 1; i < quotes.length; i++) {
    if ((quotes[i][0] + quotes[i][3] + quotes[i][6]).toLowerCase().includes(search)) {
      if (addToArray(quotes[i])) {
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
        if (quotes[i][9] != undefined & quotes[i][9] != "") {
          temp += '<p class="quoteTag">' + quotes[i][9] + '</p>';
          if (quotes[i][10] != undefined & quotes[i][10] != "") {
            temp += '<p class="quoteTag">' + quotes[i][10] + '</p>'; 
          }
        }
        temp += '<br></div></td></tr>';
      }
    }
  }
  document.getElementById("quoteRows").innerHTML = temp;
  if (stopper) {
    for (let i = 0; i < names.length; i++) {
      nameOff[i] = true;
    }
    for (let i = 0; i < tags.length; i++) {
      tagOff[i] = true;
    }
    permNames = names;
    permTags = tags;
    stopper = false;
  }

  var cssClass = document.querySelectorAll(".quoteTag");
  for (let i = 0; i < cssClass.length; i++) {
    cssClass[i].style.backgroundColor = themes[themeId][2];
    cssClass[i].style.color = themes[themeId][3];
    cssClass[i].style.border = "2px solid " + themes[themeId][3];
  }
}

function addToArray(quote) {
  var check = [false];
  var applied = [1, 4, 7];
  var enter = true;

  if (checkIfOff(quote, permNames, nameOff, nOnCount)) {
    enter = false;
  }
  if (checkIfOff(quote, permTags, tagOff, tOnCount)) {
    enter = false;
  }
  if (enter) {
    if (quote[11] != undefined & quote[11] != "") {
      for (let i = 0; i < quote[11].length; i++) {
        check[i] = false;
      }
    }
    for (let j = 0; j < applied.length; j++) {
      for (let i = 0; i < names.length; i++) {
        if (names[i] == quote[applied[j]]) {
          nameCount[i]++;
          check[j] = true;
        }
      }
    }
    for (let i = 0; i < check.length; check++) {
      if (!check[i]) {
        nameCount[names.length] = 1;
        names[names.length] = quote[applied[i]];
      }
    }
    
    check = [];
    if (quote[9] != undefined & quote[9] != "") {
      if (quote[10] != undefined & quote[10] != "") {
        check = [false, false, false];
      } else {
        check = [false, false];
      }
    } else {
      check = [false];
    }
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] == quote[8]) {
        tagCount[i]++;
        check[0] = true;
      } else if (tags[i] == quote[9]) {
        tagCount[i]++;
        check[1] = true;
      } else if (tags[i] == quote[10]) {
        tagCount[i]++;
        check[2] = true;
      }
    }
    for (let i = 0; i < check.length; i++) {
      if (!check[i]) {
        tagCount[tags.length] = 1;
        tags[tags.length] = quote[i + 8];
      }
    }
    //console.log(names, nameCount);
    //console.log(tags, tagCount);
    return true;
  }
  return false;
}

function arrayCheck(item, array) {
  for (let i = 0; i < array.length; i++) {
    if (item == array[i]) {
      return true;
    }
  }
  return false;
}

function searchFor(check, swap) {
  var temp = "";
  var array = [];
  var count = [];
  if (check == 0) {
    array = permNames;
    count = nameCount;
  } else {
    array = permTags;
    count = tagCount;
  }
  if (!stopper) {
    for (let i = 0; i < array.length; i++) {
      if (count[i] == undefined | count[i] == NaN) {
        count[i] = 0;
      }
      if (i % 3 == 0) {
        temp += "<tr>";
      }
      temp += "<td class='searchRows'><input type='checkbox' id='" + array[i] + "' onclick='checkOn(id, " + check + ")' class='searchCheck'";
      if ((!nameOff[i] & check == 0) | (!tagOff[i] & check == 1)) {
        temp += " checked";
      }
      temp += "><label for='" + array[i] + "'>  " + array[i] + " (" + count[i] + ")</label></td>";
      if (i % 3 == 3) {
      }
    }
    document.getElementById("searchTable").innerHTML = temp;

    if (search == check & swap) {
      document.getElementById("searchDiv").style.display = "none";
      search = 2;
    } else if (swap) {
      document.getElementById("searchDiv").style.display = "block";
      search = check;
    }
  }
}

function checkOn(id, which) {
  if (which == 0) {
    for (let i = 0; i < permNames.length; i++) {
      if (id == permNames[i]) {
        nameOff[i] = !nameOff[i];
        if (nameOff[i]) {
          nOnCount--;
        } else {
          nOnCount++;
        }
      }
    }
  } else if (which == 1) {
    for (let i = 0; i < permTags.length; i++) {
      if (id == permTags[i]) {
        tagOff[i] = !tagOff[i];
        if (tagOff[i]) {
          tOnCount--;
        } else {
          tOnCount++;
        }
      }
    }
  }
  generateQuotes();
  searchFor(which, false);
  searchFor(which, false)
}

function checkIfOff(item, array, check, counter) {
  var saved = [];
  if (counter == 0) {
    return false;
  }
  for (let i = 0; i < item.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (item[i] == array[j] & !arrayCheck(array[j], saved)) {
        if (!check[j]) {
          counter--;
          saved[saved.length] = array[j];
          if (counter == 0) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

function changeTheme(id) {
  var change = themes[id];
  var cssClass = document.querySelectorAll("body");
  for (let i = 0; i < change.length; i++) {
    for (let j = 0; j < theObj[i].length; j++) {
      cssClass = document.querySelectorAll(theObj[i][j]);
      for (let n = 0; n < cssClass.length; n++) {
        if (i == 3) {
          cssClass[n].style.color = change[i];
        } else {
          cssClass[n].style.backgroundColor = change[i];
        }
      }
    }
  }
  cssClass = document.querySelectorAll(".quoteTag");
  for (let i = 0; i < cssClass.length; i++) {
    cssClass[i].style.backgroundColor = themes[themeId][2];
    cssClass[i].style.color = themes[themeId][3];
    cssClass[i].style.border = "2px solid " + themes[themeId][3];
  }
  document.getElementById("logo").src = "images/" + logo[id];
  console.log(document.getElementById("logo").innerHTML);
}

function changeId() {
  themeId++;
  if (themeId > 4) {
    themeId = 0;
  }
  localStorage.currentId = themeId;
  changeTheme(themeId);
}