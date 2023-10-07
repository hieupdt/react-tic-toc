
import { useState } from 'react';
import { getLastItem } from './services/common';
import './App.css';

function Winner(props) {
    const { history, player } = props;
    let board = getLastItem(history);
    const winConditions = [
        [0, 1, 2], // Hàng ngang đầu
        [3, 4, 5], // Hàng ngang thứ hai
        [6, 7, 8], // Hàng ngang thứ ba
        [0, 3, 6], // Cột đầu
        [1, 4, 7], // Cột thứ hai
        [2, 5, 8], // Cột thứ ba
        [0, 4, 8], // Đường chéo chính (trái sang phải)
        [2, 4, 6], // Đường chéo phụ (phải sang trái)
    ];

    const checkWin = (board, player) => {
        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] === player && board[b] === player && board[c] === player) {
                return true;
            }
        }
        return false;
    };

    if (checkWin(board, player)) {
        return (
            <div>
                <p><strong>Winner Player:</strong> {player}</p>
            </div>
        );
    }

}
function Player({ player }) {
    return (
        <div>
            <p><strong>Player:</strong> {player}</p>
        </div>
    );
}

function MoveHistory(props) {
    const { history, setCellsAndHistory ,setCount} = props;
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

function Cell(props) {
    const { value, handleClick } = props;
    return (
        <div className={`board__cell ${value ? `board__cell--${value}` : ''}`} onClick={handleClick}>
            {value}
        </div>
    );
}


function App() {
    let initializeValues = new Array(9).fill(null);
    const [cells, setCells] = useState(initializeValues);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState([initializeValues]);
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
                <div className='board'>
                    {cells.map(
                        (_, index) => <Cell
                            key={`cell-${index}`}
                            value={cells[index]}
                            handleClick={() => handleCellClick(index)}
                        />)}
                </div>
                <Player player={(count % 2 && count > 0) ? 'O' : 'X'} />
                <Winner history={history} player={currentPlayer} />
                <MoveHistory history={history} setCellsAndHistory={setCellsAndHistory}  setCount={setCount}/>
            </div>
        </div>
    );
}

export default App;
