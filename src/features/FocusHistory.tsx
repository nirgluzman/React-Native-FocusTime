import { StyleSheet, View, Text, FlatList } from 'react-native';

import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

type FocusHistoryProps = {
  history: string[];
};

export const FocusHistory = ({ history }: FocusHistoryProps) => {
  // check if history list is empty.
  if (!history.length) {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>We haven't focused on anything yet!</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Things we've focused on:</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => <Text style={styles.item}>- {item}</Text>}
      />
      {/* NOTE: Missing unique keys for FlatList items.
      Consider adding a 'key' or 'id' prop to the renderItem function for better performance and accurate rendering.
      https://reactnative.dev/docs/flatlist#keyextractor */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // ensure container has sufficient height for FlatList scrolling.
    padding: spacing.md,
  },

  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },

  item: {
    color: colors.white,
    fontSize: fontSizes.md,
    paddingTop: spacing.sm,
  },
});
