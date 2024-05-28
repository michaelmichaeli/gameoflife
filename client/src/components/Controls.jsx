const Controls = ({ handleFetchBoard, handleInitialize, handleEvolve, isEvolving, isInitializing, isFetching, isInitialized, generations, setGenerations }) => {

  return (
    <div className="game-controls">
      <button
        onClick={handleInitialize}
        disabled={isInitializing || isEvolving || isFetching}
      >
        {isInitializing ? 'Initializing...' : 'Initialize Board'}
      </button>
      <button
        onClick={handleEvolve}
        disabled={!isInitialized || isInitializing || isEvolving || isFetching}
      >
        {isEvolving ? 'Evolving...' : 'Evolve Once'}
      </button>
      <div>
        <input
          type="number"
          value={generations}
          onChange={(e) => setGenerations(Number(e.target.value))}
          disabled={!isInitialized || isInitializing || isEvolving || isFetching}
        />
        <button
          onClick={handleFetchBoard}
          disabled={!isInitialized || isInitializing || isEvolving || isFetching}
        >
          {isFetching ? 'Fetching...' : `Evolve ${generations} Generations`}
        </button>
      </div>
    </div>
  )
};

export default Controls;
