import React, { useState, useEffect } from 'react';
import styles from './clock.module.scss'

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
    <div>
        <div className={`${styles.clock} pulse`}>
          <span className={styles.digits}>
            {`${clock.hours}:${clock.minutes}:${clock.seconds}`}
          </span>
          <span className={styles.timezone}>{clock.offset}</span>
          <span className={styles.ampm}>{clock.ampm}</span>
        </div>
    </div>
  );
}
export default Clock;

/*clock styles*/
/* https://github.com/facebook/react/issues/5783 -moz-fit-content
ie doesnt like this implementation of grid. wewlad
*/
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
