import React from 'react';

const RandomAndClearControls = ({ clearBoard, setIsInitialized, randomizeBoard, isInitialized, isInitializing, isEvolving, isFetching }) => {

  const handleClearBoard = () => {
    setIsInitialized(false);
    clearBoard();
  }
  const handleRandomizeBoard = () => {
    setIsInitialized(false);
    randomizeBoard();
  }

  return (
    <div className='random-clear-controls'>

      <button
        onClick={handleClearBoard}
        disabled={ isInitializing || isEvolving || isFetching}
      >Clear Game Board</button>

      <button
        disabled={ isInitializing || isEvolving || isFetching}
        onClick={handleRandomizeBoard}
      >Randomize Game Board</button>

    </div>
  );
};

export default RandomAndClearControls;
