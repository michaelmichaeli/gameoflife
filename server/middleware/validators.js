const { body, query } = require("express-validator");

const validateBoard = [
	body("board")
		.isArray()
		.withMessage("Board must be an array"),
];

const validateGenerations = [
	query("generations")
		.isInt({ min: 1 })
		.withMessage("Generations must be a positive integer"),
];

module.exports = { validateBoard, validateGenerations };
