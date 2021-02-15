import classes from "./App.module.css";
import React, { useState } from "react";
import axios from "axios";
import { ReactJewishDatePicker, BasicJewishDay } from "react-jewish-datepicker";

function App() {
    const [toHebrew, setToHebrew] = useState(true);
    const [date, setDate] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [afterSunshine, setAfterSunshine] = useState("");
    const [basicJewishDay, setBasicJewishDay] = useState("");

    const inputDateHandler = (inputDate) => {
        const date = {};
        date.year = inputDate.slice(0, 4);
        date.month = inputDate.slice(5, 7);
        date.day = inputDate.slice(8, 10);

        return date;
    };

    const inputHebrewDateHandler = (inputDate) => {
        const date = {};
        date.month = inputDate.slice(4, 7);
        date.day = inputDate.slice(8, 10);
        date.year = inputDate.slice(11, 15);
        return date;
    };
    const convertHandler = () => {
        if (date !== "") {
            setError("");

            if (toHebrew) {
                //  gregorian --> hebrew mode
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
            }
        } else if (basicJewishDay) {
            const fixedDate = inputHebrewDateHandler(
                basicJewishDay.date.toString()
            );
            setOutput(
                fixedDate.day + " " + fixedDate.month + " " + fixedDate.year
            );
        } else {
            setError("NO CORRECT DATE FORMAT CHOSEN!");
        }
    };

    // handles change convert modes
    const changeHandler = () => {
        setToHebrew(!toHebrew);
        setOutput("");
        setError("");
        setBasicJewishDay("");
    };

    let format = (
        <div>
            <input
                type="date"
                onChange={(event) => setDate(event.target.value)}
            ></input>
        </div>
    );

    if (!toHebrew) {
        format = (
            <div className={classes.HebForm}>
                <ReactJewishDatePicker
                    className={classes.Heb}
                    value={new Date()}
                    isHebrew
                    onClick={(day) => {
                        setBasicJewishDay(day);
                    }}
                />{" "}
            </div>
        );
    }

    return (
        <div className={classes.App}>
            <div className={classes.Form}>
                <div className={classes.Error}>{error}</div>
                <h1>Convert your date</h1>

                {format}
                <div className={classes.Convert} onClick={convertHandler}>
                    Convert
                </div>

                <div className={classes.Switcher} onClick={changeHandler}>
                    {" "}
                    {toHebrew ? "Jewish TO Gregorain" : "Gregorain TO Jewish"}
                </div>
            </div>
            <div className={classes.Output}>
                <div className={classes.Arrow}></div> <div className={classes.OutputDate}>{output}</div>
            </div>
        </div>
    );
}

export default App;
