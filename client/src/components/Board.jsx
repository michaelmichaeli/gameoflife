const Board = ({ board, toggleCell }) => {
  return (
    <div>
      <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px'
          }}>
        {board?.map((row, rowIndex) => (
          <div key={rowIndex} style={{
            display: 'flex',
            gap: '3px'
          }}>
            {row.map((cellValue, colIndex) => (
              <div
                key={colIndex}
                style={{
                  width: '20px',
                  height: '20px',
                  border: '1px solid black',
                  backgroundColor: cellValue ? 'greenyellow' : 'black',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  borderRadius: '25%'
                }}
                onClick={() => toggleCell(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
