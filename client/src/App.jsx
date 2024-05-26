import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import Board from './components/Board';

import './App.css'
import Controls from './components/Controls';

const URL = 'http://localhost:3001/api'

const initializeBoard = async (board) => {
  await axios.post(`${URL}/initialize`, { board });
};

const evolveBoard = async () => {
  const { data } = await axios.post(`${URL}/evolve`);
  return data.board;
};

const fetchBoard = async ({ queryKey }) => {
  const [_, generations] = queryKey;
  const { data } = await axios.get(`${URL}/board/${generations}`);
  return data.board;
};

const App = () => {
  const queryClient = useQueryClient();
  const [generations, setGenerations] = useState(2);
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState({ rows: 20, cols: 35 });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const emptyBoard = Array.from(Array(boardSize.rows), () => Array(boardSize.cols).fill(0));
    setBoard(emptyBoard);
  }, [boardSize]);

  const { isLoading: isInitializing, mutate: initializeMutation } = useMutation(initializeBoard, {
    onSuccess: () => {
      setIsInitialized(true);
      queryClient.invalidateQueries('board');
    },
  });

  const { isLoading: isEvolving, mutate: evolveMutation } = useMutation(evolveBoard, {
    onSuccess: (newBoard) => {
      setBoard(newBoard);
      queryClient.invalidateQueries(['board', generations]);
    },
  });

  const { data: fetchedBoard, isFetching } = useQuery(['board', generations], fetchBoard, {
    enabled: isInitialized && generations > 0,
  });

  const handleInitialize = () => {
    initializeMutation(board);
  };

  const handleEvolve = () => {
    evolveMutation();
  };

  const handleFetchBoard = () => {
    queryClient.invalidateQueries(['board', generations]);
    setBoard(fetchedBoard);
    initializeMutation(board)
  };

  const toggleCell = (row, col) => {
    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? (cell ? 0 : 1) : cell))
    );
    setBoard(newBoard);
  };

  const controlsProps = { handleFetchBoard, handleInitialize, handleEvolve, isEvolving, isInitializing, isFetching, isInitialized, generations, setGenerations }

  return (
    <>
      <h1>Game of Life</h1>
      <Controls {...controlsProps} />
      <div>
        {(isInitializing || isEvolving || isFetching) && <span className="loader"></span>}
        <Board board={board} toggleCell={toggleCell} />
      </div>
    </>
  );
};

export default App;
