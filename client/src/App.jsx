import useGameBoard from './hooks/useGameBoard';

import Board from './components/Board';
import Controls from './components/Controls';
import GameLoadAndSaveControls from './components/GameLoadAndSaveControls';
import LoaderSpinner from './components/LoaderSpinner';
import RandomAndClearControls from './components/RandomAndClearControls';

import './App.css'

export const backendURL = 'http://localhost:3001/api';
export const boardSize = { rows: 15, cols: 27 }

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
