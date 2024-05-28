const {
	initializeBoard,
	evolveBoard,
} = require("../services/gameOfLife");
const { saveBoard, loadBoard } = require("../state/boardState");

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

const getBoard = (req, res, next) => {
	try {
		const generations = parseInt(req.query.generations, 10);

		for (let i = 0; i < generations; i++) {
			board = evolveBoard(board);
		}

		res.status(200).json({ board });
	} catch (error) {
		next(error);
	}
};

const evolve = (req, res, next) => {
	try {
		board = evolveBoard(board);
		res.status(200).json({ board });
	} catch (error) {
		next(error);
	}
};

const save = (req, res, next) => {
	try {
		const currentName = req.query.name;
		const currentBoard = req.body.board;
		const name = saveBoard(currentName, currentBoard);
		res.status(200).json({ name });
	} catch (error) {
		next(error);
	}
};

const load = (req, res, next) => {
	try {
		const name = req.query.name;
		const board = loadBoard(name);
		res.status(200).json({ board });
	} catch (error) {
		next(error);
	}
};

module.exports = { initialize, getBoard, evolve, save, load };
