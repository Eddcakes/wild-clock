import React, { useState, useEffect } from 'react';

function Clock(){
  const clockStyle = {
    fontFamily: '"Lucida Console", Monaco, monospace',
  }
  const [counter, setCounter] = useState(0)
  //can we use our compose function when we initialize our clock?
  const [clock, setClock] = useState(
    //serializeClockTime(new Date())
    getClockTime()
    )

  useEffect(() => {
    let timer = setTimeout(() => {
      setCounter(counter + 1);
      setClock(
        //serializeClockTime(new Date())
        getClockTime()
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div className="clock">
      <p>
        {counter}
      </p>
      <p>
        <span style={clockStyle}>
          {`${clock.hours}:${clock.minutes}:${clock.seconds}`}
          <span>{clock.ampm}</span>
        </span>
      </p>
    </div>
  );
}
export default Clock;

const initialState = () => {return {hours: '', minutes: '', seconds: '', ampm: ''}}
const oneSecond = () => 1000
const getCurrentTime = () => new Date()

const serializeClockTime = date => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
})
const civilianHours = clockTime => ({
  ...clockTime,
  hours: (clockTime.hours > 12) ?
  clockTime.hours - 12 : 
  clockTime.hours
})
const appendAMPM = clockTime => ({
  ...clockTime,
  ampm: (clockTime.hours >= 12) ?
  "pm" :
  "am"
})
const prependZero = key => clockTime => ({
  ...clockTime,
  [key]: (clockTime[key] < 10) ?
  "0" + clockTime[key] :
  clockTime[key]
})
const compose = (...fns) =>
  (arg) => fns.reduce(
    (composed, f) => f(composed),
    arg
  )
const convertToCivilianTime = clockTime => 
  compose(
    appendAMPM,
    civilianHours
  )(clockTime)
const doubleDigits = civilianTime =>
  compose(
    prependZero("hours"),
    prependZero("minutes"),
    prependZero("seconds"),
  )(civilianTime)
const getClockTime = compose(
  getCurrentTime,
  serializeClockTime,
  convertToCivilianTime,
  appendAMPM,
  doubleDigits
)
