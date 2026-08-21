import { lastDayOfMonth, set, isAfter, addMonths } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

const TIMEZONE = 'Europe/London';

export function getNextDrawDate(): Date {
  const now = new Date();
  // Get current time in London
  const zonedNow = toZonedTime(now, TIMEZONE);
  
  // Get last day of current month in London
  let targetZonedDate = lastDayOfMonth(zonedNow);
  
  // Set time to 10:00 AM
  targetZonedDate = set(targetZonedDate, {
    hours: 10,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  });

  // Convert the target London time back to a UTC Date object
  let targetDate = fromZonedTime(targetZonedDate, TIMEZONE);

  // If we are already past the draw time for this month, get next month's draw
  if (isAfter(now, targetDate)) {
    const nextMonthZoned = addMonths(zonedNow, 1);
    let nextTargetZonedDate = lastDayOfMonth(nextMonthZoned);
    nextTargetZonedDate = set(nextTargetZonedDate, {
      hours: 10,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    });
    targetDate = fromZonedTime(nextTargetZonedDate, TIMEZONE);
  }

  return targetDate;
}

export function getTimeRemaining(targetDate: Date) {
  const total = targetDate.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}
