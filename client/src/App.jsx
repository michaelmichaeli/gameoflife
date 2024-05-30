import useGameBoard from './hooks/useGameBoard';

import Board from './components/Board';
import Controls from './components/Controls';
import GameLoadAndSaveControls from './components/GameLoadAndSaveControls';
import LoaderSpinner from './components/LoaderSpinner';

import './App.css'

export const backendURL = 'http://localhost:3001/api';
export const boardSize = { rows: 15, cols: 27 }

const App = () => {
  const {
    generations,
    setGenerations,
    board,
    setBoard,
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

  const controlsProps = { handleFetchBoard, handleInitialize, handleEvolve, isEvolving, isInitializing, isFetching, isInitialized, generations, setGenerations }
  const loaderSpinnerProps = { isInitializing, isEvolving, isFetching }

  return (
    <>
      <h1>Conway&apos;s Game of Life</h1>
      <Controls {...controlsProps} />
      <div className='game-container'>
        <LoaderSpinner {...loaderSpinnerProps} />
        <Board board={board} toggleCell={toggleCell} />
      </div>
      <GameLoadAndSaveControls board={board} setBoard={setBoard} setIsInitialized={setIsInitialized} />
    </>
  );
};

export default App;
