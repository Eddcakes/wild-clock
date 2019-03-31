export const oneSecond = () => 1000
const getCurrentTime = () => new Date()
const serializeClockTime = date => {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    offset:  invertNumber(date.getTimezoneOffset() / 60),
  }
}
const invertNumber = number => number *= -1
const appendAMPM = clockTime => ({
  ...clockTime,
  ampm: (clockTime.hours >= 12) ?
  "pm" :
  "am"
})
const civilianHours = clockTime => ({
  ...clockTime,
  hours: (clockTime.hours > 12) ?
  clockTime.hours - 12 : 
  clockTime.hours
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