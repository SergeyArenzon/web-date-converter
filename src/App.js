import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
    const [isHebrew, setIsHenrew] = useState(true);



    
    return (
        <div className="App">
            <h1>Convert your date</h1>
            <input type="date"></input>
            <button>Convert</button>
        </div>
    );
}

export default App;
