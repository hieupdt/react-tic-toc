import React,{ useContext, useCallback } from 'react';
import { getLastItem } from '../../services/common';
import historyContext from '../../contexts/historyContext';
function WinnerComponent() {
    console.log("MyComponent is re-rendering");
    const { history, currentPlayer } = useContext(historyContext);
    if (!history) {
        console.error("History is undefined. Make sure this component is wrapped within a historyContext.Provider.");
        return null;
    }
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

    const checkWin = (board, currentPlayer) => {
        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
                return true;
            }
        }
        return false;
    };

    if (checkWin(board, currentPlayer)) {
        return (
            <div>
                <p><strong>Winner player:</strong> {currentPlayer}</p>
            </div>
        );
    }

}

export default WinnerComponent;