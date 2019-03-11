import React, { useState, useEffect } from 'react';

function Clock(){
  const [time, setTime] = useState([initialState])
  return (
    <div className="clock">
      <span>
        {console.log(`time hours: ${time.hours} `)}
        {}
      </span>
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
