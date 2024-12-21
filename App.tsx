import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useState } from 'react';

import { Focus } from './src/features/Focus';
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
            <View>
              <Text style={{ color: colors.white }}>
                I am going to render the timer for {currentSubject}
              </Text>
            </View>
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
