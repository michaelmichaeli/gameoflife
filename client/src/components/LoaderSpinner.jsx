const LoaderSpinner = ({ isInitializing, isEvolving, isFetching }) => {
  return (
    <>
      {(isInitializing || isEvolving || isFetching) && <span className="loader"></span>}
    </>
  )
}

export default LoaderSpinner