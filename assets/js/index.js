"use strict";

// Main fil for index page.


// Audio sound press button
const buttons = document.querySelectorAll('.colour-btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const sound = new Audio(`assets/audio/${button.dataset.sound}`);
    sound.play();
  });
});
