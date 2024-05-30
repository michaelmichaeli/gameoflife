import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../App";

const useGameLoadAndSave = (loadBoard, setIsInitialized) => {
	const [gameSaves, setGameSaves] = useState([]);
	const [selectedGameSave, setSelectedGameSave] = useState(null);

	useEffect(() => {
		const fetchGameSaves = async () => {
			try {
				const response = await axios.get(`${backendURL}/game-saves`);
				if (Array.isArray(response.data.gameSaves)) {
					setGameSaves(response.data.gameSaves ?? []);
				}
			} catch (error) {
				console.error("Error fetching game states:", error);
			}
		};

		fetchGameSaves();
	}, []);

	const handleLoadGame = async () => {
		if (selectedGameSave) {
			try {
				const response = await axios.get(
					`${backendURL}/load?name=${selectedGameSave}`
				);
				const loadedGameState = response.data.board;
				loadBoard(loadedGameState);
				setIsInitialized(false);
			} catch (error) {
				console.error("Error loading game state:", error);
				throw error;
			}
		}
	};

	const handleSaveGame = async (board) => {
		try {
			let name = prompt("Enter a name for the game state");
			while (name.trim() === "") {
				name = prompt("Please enter a non-empty string:");
				if (name === null) {
					return null; // User pressed cancel
				}
			}
			const response = await axios.post(
				`${backendURL}/save${name?.length ? `?name=${name}` : ""}`,
				{
					board,
				}
			);
			setGameSaves((prev) =>
				[name, ...prev].filter((n, i) => prev.indexOf(n) === i)
			);
			console.log("Game state saved successfully:", response.data);
			return response.data;
		} catch (error) {
			console.error("Error saving game state:", error);
			throw error;
		}
	};

	return {
		gameSaves,
		selectedGameSave,
		setSelectedGameSave,
		handleLoadGame,
		handleSaveGame,
	};
};

export default useGameLoadAndSave;
