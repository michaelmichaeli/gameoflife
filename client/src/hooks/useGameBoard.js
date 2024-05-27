import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { generateEmptyBoard } from '../utils/boardUtils';

const URL = 'http://localhost:3001/api'

const fetchBoard = async ({ queryKey }) => {
  const [_, generations] = queryKey;
  const response = await axios.get(`${URL}/board?generations=${generations}`);
  return response.data.board;
};

const evolveBoard = async () => {
  try {
    const response = await axios.post(`${URL}/evolve`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to evolve the board');
  }
};

const initializeBoard = async (initialBoard) => {
  try {
    const response = await axios.post(`${URL}/initialize`, { board: initialBoard });
    return response.data;
  } catch (error) {
    throw new Error('Failed to initialize the board');
  }
};

const useGameBoard = (boardSize, defaultGenerations = 2) => {
  const queryClient = useQueryClient();
  const [generations, setGenerations] = useState(defaultGenerations);
  const [board, setBoard] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isEvolving, setIsEvolving] = useState(false);

  useEffect(() => {
    const emptyBoard = generateEmptyBoard(boardSize.rows, boardSize.cols);
    setBoard(emptyBoard);
  }, [boardSize]);

  const { data: fetchedBoard, isFetching } = useQuery(
    ['board', generations],
    fetchBoard,
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error('Fetching error:', error);
        setIsInitialized(false);
      },
      onSuccess: (data) => {
        if (data) {
          setBoard(data);
        }
        console.log('Fetching success:', { board: data });
        setIsInitialized(true);
      },
      onSettled: () => {
        console.log('Fetching settled');
      }
    }
  );

  const evolveMutation = useMutation(evolveBoard, {
    onMutate: () => {
      setIsEvolving(true);
      console.log('Evolution started');
    },
    onSuccess: (data) => {
      if (data?.board) {
        setBoard(data.board);
      }
      console.log('Evolution success:', data);
      setIsInitialized(true);
    },
    onError: (error) => {
      console.error('Evolution error:', error);
    },
    onSettled: () => {
      console.log('Evolution settled');
      setIsEvolving(false);
    }
  });

  const initializeMutation = useMutation(initializeBoard, {
    onMutate: () => {
      setIsInitializing(true);
      console.log('Initialization started');
    },
    onSuccess: (data) => {
      setIsInitialized(true);
      console.log('Initialization success:', data);
    },
    onError: (error) => {
      console.error('Initialization error:', error);
    },
    onSettled: () => {
      console.log('Initialization settled');
      setIsInitializing(false);
    }
  });

  const evolveBoardData = () => {
    evolveMutation.mutate();
  };

  const initializeBoardData = () => {
    initializeMutation.mutate(board);
  };

  const fetchBoardData = () => {
    queryClient.fetchQuery(['board', generations]);
  };

  const toggleCell = (row, col) => {
    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? (cell ? 0 : 1) : cell))
    );
    setBoard(newBoard);
  };

  return {
    generations,
    setGenerations,
    board,
    toggleCell,
    fetchBoardData,
    evolveBoardData,
    initializeBoardData,
    isInitialized,
    isFetching,
    isInitializing,
    isEvolving
  };
}

export default useGameBoard;
