require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const boardRoutes = require("./routes/boardRoutes");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(
	cors({
		origin: "*",
	})
);

app.use(bodyParser.json());

app.use("/api", boardRoutes);

app.use(errorHandler);
// app.use(express.json());

// let board = [];

// // Initialize Board
// app.post('/api/initialize', (req, res) => {
//   board = req.body.board;
//   res.status(200).send({ message: 'Board initialized', board });
// });

// // Retrieve Current Board State
// app.get('/api/board/:generations', (req, res) => {
//   const generations = parseInt(req.params.generations, 10);
//   let currentBoard = board;
//   for (let i = 0; i < generations; i++) {
//     currentBoard = evolveBoard(currentBoard);
//   }
//   res.status(200).send({ board: currentBoard });
// });

// // Evolve Board
// app.post('/api/evolve', (req, res) => {
//   board = evolveBoard(board);
//   res.status(200).send({ board });
// });

// // Helper function to evolve the board
// const evolveBoard = (board) => {
//   const numRows = board.length;
//   const numCols = board[0].length;
//   const newBoard = Array.from(Array(numRows), () => Array(numCols).fill(0));

//   const getNeighbors = (x, y) => {
//     const directions = [
//       [-1, -1], [-1, 0], [-1, 1],
//       [0, -1], [0, 1],
//       [1, -1], [1, 0], [1, 1]
//     ];
//     let count = 0;
//     for (let [dx, dy] of directions) {
//       const newX = x + dx;
//       const newY = y + dy;
//       if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
//         count += board[newX][newY];
//       }
//     }
//     return count;
//   };

//   for (let i = 0; i < numRows; i++) {
//     for (let j = 0; j < numCols; j++) {
//       const liveNeighbors = getNeighbors(i, j);
//       if (board[i][j] === 1) {
//         if (liveNeighbors < 2 || liveNeighbors > 3) {
//           newBoard[i][j] = 0;
//         } else {
//           newBoard[i][j] = 1;
//         }
//       } else {
//         if (liveNeighbors === 3) {
//           newBoard[i][j] = 1;
//         }
//       }
//     }
//   }

//   return newBoard;
// };

app.listen(PORT, () => {
	console.log(`🚀 ~ app: Server is running on port ${PORT}`);
});
