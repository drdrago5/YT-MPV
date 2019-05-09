// ==UserScript==
// @name         Taka Blyat Sraka
// @version      1.0
// @description  Adds an Open in MPV button to YouTube
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @run-at       document-end
// ==/UserScript==

function polymerInject() {
  /* Create button */
  var my_awesome_script = document.createElement('script');
  my_awesome_script.setAttribute('src','https://use.fontawesome.com/releases/v5.8.2/js/all.js');
  my_awesome_script.setAttribute('integrity','sha384-DJ25uNYET2XCl5ZF++U8eNxPWqcKohUUBUpKGlNLMchM7q4Wjg2CUpjHLaL8yYPH');
  my_awesome_script.setAttribute('crossorigin', 'anonymous');
  document.head.appendChild(my_awesome_script);
  var btnDiv = document.createElement("div");
  btnDiv.style.width = "100%";
  btnDiv.id = "parentButton";
  var btn = document.createElement("a");
  btn.style.display = "block";
  btn.style.width = "100%";
  btn.style.backgroundColor = "#121212";
  btn.style.color = "#909090";
  btn.style.textAlign = "center";
  btn.style.padding = "10px 0";
  btn.style.marginTop = "5px";
  btn.style.fontSize = "14px";
  btn.style.border = "1px";
  btn.style.borderColor = "#909090";
  btn.style.cursor = "pointer";
  btn.style.borderRadius = "2px";
  btn.style.fontFamily = "Roboto, Arial, sans-serif";
  btn.href = "mpv://" + window.location.href;
  btnDiv.appendChild(btn);
  var img = document.createElement("i");
  img.setAttribute('Class', 'far fa-play-circle fa-2x');
  btn.appendChild(img);
  /* Find and add to target */
  var te = document.querySelectorAll("[id='notification-preference-toggle-button']");
  for (var i = 0; i < te.length; i++) {
    if (te[i].className.indexOf("style-scope ytd-subscribe-button-renderer") > -1) {
      te[i].appendChild(btnDiv);
    }
  }

  /* Fix hidden description bug */
  var dscBox = document.querySelectorAll("style-scope ytd-subscribe-button-renderer");
  if (dscBox[0].className.indexOf("loading") > -1){
    dscBox[0].classList.remove("loading");
  }
}

if (document.getElementById("polymer-app") || document.getElementById("masthead") || window.Polymer) {
  setInterval(function() {
    if (window.location.href.indexOf("watch?v=") < 0) {
      return false;
    }
    if (document.getElementById("count") && document.getElementById("parentButton") === null) {
      polymerInject();
    }
  }, 100);
}
