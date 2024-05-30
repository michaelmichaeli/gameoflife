import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { generateEmptyBoard } from "../utils/boardUtils";
import { backendURL } from "../App";

const evolveBoard = async () => {
	try {
		const response = await axios.post(`${backendURL}/evolve`);
		return response.data;
	} catch (error) {
		throw new Error("Failed to evolve the board");
	}
};

const initializeBoard = async (initialBoard) => {
	try {
		const response = await axios.post(`${backendURL}/initialize`, {
			board: initialBoard,
		});
		return response.data;
	} catch (error) {
		throw new Error("Failed to initialize the board");
	}
};

const useGameBoard = (boardSize, defaultGenerations = 200) => {
	const queryClient = useQueryClient();
	const [generations, setGenerations] = useState(defaultGenerations);
	const [board, setBoard] = useState([]);
	const [isInitialized, setIsInitialized] = useState(false);
	const [isInitializing, setIsInitializing] = useState(false);
	const [isEvolving, setIsEvolving] = useState(false);

	const fetchBoard = ({ queryKey }) => {
		return new Promise((resolve, reject) => {
			const [_, generations] = queryKey;

			const handleData = (data) => {
				data = JSON.parse(data);
				console.log("🚀 ~ handleData");
				setBoard(data);
			};

			const handleEnd = (data) => {
				console.log("Stream ended:", data);
				resolve(data);
			};

			const handleError = (error) => {
				console.error("Error:", error);
				resolve();
			};

			const startListening = (url, handleData, handleEnd, handleError) => {
				const eventSource = new EventSource(url);

				eventSource.addEventListener("board", (event) => {
					handleData(event.data);
				});

				eventSource.addEventListener("end", (event) => {
					handleEnd(event.data);
					eventSource.close();
				});

				eventSource.onerror = (error) => {
					handleError(error);
					eventSource.close();
				};
			};

			const url = `${backendURL}/board?generations=${generations}`;
			startListening(url, handleData, handleEnd, handleError);
		});
	};

	useEffect(() => {
		const emptyBoard = generateEmptyBoard(boardSize.rows, boardSize.cols);
		setBoard(emptyBoard);
	}, [boardSize]);

	const { data: fetchedBoard, isFetching } = useQuery(
		["board", generations],
		fetchBoard,
		{
			enabled: false,
			refetchOnWindowFocus: false,
			onError: (error) => {
				console.error("Fetching error:", error);
				setIsInitialized(false);
			},
			onSuccess: (data) => {
				console.log("Fetching success");
				setIsInitialized(true);
			},
			onSettled: () => {
				console.log("Fetching settled");
			},
		}
	);

	const evolveMutation = useMutation(evolveBoard, {
		onMutate: () => {
			setIsEvolving(true);
			console.log("Evolution started");
		},
		onSuccess: (data) => {
			if (data?.board) {
				setBoard(data.board);
			}
			console.log("Evolution success:", data);
			setIsInitialized(true);
		},
		onError: (error) => {
			console.error("Evolution error:", error);
			setIsInitialized(false);
		},
		onSettled: () => {
			console.log("Evolution settled");
			setIsEvolving(false);
		},
	});

	const initializeMutation = useMutation(initializeBoard, {
		onMutate: () => {
			setIsInitializing(true);
			console.log("Initialization started");
		},
		onSuccess: (data) => {
			setIsInitialized(true);
			console.log("Initialization success:", data);
		},
		onError: (error) => {
			console.error("Initialization error:", error);
			setIsInitialized(false);
		},
		onSettled: () => {
			console.log("Initialization settled");
			setIsInitializing(false);
		},
	});

	const evolveBoardData = () => {
		evolveMutation.mutate();
	};

	const initializeBoardData = () => {
		initializeMutation.mutate(board);
	};

	const fetchBoardData = () => {
		queryClient.fetchQuery(["board", generations]);
	};

	const toggleCell = (row, col) => {
		const newBoard = board.map((r, rowIndex) =>
			r.map((cell, colIndex) =>
				rowIndex === row && colIndex === col ? (cell ? 0 : 1) : cell
			)
		);
		setIsInitialized(false);
		setBoard(newBoard);
	};

	return {
		generations,
		setGenerations,
		board,
		setBoard,
		toggleCell,
		fetchBoardData,
		evolveBoardData,
		initializeBoardData,
		isInitialized,
		setIsInitialized,
		isFetching,
		isInitializing,
		isEvolving,
	};
};

export default useGameBoard;
