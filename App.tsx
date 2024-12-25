import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useState } from 'react';

import { Focus } from './src/features/Focus';
import { FocusHistory } from './src/features/FocusHistory';
import { Timer } from './src/features/Timer';
import { colors } from './src/utils/colors';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState<string | null>(null); // task the user is currently focusing on.
  const [history, setHistory] = useState<string[]>([]); // list of tasks the user has been focusing on.

  return (
    <>
      <StatusBar style='light' />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {!currentSubject ? (
            <>
              <Focus handleAdd={setCurrentSubject} />
              <FocusHistory history={history} />
            </>
          ) : (
            <Timer
              focusSubject={currentSubject}
              onTimerEnd={(subject) => {
                setHistory([...history, subject]);
              }}
              onClearSubject={() => setCurrentSubject(null)}
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
});
