var clé = document.getElementById('clé');
var texte = document.getElementById('texte');
var result = document.getElementById('result');
var textePlaceholder = [];
var textToReturn = [];

clé.addEventListener('keyup', function() {
  if (clé.value != "") {
    var params = {
      active: true,
      currentWindow: true
    }
    chrome.tabs.query(params, gotTabs);

    function gotTabs(tabs) {
      var message = clé.value;
      var msg = {
        txt: clé.value
      }
      chrome.tabs.sendMessage(tabs[0].id, msg);
    }
  }
})

texte.addEventListener('keyup', function() {
  if (texte.value != "" && clé.value != "") {
    codage(texte.value, clé.value);
    result.innerText = motFinal.join('');
  }
})

var motDécomposé;
var cléDécomposée;
var motEnChiffres = [];
var cléEnChiffres = [];
var motFinalChiffres = [];
var motFinal = [];
var lettres = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "é", "'", "è", '"', "à", "ç", "(", ")", "î", "ù", "!", "?", ".", ",", ";", ":", "-", "+", "/", "*", "@", "&", "=", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Ç", "#", "^", "Â", "Ê", "Î", "Ô", "Û", "Ä", "Ë", "Ï", "Ö", "Ü", "À", "Æ", "æ", "É", "È", "Œ", "œ", "Ù", "ê"];

function codage(mot, clé) {
  clear();
  motDécomposé = mot.split('');
  cléDécomposée = clé.split('');
  toNombres(motDécomposé, motEnChiffres);
  toNombres(cléDécomposée, cléEnChiffres);
  ajout(motEnChiffres, cléEnChiffres, true);
  backToMot(motFinalChiffres);
  //console.log(motFinal.join(''));
}

function toNombres(word, chiffres) {
  for (var i = 0; i < word.length; i++) {
    for (var j = 0; j < lettres.length; j++) {
      if (lettres[j] == word[i]) {
        chiffres.push(j);
      }
    }
  }
}

function ajout(mot, clé, condition) {
  if (condition) {
    for (var i = 0; i < motEnChiffres.length; i++) {
      var a = (i % clé.length);
      motFinalChiffres[i] = (mot[i] + clé[a]) % lettres.length;
    }
  } else {
    for (var i = 0; i < motEnChiffres.length; i++) {
      var a = (i % clé.length);
      motFinalChiffres[i] = ((mot[i] - clé[a]) + lettres.length) % lettres.length;
    }
  }
}

function backToMot(word) {
  for (var i = 0; i < word.length; i++) {
    for (var j = 0; j < lettres.length; j++) {
      if (word[i] == j) {
        motFinal.push(lettres[j]);
      }
    }
  }
}

function clear() {
  motDécomposé = [];
  cléDécomposée = [];
  motEnChiffres = [];
  cléEnChiffres = [];
  motFinalChiffres = [];
  motFinal = [];
}

function décodage(mot, clé) {
  clear();
  motDécomposé = mot.split('');
  cléDécomposée = clé.split('');
  toNombres(motDécomposé, motEnChiffres);
  toNombres(cléDécomposée, cléEnChiffres);
  ajout(motEnChiffres, cléEnChiffres, false);
  backToMot(motFinalChiffres);
}
