const { initializeBoard, evolveBoard } = require("../services/gameOfLife");

let board = [];

const initialize = (req, res, next) => {
	try {
		board = req.body.board;
		console.log("🚀 ~ initialize ~ board:", board);
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

module.exports = { initialize, getBoard, evolve };
