import React from 'react';
import useGameLoadAndSave from '../hooks/useGameLoadAndSave';

const GameLoadAndSaveControls = ({ board }) => {
  const {
    gameSaves,
    selectedGameSaves,
    setSelectedGameSaves,
    handleLoadGame,
    handleSaveGame,
  } = useGameLoadAndSave();

  return (
    <div className='game-loader-controls'>
      <div>
        <select onChange={(e) => setSelectedGameSaves(e.target.value)}>
          <option value="">Select a game save to load</option>
          {gameSaves?.map(gameState => (
            <option key={gameState.id} value={gameState.id}>
              Game ID: {gameState.id}
            </option>
          ))}
        </select>
        <button onClick={handleLoadGame}>Load Game</button>
      </div>
      <button onClick={() => handleSaveGame(board)}>Save Game</button>
    </div>
  );
};

export default GameLoadAndSaveControls;
