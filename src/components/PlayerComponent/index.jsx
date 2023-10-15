import React, { useContext } from "react";
import historyContext from "../../contexts/historyContext";

function PlayerComponent() {
    const {nextPlayer} = useContext(historyContext);
    return (
        <div>
            <p><strong>Player:</strong> {nextPlayer}</p>
        </div>
    );
}

export default React.memo(PlayerComponent);
