
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

function Cell(props) {
    const { cell, index, count, setCount, history, setHistory,setCurrentPlayer } = props;
    const [type, setType] = useState('');

    const handleClick = () => {

        let lastHistory = getLastItem(history);

        if (lastHistory[index]) return;

        setCount(count + 1);
        let _type = (count % 2) ? 'O' : 'X';
        setCurrentPlayer(_type);
        setType(_type);
        lastHistory[index] = _type;
        const newHistory = [...lastHistory];
        const updatedHistory = [...history, newHistory];
        setHistory(updatedHistory);
    }

    return (
        <div className={`board__cell ${type ? `board__cell--${type}` : ''}`} onClick={handleClick}>
            {type}
        </div>
    );
}


function App() {
    let initializeValues = new Array(9).fill(null);
    const [cells, setCell] = useState(initializeValues);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [count, setCount] = useState(1);
    const [history, setHistory] = useState([initializeValues]);

    return (
        <div className="App">
            <div className='container'>
                <div className='board'>
                    {cells.map(
                        (cell, index) => <Cell
                            key={`cell-${index}`}
                            cell={cell}
                            index={index}
                            count={count}
                            setCount={setCount}
                            history={history}
                            setHistory={setHistory}
                            setCurrentPlayer={setCurrentPlayer}

                        />)}
                </div>
                <Player player={(count % 2 && count > 0) ? 'O' : 'X'} />
                <Winner history={history} player={currentPlayer}/>
            </div>
        </div>
    );
}

export default App;
