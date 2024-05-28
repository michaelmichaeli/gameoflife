import { useState } from 'react';
import useGameBoard from './hooks/useGameBoard';

import Board from './components/Board';
import Controls from './components/Controls';
import GameLoadAndSaveControls from './components/GameLoadAndSaveControls';
import LoaderSpinner from './components/LoaderSpinner';

import './App.css'

export const URL = 'http://localhost:3001/api';

const App = () => {
  const [boardSize] = useState({ rows: 15, cols: 27 });
  const {
    generations,
    setGenerations,
    board,
    toggleCell,
    isEvolving,
    isInitializing,
    isFetching,
    isInitialized,
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
      <GameLoadAndSaveControls board={board} />
    </>
  );
};

export default App;
