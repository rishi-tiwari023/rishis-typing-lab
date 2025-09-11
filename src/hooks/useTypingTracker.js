import { useState, useEffect, useRef } from "react";

// Timed typing tracker. Computes WPM strictly from elapsed time.
// Supports finite duration tests and completes when time runs out or sentence completes.
export default function useTypingTracker(sentence, durationSeconds = 30) {
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const timer = useRef(null);
  const startRef = useRef(null);
  const typedRef = useRef("");

  useEffect(() => {
    setTyped("");
    typedRef.current = "";
    setErrors(0);
    setStartTime(null);
    setIsComplete(false);
    setWpm(0);
    setAccuracy(100);
    setRemainingSeconds(durationSeconds);
    if (timer.current) clearInterval(timer.current);
  }, [sentence, durationSeconds]);

  useEffect(() => {
    // Start timer on first keystroke
    if (typed.length === 1 && !startTime) {
      const now = Date.now();
      startRef.current = now;
      setStartTime(now);
      timer.current = setInterval(() => {
        if (!startRef.current) return;
        const elapsedSec = Math.max(0, Math.floor((Date.now() - startRef.current) / 1000));
        const remain = Math.max(0, durationSeconds - elapsedSec);
        setRemainingSeconds(remain);
        // live WPM from latest typed via ref
        const elapsedMin = Math.max(1 / 60, elapsedSec / 60);
        const words = typedRef.current.length / 5;
        setWpm(Math.round(words / elapsedMin));
        if (remain === 0) {
          setIsComplete(true);
        }
      }, 250);
    }
    // Finish when sentence fully typed (even if time remains)
    if (typed === sentence && sentence.length > 0) {
      setIsComplete(true);
    }
    // Calculate errors
    let err = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] !== sentence[i]) err++;
    }
    setErrors(err);
    typedRef.current = typed;
    // Calculate accuracy
    setAccuracy(
      typed.length > 0
        ? Math.max(0, Math.round(((typed.length - err) / typed.length) * 100))
        : 100
    );
    // Calculate WPM (idempotent in case timer hasn't ticked yet)
    if (startTime && typed.length > 0 && !isComplete) {
      const elapsedSec = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      const elapsedMin = elapsedSec / 60;
      const words = typed.length / 5;
      setWpm(Math.round(words / elapsedMin));
    }
    // Cleanup
    return () => {
      if (isComplete && timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line
  }, [typed, sentence, isComplete, durationSeconds]);

  // Finalize WPM when completed, ensuring non-zero on last tick
  useEffect(() => {
    if (!isComplete) return;
    if (timer.current) {
      clearInterval(timer.current);
    }
    if (startRef.current) {
      const elapsedSec = Math.min(durationSeconds, Math.max(1, Math.floor((Date.now() - startRef.current) / 1000)));
      const elapsedMin = elapsedSec / 60;
      const words = typedRef.current.length / 5;
      setWpm(Math.max(0, Math.round(words / elapsedMin)));
    }
  }, [isComplete, durationSeconds]);

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
    setRemainingSeconds(durationSeconds);
    if (timer.current) clearInterval(timer.current);
  };

  return {
    typed,
    errors,
    wpm,
    accuracy,
    isComplete,
    remainingSeconds,
    handleInput,
    reset,
  };
}
