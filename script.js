// Get display
const display = document.getElementById("display");

const clickSound = document.getElementById("click-sound");


// Get all buttons
const buttons = document.querySelectorAll(".button");


let currentInput = "0";   // current value shown
let resetNext = false;    // flag to reset after equals


// Update the display
function updateDisplay() {
     display.textContent = currentInput;
}

// Handle button click
buttons.forEach(button => {
     button.addEventListener("click", () => {
          clickSound.currentTime = 0; // rewind to start
          clickSound.play();
          const btnValue = button.dataset.value || button.textContent.trim();


          // Clear All
          if (button.classList.contains("clear")) {
               currentInput = "0";
          }
          // Backspace
          else if (button.classList.contains("backspace")) {
               currentInput = currentInput.slice(0, -1) || "0";
          }
          // Equals
          else if (button.classList.contains("equal")) {
               try {
                    // Replace symbols for JS eval
                    let expression = currentInput
                         .replace(/×/g, "*")
                         .replace(/÷/g, "/")
                         .replace(/%/g, "/100");

                    currentInput = eval(expression).toString();
                    resetNext = true;
               } catch {
                    currentInput = "Error";
               }
          }
          // Operators
          else if (button.classList.contains("operator")) {
               if (resetNext) resetNext = false;
               const lastChar = currentInput.slice(-1);

               // Prevent duplicate operators
               if ("+-*/%".includes(lastChar)) {
                    currentInput = currentInput.slice(0, -1) + btnValue;
               } else {
                    currentInput += btnValue;
               }
          }
          // Numbers / Decimal
          else {
               if (currentInput === "0" || resetNext) {
                    currentInput = btnValue;
                    resetNext = false;
               } else {
                    currentInput += btnValue;
               }
          }

          updateDisplay();
     });
});

// Initialize
updateDisplay();
