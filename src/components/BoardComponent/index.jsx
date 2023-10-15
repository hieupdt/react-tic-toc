import React, {useContext} from 'react';
import historyContext from '../../contexts/historyContext';
import CellComponent from '../CellComponent';

function BoardComponent() {
    const {cells, handleCellClick} = useContext(historyContext);
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
