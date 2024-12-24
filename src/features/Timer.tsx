import { StyleSheet, View, Text, Vibration } from 'react-native';

// Progress indicators and spinners for React Native.
import * as Progress from 'react-native-progress';

import { useState } from 'react';

import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

// vibration pattern, https://reactnative.dev/docs/vibration
const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
  0.5 * ONE_SECOND_IN_MS, // wait 0.5s
  1 * ONE_SECOND_IN_MS, // vibrate 1s
  0.5 * ONE_SECOND_IN_MS, // wait 0.5s
  1 * ONE_SECOND_IN_MS, // vibrate 1s
  0.5 * ONE_SECOND_IN_MS, // wait 0.5s
  1 * ONE_SECOND_IN_MS, // vibrate 1s
];

type TimerProps = {
  focusSubject: string;
  onTimerEnd: () => void;
  clearSubject: () => void;
};

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }: TimerProps) => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(1);
  const [minutes, setMinutes] = useState<number>(0.1);

  return (
    <View style={styles.container}>
      {/* Countdown timer */}
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={() => Vibration.vibrate(PATTERN)}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          progress={progress}
          color={colors.progressBar}
          width={null}
          height={spacing.sm}
        />
      </View>

      {/* Set counter value */}
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      {/* Start/Pause button */}
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title='Start' size={100} onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton size={100} title='Pause' onPress={() => setIsStarted(false)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  countdown: {
    flex: 0.4,
    justifyContent: 'center', // align along the main axis.
    alignItems: 'center', // align along the cross axis.
  },

  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl,
  },

  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: fontSizes.md,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  task: {
    fontSize: fontSizes.lg,
    color: colors.white,
    textAlign: 'center',
  },

  progressBarContainer: {
    margin: spacing.sm,
    paddingTop: spacing.xl,
  },
});
