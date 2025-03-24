import useGameBoard from './hooks/useGameBoard';

import Board from './components/Board';
import Controls from './components/Controls';
import GameLoadAndSaveControls from './components/GameLoadAndSaveControls';
import LoaderSpinner from './components/LoaderSpinner';
import RandomAndClearControls from './components/RandomAndClearControls';

import './App.css'

export const backendURL = 
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3001/api'
    : 'https://gameoflife-2ad0.onrender.com/api';
    
export const boardSize = { rows: 13, cols: 25 }

const App = () => {
  const {
    generations,
    setGenerations,
    board,
    loadBoard,
    clearBoard,
    randomizeBoard,
    toggleCell,
    isEvolving,
    isInitializing,
    isFetching,
    isInitialized,
    setIsInitialized,
    fetchBoardData,
    evolveBoardData,
    initializeBoardData
  } = useGameBoard(boardSize);

  const handleEvolve = () => {
    evolveBoardData();
  };

  const handleInitialize = () => {
    initializeBoardData();
  };

  const handleFetchBoard = () => {
    fetchBoardData();
  };

  const buttonsProps = { isEvolving, isInitializing, isFetching, isInitialized }
  const controlsProps = { handleFetchBoard, handleInitialize, handleEvolve, generations, setGenerations }
  const loaderSpinnerProps = { isInitializing, isEvolving, isFetching }
  const randomAndClearProps = { randomizeBoard, clearBoard, setIsInitialized }
  const loadAndSaveProps = { board, loadBoard, setIsInitialized }

  return (
    <>
      <h1>Conway&apos;s Game of Life</h1>
      <Controls {...buttonsProps} {...controlsProps} />
      <div className='game-container'>
        <LoaderSpinner {...loaderSpinnerProps} />
        <Board board={board} toggleCell={toggleCell} />
      </div>
      <RandomAndClearControls {...buttonsProps} {...randomAndClearProps} />
      <GameLoadAndSaveControls {...buttonsProps} {...loadAndSaveProps} />
    </>
  );
};

export default App;
