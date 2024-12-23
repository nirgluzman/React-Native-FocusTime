import { StyleSheet, View } from 'react-native';
import {
  TextInput, // a component to allow users to input text.
} from 'react-native-paper';

import { useState } from 'react';

import { RoundedButton } from '../components/RoundedButton';
import { fontSizes, spacing } from '../utils/sizes';

type FocusProps = {
  handleAdd: (subject: string) => void;
};

export const Focus = ({ handleAdd }: FocusProps) => {
  const [subject, setSubject] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          label='What would you like to focus on?'
          value={subject} // value of the text input.
          onChangeText={setSubject} // callback that is called when the text input's text changes.
        />
        <View style={styles.button}>
          <RoundedButton
            title='+'
            size={50}
            textStyle={{ fontSize: fontSizes.lg }}
            onPress={() => handleAdd(subject)}
          />
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
    alignItems: 'center',
  },

  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

  textInput: {
    flex: 1,
    fontSize: fontSizes.md,
    marginRight: spacing.sm,
  },
});
