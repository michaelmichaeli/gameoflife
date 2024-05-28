const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const boardsDirectory = path.join(__dirname, 'boards');

// Create the directory (if doesn't exist)
if (!fs.existsSync(boardsDirectory)) {
	fs.mkdirSync(boardsDirectory);
}

const saveBoardToState = (name, state) => {
	// Todo: replace with Database
	if (!name) {
		name = uuidv4();
	}
	const filePath = path.join(boardsDirectory, `${name}.json`);
	fs.writeFileSync(filePath, JSON.stringify(state));
	return name;
};

const loadBoardFromState = (name) => {
	// Todo: replace with Database
	const filePath = path.join(boardsDirectory, `${name}.json`);
	if (fs.existsSync(filePath)) {
		const state = JSON.parse(fs.readFileSync(filePath));
		return state;
	}
	return { board: [], rows: 0, cols: 0 };
};

const getGameSavesFromState = () => {
	const files = fs.readdirSync(boardsDirectory);
	return files.filter(file => file.endsWith('.json')).map(file => path.basename(file, '.json'));
};

module.exports = { saveBoardToState, loadBoardFromState, getGameSavesFromState };
