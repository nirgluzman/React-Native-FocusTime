import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../utils/colors';

export const Focus = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Focus Feature</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    color: colors.white,
  },
});
