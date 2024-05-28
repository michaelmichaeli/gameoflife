const express = require("express");
const {	initialize,	getBoard,	evolve,} = require("../controllers/boardController");
const {	validateBoard, validateGenerations,} = require("../middleware/validators");
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

module.exports = router;
