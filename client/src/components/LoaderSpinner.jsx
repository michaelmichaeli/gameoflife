const LoaderSpinner = ({ isInitializing, isEvolving, isFetching }) => {
  return (
    <>
      {(isInitializing || isEvolving || isFetching) && <span className="loader-spinner"></span>}
    </>
  )
}

export default LoaderSpinner