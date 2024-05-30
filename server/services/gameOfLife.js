const initializeBoard = (rows, cols) => {
	return Array.from({ length: rows }, () => Array(cols).fill(0));
};

const evolveBoard = (currentBoard) => {
	return new Promise((resolve, reject) => {
		const rows = currentBoard.length;
		const cols = currentBoard[0].length;
		const newBoard = initializeBoard(rows, cols);

		const getLiveNeighbors = (board, x, y) => {
			const directions = [
				[-1, -1],
				[-1, 0],
				[-1, 1],
				[0, -1],
				[0, 1],
				[1, -1],
				[1, 0],
				[1, 1],
			];
			return directions.reduce((acc, [dx, dy]) => {
				const newX = x + dx;
				const newY = y + dy;
				if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
					acc += board[newX][newY];
				}
				return acc;
			}, 0);
		};

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const liveNeighbors = getLiveNeighbors(currentBoard, i, j);
				if (currentBoard[i][j] === 1) {
					newBoard[i][j] = liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
				} else {
					newBoard[i][j] = liveNeighbors === 3 ? 1 : 0;
				}
			}
		}

		resolve(newBoard);
	});
};

module.exports = { initializeBoard, evolveBoard };
