var clé = "A";
chrome.runtime.onMessage.addListener(receiver);

function receiver(message, sender, sendResponse) {
  clé = message;
  envoi();
}

function envoi() {
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

setInterval(envoi, 2000);
