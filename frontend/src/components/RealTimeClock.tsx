import { cn } from 'clsx-for-tailwind';
import  { useEffect, useState } from 'react';
import { formatDate, formatTime } from '../lib/utils';

const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);



  return (
    <div className={cn("flex gap-2  items-center ")}>
      <p className="text-xs">{formatDate({date:currentTime,format:'long'})}</p>
      <p className="text-xs font-mono">{formatTime({date:currentTime})}</p>
    </div>
  );
};

export default RealTimeClock;
