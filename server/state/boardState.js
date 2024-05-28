const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const saveBoard = (name, state) => {
	// Todo: replace with DataBase
	if (!name) {
		name = uuidv4();
	}
	const filePath = path.join(__dirname, `boards/${name}.json`);
	fs.writeFileSync(filePath, JSON.stringify(state));
	return name;
};

const loadBoard = (name) => {
	// Todo: replace with DataBase
	const filePath = path.join(__dirname, `boards/${name}.json`);
	if (fs.existsSync(filePath)) {
		const state = JSON.parse(fs.readFileSync(filePath));
		return state;
	}
	return { board: [], rows: 0, cols: 0 };
};

module.exports = { saveBoard, loadBoard };
