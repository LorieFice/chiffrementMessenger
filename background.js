var clé = "A";
chrome.runtime.onMessage.addListener(receiver);

function receiver(message, sender, sendResponse) {
  //Sauvegarde la clé, et l'envoie au content script
  clé = message;
  envoi();
}

function envoi() {
  //Envoie la clé au content script et au popup
  chrome.runtime.sendMessage(clé);
  var params = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs);

  function gotTabs(tabs) {
    var msg = {
      key: clé
    }
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }
}

setInterval(envoi, 4000);
