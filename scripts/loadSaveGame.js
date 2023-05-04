// Local Storage Keys & Purpuse:
//
// gameBoard -> save gameboard layout
// custBoard -> save custboard layout
// points -> their total points ||| Coming soon
// items -> items they own in shop ||| Coming soon
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const loadnSavePopUpClose = document.getElementById("loadnSavePopUp");
const tdCoinSpace = document.querySelectorAll(".tdCoinSpace");
var returningPlayer = false;

/*
   Important Notice: Players who's devices don't support
   autosave/autoload WILL NOT be notified about their data 
   not being saved/loaded. Reason behind this: players data
   will save for every click they do, therefore if an else
   runs for every click they do, they will be notified
   every move they make in the game that their data isn't
   saved. That's not okay! As for load, they will just
   enter the game like a new player since data can't be
   loaded.
*/

function saveGame(tdLocation, localStorageName) { // String, Nodelist, String
  var saveDataIn = "";
  tdLocation.forEach(function(currentValue, currentIndex) { // For the customer grid
    if(currentValue.firstChild.className != "noCoin") { // Something is there, save the data
      saveDataIn = saveDataIn.concat(String(currentIndex), ",", currentValue.getAttribute('data-type'), ",", currentValue.getAttribute('data-count'), ",");
    }
  });
  console.log("DataTables Saved: " + saveDataIn.split(",")); // View of what was added
  localStorage.setItem(localStorageName, saveDataIn);
  returningPlayer = true; // They are a returning player (stops auto coins from spawning)
}

function loadGame(tdLocation, localstrName) { // String, Nodelist
  if (localStorage.getItem(localstrName) != null && localStorage.getItem(localstrName) != "") { // Exists, so load
    var saveDataIn = localStorage.getItem(localstrName);
    saveDataIn = saveDataIn.substring(0, saveDataIn.length-1);
    saveDataIn = saveDataIn.split(",");

      for(let i = 0; i < saveDataIn.length; i++) { // Loops through all gathered data
        let type = tdLocation[parseInt(saveDataIn[i])].dataset.type = saveDataIn[i+1]; // Set type
        let count = tdLocation[parseInt(saveDataIn[i])].dataset.count = saveDataIn[i+2]; // Set count
        var addingCoin = new coinPile(type, count); // Make the coin apart of the coinPile class
        tdLocation[parseInt(saveDataIn[i])].firstChild.setAttribute("src", "images/" + addingCoin.getImageName()); // Autogen it's image
        tdLocation[parseInt(saveDataIn[i])].firstChild.className = "coin"; // Fixing the img class to update css
        console.log(addingCoin.toString()); //See what loaded
        i += 2;
      }
      returningPlayer = true; // They are a returning player (stops auto coins from spawning)
    }
}

function autoLoad() { // Add more calls when new data needs to be autoLoaded
  if (typeof(Storage) !== "undefined") { // Is localStorage supported?
    loadGame(tdCoinSpace, "gameBoard"); // Load gameboard data
    loadGame(tdCsCoinSpace, "custBoard"); // Load custboard data

  } // Else data will never load + no alert rn
}
function autosave() { // Add more calls when new data needs to be autoSaved
  if (typeof(Storage) !== "undefined") { // Is localStorage supported?
    // Yes... time to autosave
    saveGame(tdCoinSpace, "gameBoard"); // Save gameboard data
    saveGame(tdCsCoinSpace, "custBoard"); // Save customerBoard data
  } // Else data will never save + no alert rn
}

window.addEventListener("load", autoLoad);
document.body.addEventListener("click", autosave);


// Won't need again unless returning to save and load buttons
// TODO: Delete commented code below if never reverting back
// function clearCustBoard() {
//   // for each td tag on the board, call the clearCell function
//   for (i = 0; i < tdCsCoinSpace.length; i++) {
//     let cell = tdCsCoinSpace[i]; // the cell currently worked on

//     clearCell(cell);
//   }

//   heldCoin = null;
//   heldCoinTd = null;
//   coinBoard.style = `cursor: auto;`; //turns the cursor back into pointer
// }
// saveBtn.addEventListener("click", saveGame); // Child wants to save game
// loadBtn.addEventListener("click", loadGame); // Child wants to load game
