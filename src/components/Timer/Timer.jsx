import React, { useRef, useState } from "react";
import Flatpickr from "react-flatpickr";

import "flatpickr/dist/flatpickr.css";
import css from "./Timer.module.css";

export const Timer = () => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00  ");
  const [date, setDate] = useState(null);

  let interval = useRef(null);

  const startTimer = () => {
    const countdownDate = new Date(date).getTime();
    console.log(countdownDate);

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);

      clearInterval(interval.current);
    }, 1000);
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Our timer ready</h1>
      <p className={css.description}>Please enter the start date</p>
      <form className={css.form}>
        <Flatpickr
          className={css.input}
          ref={interval}
          options={{
            enableTime: true,
            minDate: "today",
            time_24hr: true,
            defaultDate: new Date(),
            minuteIncrement: 1,
          }}
          onChange={(e) => {
            setDate(e);
          }}
        />
        <button
          className={css.form__button}
          type="button"
          onClick={() => startTimer()}
        >
          Enter
        </button>
      </form>
      <div className={css.time}>
        <div className={css.time__box}>
          <span className={css.time__number}>{days}</span>
          <span className={css.time__name}>Days</span>
        </div>
        <div className={css.time__box}>
          <span className={css.time__number}>{hours}</span>
          <span className={css.time__name}>Hours</span>
        </div>
        <div className={css.time__box}>
          <span className={css.time__number}>{minutes}</span>
          <span className={css.time__name}>Minutes</span>
        </div>
        <div className={css.time__box}>
          <span className={css.time__number}>{seconds}</span>
          <span className={css.time__name}>Seconds</span>
        </div>
      </div>
    </div>
  );
};
