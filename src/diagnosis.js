function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  if(pageName == "Details") {
    var dcontent;
    dcontent = document.getElementsByClassName("d");
    for (i = 0; i < dcontent.length; i++) {
      dcontent[i].style.display = "none";
    }

    openDD();
  }

  if(pageName == "Treatment") {
    var tcontent;
    tcontent = document.getElementsByClassName("md");
    for (i = 0; i < tcontent.length; i++) {
      tcontent[i].style.display = "none";
    }

    openTT();
  }  
  
  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";
  
  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}

//Symptoms
function checkST(pageName, elmnt, color) {
  if(document.getElementById("coughing").checked ||
     document.getElementById("headache").checked ||
     document.getElementById("stomachache").checked ||
     document.getElementById("fever").checked ||
     document.getElementById("muscle").checked ||
     document.getElementById("skin").checked) {
    openPage(pageName, elmnt, color);
  } else {
    alert("Please select one symptom!");
  }
}

//Details
function openDD() {
    // Display specific detial info in DETAILS tab
    if(document.getElementById("coughing").checked) {
      document.getElementById("d1").style.display = "block";
      document.getElementById("d7").style.display = "block";
    } else     if(document.getElementById("headache").checked) {
      document.getElementById("d2").style.display = "block";
      document.getElementById("d7").style.display = "block";
    } else     if(document.getElementById("stomachache").checked) {
      document.getElementById("d3").style.display = "block";
      document.getElementById("d7").style.display = "block";
    } else     if(document.getElementById("fever").checked) {
      document.getElementById("d4").style.display = "block";
      document.getElementById("d7").style.display = "block";
    } else     if(document.getElementById("muscle").checked) {
      document.getElementById("d5").style.display = "block";
      document.getElementById("d7").style.display = "block";
    } else     if(document.getElementById("skin").checked) {
      document.getElementById("d6").style.display = "block";
      document.getElementById("d7").style.display = "block";
    }
}

function checkD() {
  var v = false;
  var r = 
      document.getElementsByName("d");
  var i = 0;
  while (!v && i<r.length) {
    if (r[i].checked) {
      v = true;
      break;
    }
    i++;
  }

  return v;
}

//Frequency
function openF(pageName, elmt, color) {
  var v = checkD();
  
  if (v) {
    openPage(pageName, elmt, color);
  } else {
    alert("Please select one from the options!");
  }
}

function checkF(r) {
  var v = false;

  var i = 0;
  while (!v && i < r.length) {
       if (r[i].checked) {
            v = true;
        }
        i++;
  }

  return v;
}

//Treament
function openT(pageName, elmnt, color) {
  var r1 = document.getElementsByName("outter");
  var r2 = document.getElementsByName("inner");
  var v1 = checkF(r1), v2 = checkF(r2);
  
  if(v1 && v2) {
    openPage(pageName, elmnt, color);
  } else if(v1) {
    alert("Please select whether you have additional information!");
  } else if(v2) {
    alert("Please select the frequency that the symptoms appear!");
  } else {
    alert("Please select one from the options!");
  }
}

function openTT() {
  var v1 = checkD()

  if (v1) {
    if (document.getElementById("coughing").checked) {
      document.getElementById("c").style.display = "inline-block";
    } else if (document.getElementById("headache").checked) {
      document.getElementById("h").style.display = "inline-block";
    } else if (document.getElementById("stomachache").checked) {
      document.getElementById("s").style.display = "inline-block";
    } else if (document.getElementById("fever").checked) {
      document.getElementById("f").style.display = "inline-block";
    } else if (document.getElementById("muscle").checked) {
      document.getElementById("m").style.display = "inline-block";
    } else if (document.getElementById("skin").checked) {
      document.getElementById("sk").style.display = "inline-block";
    }
  }
}

//submit clicked
function Done() {
  var blur = document.getElementById("blur");
  blur.classList.toggle("active");
  document.getElementById("popup").style.display = "block";
}

//Onload the default element
window.onload = function() {
  startTab();
};

function startTab() {
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
  document.getElementById("defaultOpen").onclick = openPage('Symptoms', defaultOpen, '#e8e8e8');
}