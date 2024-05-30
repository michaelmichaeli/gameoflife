import React from 'react';
import useGameLoadAndSave from '../hooks/useGameLoadAndSave';

const GameLoadAndSaveControls = ({ board, setBoard, setIsInitialized }) => {
  const {
    gameSaves,
    selectedGameSave,
    setSelectedGameSave,
    handleLoadGame,
    handleSaveGame,
  } = useGameLoadAndSave(setBoard, setIsInitialized);

  return (
    <div className='game-loader-controls'>
      <div>
        <select onChange={(e) => setSelectedGameSave(e.target.value)}>
          <option value="">Game Board</option>
          {gameSaves?.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button
          onClick={handleLoadGame}
          disabled={!selectedGameSave}
        >Load Game Board</button>
      </div>
      <button onClick={() => handleSaveGame(board)}>Save Game Board</button>
    </div>
  );
};

export default GameLoadAndSaveControls;
