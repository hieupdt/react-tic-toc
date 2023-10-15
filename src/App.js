
import './App.css';
import { useState, useContext, createContext } from 'react';
import historyContext from './contexts/historyContext';
import { getLastItem } from './services/common';
import PlayerComponent from './components/PlayerComponent';
import WinnerComponent from './components/WinnerComponent';
import BoardComponent from './components/BoardComponent';

const initializeValues = new Array(9).fill(null);

function MoveHistory(props) {
    const { history } = useContext(historyContext);
    const { setCellsAndHistory, setCount } = props;
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

function App() {

    const [cells, setCells] = useState(initializeValues);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState([initializeValues]);
    const historyValues = { history, setHistory };
    const [type, setType] = useState(null);

    const handleCellClick = (index) => {
        let lastHistory = getLastItem(history);
        if (lastHistory[index]) return;
        setCount(count + 1);
        let _type = (count % 2) ? 'O' : 'X';
        setCurrentPlayer(_type);
        setType(_type);
        lastHistory[index] = _type;
        const newHistory = [...lastHistory];
        const updatedHistory = [...history, newHistory];
        setCellsAndHistory(newHistory, updatedHistory);
    }

    const setCellsAndHistory = (currentHistoryCell, history) => {
        setCells(currentHistoryCell);
        setHistory(history);
    }

    return (
        <div className="App">
            <div className='container'>
                <historyContext.Provider value={historyValues}>
                    <BoardComponent cells={cells} handleCellClick={handleCellClick} />
                    <PlayerComponent player={(count % 2 && count > 0) ? 'O' : 'X'} />
                    <WinnerComponent player={currentPlayer} />
                    <MoveHistory setCellsAndHistory={setCellsAndHistory} setCount={setCount} />
                </historyContext.Provider>
            </div>
        </div>
    );
}
export default App;
