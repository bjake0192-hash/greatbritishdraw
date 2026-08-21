'use client';

import { useEffect, useState } from 'react';
import { getNextDrawDate, getTimeRemaining } from '@/lib/countdown';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const targetDate = getNextDrawDate();

    const timer = setInterval(() => {
      const remaining = getTimeRemaining(targetDate);
      setTimeLeft(remaining);

      if (remaining.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    // Initial call
    setTimeLeft(getTimeRemaining(targetDate));

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) {
    return <div className="h-24 w-full animate-pulse bg-white/20 rounded-xl"></div>;
  }

  return (
    <div className="flex justify-center gap-4 text-center">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white text-purple-900 rounded-2xl w-20 h-24 shadow-xl shadow-purple-900/20">
      <span className="text-3xl font-black">{Math.max(0, value).toString().padStart(2, '0')}</span>
      <span className="text-xs font-bold uppercase tracking-wider mt-1 opacity-70">{label}</span>
    </div>
  );
}
