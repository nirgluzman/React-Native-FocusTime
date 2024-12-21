import { StyleSheet, View } from 'react-native';
import {
  TextInput, // a component to allow users to input text.
} from 'react-native-paper';

import { useState } from 'react';

import { RoundedButton } from '../components/RoundedButton';

export const Focus = () => {
  const [subject, setSubject] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.inputCotainer}>
        <TextInput
          style={styles.textInput}
          label='What would you like to focus on?'
          value={subject} // value of the text input.
          onChangeText={setSubject} // callback that is called when the text input's text changes.
        />
        <View style={styles.button}>
          <RoundedButton title='+' size={50} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  button: {
    justifyContent: 'center',
  },

  inputCotainer: {
    padding: 25,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

  textInput: {
    flex: 1,
    fontSize: 15,
    marginRight: 10,
  },
});
