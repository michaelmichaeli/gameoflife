const express = require("express");
const {
	initialize,
	getBoard,
	getGameSaves,
	evolve,
	save,
	load
} = require("../controllers/boardController");
const {
	validateBoard,
	validateGenerations,
} = require("../middleware/validators");
const { validationResult } = require("express-validator");

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

router.post("/initialize", validateBoard, handleValidationErrors, initialize);
router.get("/board", validateGenerations, handleValidationErrors, getBoard);
router.post("/evolve", evolve);
router.post("/save", validateBoard, handleValidationErrors, save);
router.get("/load", load);
router.get("/game-saves", getGameSaves);

module.exports = router;
