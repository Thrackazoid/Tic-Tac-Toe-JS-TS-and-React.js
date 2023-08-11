// creating a namespace for all of our variables to prevent globalscope pollution
const App = {
  $: {
    menu: document.querySelector(`[data-id="menu"]`),
    menuItems: document.querySelector(`[data-id="menu-items"]`),
    resetBtn: document.querySelector(`[data-id="reset-btn"]`),
    newRoundBtn: document.querySelector(`[data-id="new-round-btn"]`),
    squares: document.querySelectorAll(`[data-id="square"]`),
  },

  state: {
    moves: [],
    currentGame: [],
    history: [],
  },

  getGameStatus(moves) {
    const p1Moves = moves.filter((move) => move.playerId === 1);
    const p2Moves = moves.filter((move) => move.playerId === 2);

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    winningPatterns.forEach((pattern) => {
      const p1Wins = pattern.every((value) => p1Moves.includes(value));
      const p2Wins = pattern.every((value) => p2Moves.includes(value));
    });
  },

  //seperated into a seperate function for organizational reasons
  registerEventListeners() {
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
    });
    App.$.resetBtn.addEventListener("click", (event) => {
      console.log(`Reset button clicked!`);
    });
    App.$.newRoundBtn.addEventListener("click", (event) => {
      console.log(`New round button clicked!`);
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        // Check if square has already been played

        if (square.hasChildNodes()) {
          return;
        }

        //Determine correct player turn
        const lastMove = App.state.moves.at(-1);
        const currentPlayer =
          lastMove === undefined ? 1 : lastMove.playerId === 1 ? 2 : 1;
        const oppositePlayer = currentPlayer === 1 ? 2 : 1;
        const icon = document.createElement("i");
        const turnIcon = document.querySelector("div.turn > i");
        const turnText = document.querySelector("div.turn > p");
        if (currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-x", "yellow");
          turnIcon.classList.replace("fa-x", "fa-o");
          turnIcon.classList.replace("yellow", "turquoise");
          turnText.classList.replace("yellow", "turquoise");
          turnText.textContent = "Player 2, you're up!";
        } else {
          icon.classList.add("fa-solid", "fa-o", "turquoise");
          turnIcon.classList.replace("fa-o", "fa-x");
          turnIcon.classList.replace("turquoise", "yellow");
          turnText.classList.replace("turquoise", "yellow");
          turnText.textContent = "Player 1, you're up!";
        }

        App.state.moves.push({
          squareId: +square.id,
          playerId: currentPlayer,
        });

        square.replaceChildren(icon);

        App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

        // Check for winner or a tie game
      });
    });
  },
  // creating an init method allows us to control when our app loads

  init() {
    App.registerEventListeners();
  },
};

// "load" option is on the window object, not the document
// on load the App.init will be triggered
window.addEventListener("load", () => App.init());
