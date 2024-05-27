const { body, query } = require("express-validator");

const validateBoard = [
	body("board").isArray().withMessage("Board must be an array"),
];

const validateGenerations = [
	query("generations")
		.isInt({ min: 0 })
		.withMessage("Generations must be a non-negative integer"),
];

module.exports = { validateBoard, validateGenerations };
