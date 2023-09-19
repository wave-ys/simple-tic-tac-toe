import React from 'react';
import GameControl from "./game-control";
import {GameStateProvider} from "./game-provider";
import GameBoard from "./game-board";
import GameResult from "./game-result";

function App() {
    return (
        <GameStateProvider>
            <div className="App">
                <GameControl/>
                <GameBoard />
                <GameResult />
            </div>
        </GameStateProvider>
    );
}

export default App;
