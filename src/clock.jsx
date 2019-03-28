import React, { useState, useEffect } from 'react';
import styles from './clock.module.scss'
import { getClockTime, oneSecond } from './clock-setup';

function Clock({effect}){
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
      <div className={`${styles.clock} ${effect}`}>
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