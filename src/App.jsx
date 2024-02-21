import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getPadTime } from "./helper/getPadtime";

function App() {
  const [time, setTime] = useState(50 * 60);
  const [isCounting, setisCounting] = useState(true);
  const minutes = getPadTime(Math.floor(time / 60));
  const seconds = getPadTime(time - minutes * 60);
  useEffect(() => {
    const interval = setInterval(() => {
      isCounting && setTime((time) => (time >= 1 ? time - 1 : 0));
    }, 1000);
    if (time === 0) setisCounting(false);
    return () => {
      clearInterval(interval);
    };
  }, [time, isCounting]);
  function hadleStop() {
    setisCounting(false);
  }
  function hadleStart() {
    if (time === 0) setTime(50 * 60);
    setisCounting(true);
  }
  function hadleReset() {
    setTime(50 * 60);
    setisCounting(false);
  }
  return (
    <>
      <div className="content">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="row">
        {isCounting ? (
          <button onClick={hadleStop}>Stop</button>
        ) : (
          <button onClick={hadleStart}>Start</button>
        )}
        <button onClick={hadleReset}>Reset</button>
      </div>
    </>
  );
}

export default App;
