// Component to provide a visual countdown timer.
// It encapsulates the logic for creating and managing a countdown timer.
//

import { StyleSheet, Text } from 'react-native';

import { useState, useRef, useEffect } from 'react';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

// function to convert a value in minutes to its equivalent in milliseconds.
const minutesToMillis = (min: number) => min * 1000 * 60;

// function to ensure that a single-digit number (0-9) is always represented as a two-digit string with a leading zero.
const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

type CountdownProps = {
  minutes: number;
  isPaused: boolean;
  onProgress: (progress: number) => void;
  onEnd: () => void;
};

export const Countdown = ({
  minutes = 0.1, // the initial number of minutes for the countdown.
  isPaused, // boolean indicating whether the countdown should be paused.
  onProgress, // callback function that receives the current progress of the countdown as a percentage.
  onEnd, // callback function that is called when the countdown reaches 0.
}: CountdownProps) => {
  // state variable to store the remaining milliseconds of the countdown.
  const [millis, setMillis] = useState<number>(0);

  // a ref to store the ID of the setInterval call, allowing for proper cleanup.
  const interval = useRef<NodeJS.Timeout | null>(null);

  const countDown = () => {
    setMillis((time: number) => {
      if (interval.current && time === 0) {
        // clearing the interval when the countdown finishes.
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      // subtracts 1000 milliseconds from the current millis value, i.e. decrementing the countdown timer by one second.
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  // initialize the millis state with the initial number of minutes converted to milliseconds when the minutes prop changes.
  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  // calculates and updates the progress value and calls the onProgress callback whenever the millis state changes.
  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
  }, [millis]);

  // handle the pausing and resuming of the countdown based on the isPaused prop.
  useEffect(() => {
    if (isPaused) {
      //  clear the existing interval.
      if (interval.current) clearInterval(interval.current);
      return;
    }

    // start the setInterval with the countDown function.
    // setInterval() is a built-in JavaScript function that allows you to execute a specified function repeatedly at a given interval (in milliseconds).
    interval.current = setInterval(countDown, 1000);

    // cleanup function that is returned within a useEffect hook.
    return () => {
      if (interval.current) {
        // an interval is currently active.
        clearInterval(interval.current);
      }
    };
  }, [isPaused]);

  // calculates the remaining minutes and seconds.
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  // Render the formatted time in a styled Text component.
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
  },
});
