import React, { useState, useEffect } from 'react';

//move all clock set up functions into another file

function Clock(){

  const [clock, setClock] = useState(
    getClockTime()
    )

  useEffect(() => {
    let timer = setInterval(() => {
      setClock(
        getClockTime()
      );
    }, oneSecond);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div className="clock">
        <div className="pulse" style={clockStyle}>
          <span style={digitStyle}>
            {`${clock.hours}:${clock.minutes}:${clock.seconds}`}
          </span>
          <span style={tzStyle}>{clock.offset}</span>
          <span style={ampmStyle}>{clock.ampm}</span>
        </div>
    </div>
  );
}
export default Clock;

/*clock styles*/
/* https://github.com/facebook/react/issues/5783 -moz-fit-content
ie doesnt like this implementation of grid. wewlad
*/
const digitSize = '6rem'
const clockDetailSize = '2rem'
const clockStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: '1fr 1fr',
  gridTemplateAreas: "'main main main main' 'tz . . ampm'",
  width: `calc(${digitSize} * 5)`,
  margin: '0 auto',
  fontFamily: '"Lucida Console", Monaco, monospace',
}
const digitStyle = {
  gridArea: 'main',
  fontSize: digitSize,
}
const ampmStyle ={
  gridArea: 'ampm',
  fontSize: clockDetailSize,
  marginTop: '-1.2rem',
  marginRight: '15%',
  textAlign: 'right'
}
const tzStyle ={
  gridArea: 'tz',
  fontSize: clockDetailSize,
  marginTop: '-1.2rem',
  marginLeft: '15%',
  textAlign: 'left'
}
const oneSecond = () => 1000
const getCurrentTime = () => new Date()

//added offset -> where do we want to "guess" timezone from the offset?
//also need to add the offset to the time if we want to show the locale time
const serializeClockTime = date => ({
  hours: date.getUTCHours(),
  minutes: date.getUTCMinutes(),
  seconds: date.getUTCSeconds(),
  offset: date.getTimezoneOffset(),
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
  appendAMPM,
  convertToCivilianTime,
  doubleDigits
)
