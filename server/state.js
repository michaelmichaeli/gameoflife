const fs = require('fs');
const path = require('path');

const saveState = (state) => {
    const filePath = path.join(__dirname, 'board.json');
    fs.writeFileSync(filePath, JSON.stringify(state));
};

const loadState = () => {
    const filePath = path.join(__dirname, 'board.json');
    if (fs.existsSync(filePath)) {
        const state = JSON.parse(fs.readFileSync(filePath));
        return state;
    }
    return null;
};

module.exports = { saveState, loadState };