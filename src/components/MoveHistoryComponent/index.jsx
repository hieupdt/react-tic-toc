import { useContext } from 'react';
import historyContext from '../../contexts/historyContext';
import { getLastItem } from '../../services/common';

function MoveHistoryComponent(props) {
    const { history, setCellsAndHistory, setCount } = useContext(historyContext);
    const lastIndexHistory = history.length - 1;

    const handleClick = (index) => {
        if (lastIndexHistory == index) {
            return;
        }
        const prevHistory = history.slice(0, index + 1);
        console.log(prevHistory);

        let lastHistory = getLastItem(prevHistory);
        setCellsAndHistory(lastHistory, prevHistory);
        setCount(history.length);
    }
    return (
        <div className="move-history">
            <h2>Move History:</h2>
            <ul>
                {history.map((step, index) => {
                    const desc = index ? `index #${index} (${index % 2 === 0 ? 'player X' : 'player O'})` : 'Game start';
                    return (
                        <li key={`history-tab-${index}`} onClick={() => handleClick(index)} >
                            <button disabled={lastIndexHistory == index ? 'disabled' : ''}>{desc}</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default MoveHistoryComponent;