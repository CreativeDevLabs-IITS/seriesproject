import { useEffect, useState } from "react";

function getTimeParts(targetMs) {
  const diff = targetMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, done: false };
}

export function useCountdown(isoDateTime) {
  const targetMs = new Date(isoDateTime).getTime();
  const [time, setTime] = useState(() => getTimeParts(targetMs));

  useEffect(() => {
    const tick = () => setTime(getTimeParts(targetMs));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetMs]);

  return time;
}
