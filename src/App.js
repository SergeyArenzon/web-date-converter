import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
    const [isHebrew, setIsHenrew] = useState(true);
    const [date, setDate] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [afterSunshine, setAfterSunshine] = useState("");

    const inputDateHandler = (inputDate) => {
        const date = {};
        date.year = inputDate.slice(0, 4);
        date.month = inputDate.slice(5, 7);
        date.day = inputDate.slice(8, 10);

        return date;
    };

    const convertHandler = () => {
        if (date !== "") {
            setError('');
            const fixedDate = inputDateHandler(date);

            axios
                .get(
                    "https://www.hebcal.com/converter?cfg=json&gy=" +
                        fixedDate.year +
                        "&gm=" +
                        fixedDate.month +
                        "&gd=" +
                        fixedDate.day +
                        "&g2h=1"
                )
                .then((res) => setOutput(res.data.hebrew));
        } else {

            setError('NO CORRECT DATE FORMAT CHOSEN!');
        }
    };

    return (
        <div className="App">
            <h1>Convert your date</h1>
            {error}
            <input
                type="date"
                onChange={(event) => setDate(event.target.value)}
            ></input>
            <button onClick={convertHandler}>Convert</button>
            <div>{output}</div>
            <div>{date}</div>
        </div>
    );
}

export default App;
