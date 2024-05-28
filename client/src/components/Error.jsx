const Error = ({ errorInfo }) => {
  console.error(errorInfo);
  return (
    <>
      {errorInfo.toString()}
    </>
  )
}

export default Error