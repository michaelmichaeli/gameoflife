const { initializeBoard, evolveBoard } = require("../services/gameOfLife");
const {
	saveBoardToState,
	loadBoardFromState,
	getGameSavesFromState,
} = require("../state/boardState");
const deepEqual = require("../utils");

let board = [];

const initialize = (req, res, next) => {
	try {
		board = initializeBoard(req.body.rows, req);
		if (req.body.board) {
			board = req.body.board;
		}
		res.status(200).json({ message: "Board initialized" });
	} catch (error) {
		next(error);
	}
};

const getGameSaves = (req, res, next) => {
	try {
		const gameSaves = getGameSavesFromState();
		res.status(200).json({ gameSaves });
	} catch (error) {
		next(error);
	}
};

const getBoard = async (req, res, next) => {
	try {
		const generations = parseInt(req.query.generations, 10);

		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Connection", "keep-alive");

		let counter = 0;
		const interval = setInterval(async () => {
			const newBoard = await evolveBoard(board);
			const isEqualBoards = deepEqual(board, newBoard);
			if (counter >= generations || isEqualBoards) {
				clearInterval(interval);
				res.write("board: end\n");
				res.write("data: done\n\n");
				res.end();
				return;
			}
			res.write("event: board\n");
			res.write(`id: ${counter}\n`);
			res.write(`data: ${JSON.stringify(newBoard)}\n\n`);
			counter++;
			board = newBoard;
		}, 100);

		req.on("close", () => {
			clearInterval(interval);
			res.end();
		});
	} catch (error) {
		next(error);
	}
};

const evolve = async (req, res, next) => {
	try {
		board = await evolveBoard(board);
		res.status(200).json({ board });
	} catch (error) {
		next(error);
	}
};

const save = (req, res, next) => {
	try {
		const currentName = req.query.name;
		const currentBoard = req.body.board;
		const name = saveBoardToState(currentName, currentBoard);
		res.status(200).json({ name });
	} catch (error) {
		next(error);
	}
};

const load = (req, res, next) => {
	try {
		const name = req.query.name;
		const board = loadBoardFromState(name);
		res.status(200).json({ board });
	} catch (error) {
		next(error);
	}
};

module.exports = { initialize, getBoard, getGameSaves, evolve, save, load };
