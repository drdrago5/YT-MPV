// ==UserScript==
// @name         YT MPV
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
  var btnDiv = document.createElement("div");
  btnDiv.style.width = "100%";
  btnDiv.id = "parentButton";
  var btn = document.createElement("a");
  btn.style.display = "block";
  btn.style.width = "100%";
  btn.style.backgroundColor = "#181717";
  btn.style.color = "white";
  btn.style.textAlign = "center";
  btn.style.padding = "10px 0";
  btn.style.marginTop = "5px";
  btn.style.fontSize = "14px";
  btn.style.border = "0";
  btn.style.cursor = "pointer";
  btn.style.textDecoration = "none";
  btn.style.borderRadius = "2px";
  btn.style.fontFamily = "Roboto, Arial, sans-serif";
  btn.href = "mpv://" + window.location.href;
  btn.appendChild(document.createTextNode("Open in MPV"));
  btnDiv.appendChild(btn);

  /* Find and add to target */
  var te = document.querySelectorAll("[id='subscribe-button']");
  for (var i = 0; i < te.length; i++) {
    if (te[i].className.indexOf("ytd-video-secondary-info-renderer") > -1) {
      te[i].appendChild(btnDiv);
    }
  }

  /* Fix hidden description bug */
  var dscBox = document.querySelectorAll("ytd-video-secondary-info-renderer");
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
