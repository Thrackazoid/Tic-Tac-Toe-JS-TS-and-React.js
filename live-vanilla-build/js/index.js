import View from "./view.js";

// creating a namespace for all of our variables to prevent globalscope pollution

// const App = {
//   $: {
//     menu: document.querySelector(`[data-id="menu"]`),
//     menuItems: document.querySelector(`[data-id="menu-items"]`),
//     resetBtn: document.querySelector(`[data-id="reset-btn"]`),
//     newRoundBtn: document.querySelector(`[data-id="new-round-btn"]`),
//     squares: document.querySelectorAll(`[data-id="square"]`),
//     turnIcon: document.querySelector("div.turn > i"),
//     turnText: document.querySelector("div.turn > p"),
//     modal: document.querySelector(`[data-id="modal"]`),
//     modalText: document.querySelector(`[data-id="modal-text"]`),
//     modalBtn: document.querySelector(`[data-id="modal-btn"]`),
//   },

//   state: {
//     moves: [],
//     currentGame: [],
//     history: [],
//   },

//   getGameStatus(moves) {
//     const p1Moves = moves
//       .filter((move) => move.playerId === 1)
//       .map((filteredmove) => filteredmove.squareId);
//     const p2Moves = moves
//       .filter((move) => move.playerId === 2)
//       .map((filteredmove) => filteredmove.squareId);

//     let winner = null;

//     const winningPatterns = [
//       [1, 2, 3],
//       [1, 5, 9],
//       [1, 4, 7],
//       [2, 5, 8],
//       [3, 5, 7],
//       [3, 6, 9],
//       [4, 5, 6],
//       [7, 8, 9],
//     ];

//     winningPatterns.forEach((pattern) => {
//       const p1Wins = pattern.every((value) => p1Moves.includes(value));
//       const p2Wins = pattern.every((value) => p2Moves.includes(value));
//       if (p1Wins) {
//         winner = 1;
//       }
//       if (p2Wins) {
//         winner = 2;
//       }
//     });

//     return {
//       status:
//         moves.length === 9 || winner != null ? "game-over" : "in-progress",
//       winner,
//     };
//   },

//   //seperated into a seperate function for organizational reasons
//   registerEventListeners() {
//     App.$.menu.addEventListener("click", (event) => {
//       App.$.menuItems.classList.toggle("hidden");
//     });
//     App.$.resetBtn.addEventListener("click", (event) => {
//       App.state.moves = [];
//       App.$.squares.forEach((square) => square.replaceChildren());
//       App.$.modal.classList.add(`hidden`);
//       App.$.turnIcon.classList = "fa-solid fa-x yellow";
//       App.$.turnText.classList = "yellow";
//       App.$.turnText.textContent = "Player 1, you're up!";
//     });
//     App.$.newRoundBtn.addEventListener("click", (event) => {
//       console.log(`New round button clicked!`);
//     });

//     App.$.modalBtn.addEventListener("click", (event) => {
//       App.state.moves = [];
//       App.$.squares.forEach((square) => square.replaceChildren());
//       App.$.modal.classList.add(`hidden`);
//       App.$.turnIcon.classList = "fa-solid fa-x yellow";
//       App.$.turnText.classList = "yellow";
//       App.$.turnText.textContent = "Player 1, you're up!";
//     });

//     App.$.squares.forEach((square) => {
//       square.addEventListener("click", (event) => {
//         // Check if square has already been played

//         const hasMove = (squareId) => {
//           const existingMove = App.state.moves.find(
//             (move) => move.squareId === squareId
//           );
//           return existingMove !== undefined;
//         };

//         if (hasMove(+square.id)) {
//           return;
//         }

//         //Determine correct player turn
//         const lastMove = App.state.moves.at(-1);
//         const currentPlayer =
//           lastMove === undefined ? 1 : lastMove.playerId === 1 ? 2 : 1;
//         const oppositePlayer = currentPlayer === 1 ? 2 : 1;
//         const icon = document.createElement("i");
//         if (currentPlayer === 1) {
//           icon.classList.add("fa-solid", "fa-x", "yellow");
//           App.$.turnIcon.classList.replace("fa-x", "fa-o");
//           App.$.turnIcon.classList.replace("yellow", "turquoise");
//           App.$.turnText.classList.replace("yellow", "turquoise");
//           App.$.turnText.textContent = "Player 2, you're up!";
//         } else {
//           icon.classList.add("fa-solid", "fa-o", "turquoise");
//           App.$.turnIcon.classList.replace("fa-o", "fa-x");
//           App.$.turnIcon.classList.replace("turquoise", "yellow");
//           App.$.turnText.classList.replace("turquoise", "yellow");
//           App.$.turnText.textContent = "Player 1, you're up!";
//         }

//         App.state.moves.push({
//           squareId: +square.id,
//           playerId: currentPlayer,
//         });

//         square.replaceChildren(icon);

//         App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

//         // Check for winner or a tie game

//         const game = App.getGameStatus(App.state.moves);
//         if (game.winner) {
//           App.$.modalText.textContent = `Player number ${game.winner} is the winner!`;
//           App.$.modal.classList.remove("hidden");
//           App.state.history.push(game.winner);
//           console.log(App.state.history);
//         }
//         if (App.state.moves.length === 9 && !game.winner) {
//           game.winner = "The Cat";
//           App.$.modalText.textContent = `${game.winner} is the winner!`;
//           App.$.modal.classList.remove("hidden");
//           App.state.history.push(game.winner);
//           console.log(App.state.history);
//         }
//       });
//     });
//   },
//   // creating an init method allows us to control when our app loads

//   init() {
//     App.registerEventListeners();
//   },
// };

// "load" option is on the window object, not the document
// on load the App.init will be triggered

//window.addEventListener("load", () => App.init());

function init() {
  const view = new View();

  view.bindGameResetEvent((event) => {
    console.log("Reset event");
    console.log(event);
  });

  view.bindNewRoundEvent((event) => {
    console.log("New Round event");
    console.log(event);
  });

  view.bindPlayerMoveEvent((event) => {
    console.log("Player Move event");
    console.log(event);
  });
}

window.addEventListener("load", init);
