import React from 'react';
import CellComponent from '../CellComponent';

function BoardComponent({ cells, handleCellClick }) {
    return (
        <div className='board'>
            {cells.map((_, index) => (
                <CellComponent
                    key={`cell-${index}`}
                    value={cells[index]}
                    handleClick={() => handleCellClick(index)}
                />
            ))}
        </div>
    );
}

export default BoardComponent;
