const Controls = ({ handleFetchBoard, handleInitialize, handleEvolve, isEvolving, isInitializing, isFetching, isInitialized, generations, setGenerations }) => {

  return (
    <>
      <button onClick={handleInitialize} disabled={isInitializing || isEvolving || isFetching}>
        {isInitializing ? 'Initializing...' : 'Initialize Board'}
      </button>
      <button onClick={handleEvolve} disabled={!isInitialized || isInitializing || isEvolving || isFetching}>
        {isEvolving ? 'Evolving...' : 'Evolve Board'}
      </button>
      <input
        type="number"
        value={generations}
        onChange={(e) => setGenerations(Number(e.target.value))}
      />
      <button onClick={handleFetchBoard} disabled={!isInitialized || isInitializing || isEvolving || isFetching}>
        {isFetching ? 'Fetching...' : 'Get Board State'}
      </button>
    </>
  )
};

export default Controls;
