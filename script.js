const inputField = document.querySelector("#input-field");
const clearInput = document.querySelector(".clear-input");

const pickUpBtn = document.querySelector(".pick");

const wordsCount = document.querySelector(".words-count span");
const outputField = document.querySelector("#output-field");

const clearPocket = document.querySelector(".clear-pocket");

const copyBtn = document.querySelector(".copy");
const downloadBtn = document.querySelector(".download-pocket");

const popup = document.querySelector(".popup-container");
const popupButtons = document.querySelectorAll(".response button");
const arrayOfPopupButtons = Array.from(popupButtons);

let allWords = [];
let currentWords = [];
let newWords = [];
let wordRegEx = /[a-z]+((\'||\-)?[a-z]+)?/gi;

window.onload = function () {
  if (localStorage.getItem("new-words")) {
    allWords = window.localStorage.getItem("new-words").split(",");
    addNewWords();
  }
};
pickUpBtn.onclick = function () {
  if (inputField.value !== "") {
    // Get Words Only
    currentWords = inputField.value.match(wordRegEx);
    if (currentWords !== null) {
      currentWords = currentWords.map(function (word) {
        return word.toLowerCase();
      });

      allWords.push(...currentWords);

      inputField.value = "";
      addNewWords();

      window.localStorage.setItem("new-words", newWords);
    }
  }
};
copyBtn.onclick = function () {
  copyNewWords();
};
downloadBtn.onclick = function () {
  downloadPocket();
};
clearInput.onclick = function () {
  emptyInputArea();
};
clearPocket.onclick = function () {
  if (outputField.value !== "") {
    showPopup();
    confirmToDelete();
  }
};
disableBtnHover();

// Functions
function addNewWords() {
  let noRepeated = new Set(allWords);
  newWords = Array.from(noRepeated);
  capitalizeFirstLetter(newWords);

  wordsCount.innerHTML = newWords.length;
  outputField.value = newWords.join(" ");
}

function capitalizeFirstLetter(array) {
  let firstLetter;
  let restOfWord;
  let allWord;
  for (let i = 0; i < array.length; i++) {
    firstLetter = array[i].charAt(0).toUpperCase();
    restOfWord = array[i].slice(1);
    allWord = `${firstLetter}${restOfWord}`;
    array[i] = allWord;
  }
}
function copyNewWords() {
  navigator.clipboard.writeText(outputField.value);
}
function downloadPocket() {
  const targetContent = outputField.value;
  // Create element with <a> tag
  const link = document.createElement("a");

  // Create a blog object with the file content which you want to add to the file
  const file = new Blob([targetContent], { type: "text/plain" });

  // Add file content in the object URL
  link.href = URL.createObjectURL(file);

  // Add file name
  link.download = "pocket.txt";

  // Add click event to <a> tag to save file.
  link.click();
}
function emptyInputArea() {
  inputField.value = "";
}
function emptyPocket() {
  window.localStorage.setItem("new-words", []);
  allWords = [];
  currentWords = [];
  newWords = [];
  wordsCount.innerHTML = "0";
  outputField.value = "";
}
function showPopup() {
  popup.style.display = "flex";
}
function confirmToDelete() {
  arrayOfPopupButtons[1].focus();
  arrayOfPopupButtons.forEach(function (btn) {
    btn.onclick = function () {
      if (btn.classList.contains("yes")) {
        emptyPocket();
        popup.style.display = "none";
      } else {
        popup.style.display = "none";
      }
    };
  });
}
// This Function Disable Buttons Hover In Touch Devices
function disableBtnHover() {
  const allButtons = document.querySelectorAll("button");
  const arrayOfButtons = Array.from(allButtons);

  arrayOfButtons.forEach(function (btn) {
    btn.addEventListener("mouseover", function () {
      if (window.navigator.maxTouchPoints > 0) {
        arrayOfButtons.forEach(function (btn) {
          btn.classList.add("no-hover");
        });
      } else {
        arrayOfButtons.forEach(function (btn) {
          btn.classList.remove("no-hover");
        });
      }
    });
  });
}
