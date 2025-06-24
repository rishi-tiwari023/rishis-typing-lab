import { useState, useEffect, useRef } from "react";

export default function useTypingTracker(sentence) {
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const timer = useRef(null);

  useEffect(() => {
    setTyped("");
    setErrors(0);
    setStartTime(null);
    setIsComplete(false);
    setWpm(0);
    setAccuracy(100);
    if (timer.current) clearInterval(timer.current);
  }, [sentence]);

  useEffect(() => {
    if (typed.length === 1 && !startTime) {
      setStartTime(Date.now());
      timer.current = setInterval(() => {
        if (!isComplete) {
          const elapsed = (Date.now() - startTime) / 1000 / 60;
          setWpm(elapsed > 0 ? Math.round(typed.length / 5 / elapsed) : 0);
        }
      }, 1000);
    }
    if (typed === sentence) {
      setIsComplete(true);
      if (timer.current) clearInterval(timer.current);
    }
    // Calculate errors
    let err = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] !== sentence[i]) err++;
    }
    setErrors(err);
    // Calculate accuracy
    setAccuracy(
      typed.length > 0
        ? Math.max(0, Math.round(((typed.length - err) / typed.length) * 100))
        : 100
    );
    // Calculate WPM
    if (startTime && typed.length > 0) {
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      setWpm(elapsed > 0 ? Math.round(typed.length / 5 / elapsed) : 0);
    }
    // Cleanup
    return () => {
      if (isComplete && timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line
  }, [typed, sentence, isComplete]);

  const handleInput = (value) => {
    if (isComplete) return;
    if (value.length > sentence.length) return;
    setTyped(value);
  };

  const reset = () => {
    setTyped("");
    setErrors(0);
    setStartTime(null);
    setIsComplete(false);
    setWpm(0);
    setAccuracy(100);
    if (timer.current) clearInterval(timer.current);
  };

  return {
    typed,
    errors,
    wpm,
    accuracy,
    isComplete,
    handleInput,
    reset,
  };
}
