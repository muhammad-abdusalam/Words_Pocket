const inputField = document.querySelector("#input-filed");

const splitBtn = document.querySelector(".split");

const wordsCount = document.querySelector(".words-count span");

const newWordsBox = document.querySelector("#new-words");

const clearBtn = document.querySelector(".clear");

let allWords = [];
let currentWords = [];
let newWords = [];
let storageObj = {};

window.onload = function () {
  if (localStorage.getItem("words3")) {
    allWords = window.localStorage.getItem("words3").split(",");
    addNewWords();
  }
};
splitBtn.onclick = function () {
  if (inputField.value !== "") {
    // Get Words Only
    currentWords = inputField.value.match(/[a-z]+((\'||\-)?[a-z]+)?/gi);
    if (currentWords !== null) {
      currentWords = currentWords.map((word) => word.toLowerCase());

      allWords.push(...currentWords);

      addNewWords();

      inputField.value = "";

      window.localStorage.setItem("words3", newWords);
    }
  }
};
clearBtn.onclick = function () {
  window.localStorage.setItem("words3", []);
  window.localStorage.setItem("finished-words", []);
  allWords = [];
  currentWords = [];
  newWords = [];
  storageObj = {};
  wordsCount.innerHTML = "0";
  newWordsBox.innerHTML = "";
};

// Functions
function addNewWords() {
  newWords = Array.from(new Set(allWords));

  wordsCount.innerHTML = newWords.length;

  newWordsBox.innerHTML = "";
  createWordBox(newWords);
  getInfoFromStorage();
}
function createWordBox(words) {
  for (let i = 0; i < words.length; i++) {
    let wordBox = document.createElement("div");
    let wordText = document.createTextNode(words[i]);
    wordBox.id = `w-${i}`;

    wordBox.append(wordText);
    newWordsBox.appendChild(wordBox);

    let arrayOfWords = Array.from(newWordsBox.childNodes);
    arrayOfWords.forEach(function (word) {
      checkFinished(word);
    });
  }
}
function checkFinished(word) {
  word.onclick = function () {
    if (word.classList.contains("finished")) {
      this.classList.remove("finished");
      storageObj[`${word.id}`] = "0";
    } else {
      this.classList.add("finished");
      storageObj[`${word.id}`] = "1";
    }
    localStorage.setItem("finished-words", JSON.stringify(storageObj));
  };
}
function getInfoFromStorage() {
  if (localStorage.getItem("finished-words")) {
    storageObj = JSON.parse(localStorage.getItem("finished-words"));
    let arrayOfWords = Array.from(newWordsBox.childNodes);
    arrayOfWords.forEach(function (word) {
      if (storageObj[word.id] === "1") {
        word.classList.add("finished");
      }
    });
  }
}
