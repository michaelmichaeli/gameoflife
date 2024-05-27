import React from 'react';
import useGameLoadAndSave from '../hooks/useGameLoadAndSave';

const GameLoader = () => {
  const {
    gameSaves,
    selectedGameSaves,
    setSelectedGameSaves,
    handleLoadGame,
    handleSaveGame,
  } = useGameLoadAndSave();

  return (
    <div>
      <h2>Load Game State</h2>
      <select onChange={(e) => setSelectedGameSaves(e.target.value)}>
        <option value="">Select a game save to load</option>
        {gameSaves?.map(gameState => (
          <option key={gameState.id} value={gameState.id}>
            Game ID: {gameState.id}
          </option>
        ))}
      </select>
      <button onClick={handleLoadGame}>Load Game</button>
      <button onClick={() => handleSaveGame(/* pass the current game state here */)}>Save Game</button>
    </div>
  );
};

export default GameLoader;
