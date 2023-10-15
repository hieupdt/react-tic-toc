
import './App.css';
import { useState, useContext, createContext } from 'react';
import historyContext from './contexts/historyContext';
import { getLastItem } from './services/common';
import PlayerComponent from './components/PlayerComponent';
import WinnerComponent from './components/WinnerComponent';
import BoardComponent from './components/BoardComponent';
import MoveHistoryComponent from './components/MoveHistoryComponent';

const initializeValues = new Array(9).fill(null);



function App() {

    const [cells, setCells] = useState(initializeValues);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [nextPlayer, setNextPlayer] = useState('X');
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState([initializeValues]);


    const handleCellClick = (index) => {
        let lastHistory = getLastItem(history);
        if (lastHistory[index]) return;
        setCount(count + 1);

        let _type = (count % 2) ? 'O' : 'X';
        setCurrentPlayer(_type);
        let _nextPlayer = (_type === 'X') ? 'O' : 'X';
        setNextPlayer(_nextPlayer);


        lastHistory[index] = _type;
        const newHistory = [...lastHistory];
        const updatedHistory = [...history, newHistory];
        setCellsAndHistory(newHistory, updatedHistory);
    }

    const setCellsAndHistory = (currentHistoryCell, history) => {
        setCells(currentHistoryCell);
        setHistory(history);
    }

    const historyValues = { history, cells, nextPlayer, currentPlayer, handleCellClick, setCellsAndHistory, setCount };

    return (
        <div className="App">
            <div className='container'>
                <historyContext.Provider value={historyValues}>
                    <BoardComponent />
                    <PlayerComponent />
                    <WinnerComponent />
                    <MoveHistoryComponent />
                </historyContext.Provider>
            </div>
        </div>
    );
}
export default App;
