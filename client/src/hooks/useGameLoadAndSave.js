import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../App";

const useGameLoadAndSave = () => {
	const [gameSaves, setGameSaves] = useState([]);
	const [selectedGameSaves, setSelectedGameSaves] = useState(null);

	useEffect(() => {
		axios
			.get("/game-saves")
			.then((response) => {
				if (Array.isArray(response.data)) {
					setGameSaves(response.data);
				}
			})
			.catch((error) => {
				console.error("Error fetching game states:", error);
			});
	}, []);

	const handleLoadGame = async () => {
		if (selectedGameSaves) {
			try {
				const response = await axios.get(`${URL}/load/${selectedGameSaves}`);
				const loadedGameState = response.data.gameState;
				return loadedGameState; // Return the loaded game state
			} catch (error) {
				console.error("Error loading game state:", error);
				throw error;
			}
		}
	};

	const handleSaveGame = async (board) => {
    try {
      const name = prompt("Enter a name for the game state");
			const response = await axios.post(`${URL}/save${name?.length ? `?name=${name}` : ""}`, {
				board,
			});
			console.log("Game state saved successfully:", response.data);
			return response.data;
		} catch (error) {
			console.error("Error saving game state:", error);
			throw error;
		}
	};

	return {
		gameSaves,
		selectedGameSaves,
		setSelectedGameSaves,
		handleLoadGame,
		handleSaveGame,
	};
};

export default useGameLoadAndSave;
