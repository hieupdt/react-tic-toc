// HistoryContext.js

import { createContext } from 'react';

const historyContext = createContext({
    history: [],
    setHistory: () => { },
});

export default historyContext;
