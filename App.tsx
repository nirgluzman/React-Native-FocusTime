import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useState } from 'react';

import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';
import { colors } from './src/utils/colors';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState<string>('');
  return (
    <>
      <StatusBar style='light' />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {!currentSubject ? (
            <Focus handleAdd={setCurrentSubject} />
          ) : (
            <Timer focusSubject={currentSubject} onTimerEnd={() => {}} clearSubject={() => {}} />
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
