export const oneSecond = () => 1000
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
export const getClockTime = compose(
  getCurrentTime,
  serializeClockTime,
  appendAMPM,
  convertToCivilianTime,
  doubleDigits
)