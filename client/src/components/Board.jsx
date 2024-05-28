const Board = ({ board, toggleCell }) => {
  return (
    <div>
      <div>
        {board?.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cellValue, colIndex) => (
              <div
                key={colIndex}
                style={{
                  width: '20px',
                  height: '20px',
                  border: '1px solid black',
                  backgroundColor: cellValue ? 'greenyellow' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
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
