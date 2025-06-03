import { Text, View, Pressable, TouchableOpacity } from 'react-native';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const title = 'Open up the code for this screen:';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';

  const handlePress = () => {
    console.log('Button pressed!');
  };

  return (
    <View>
      <View className={styles.getStartedContainer}>
        <Text className={styles.getStartedText}>{title}</Text>
        <View className={styles.codeHighlightContainer + styles.homeScreenFilename}>
          <Text>{path}</Text>
        </View>
        <Text className={styles.getStartedText}>{description}</Text>

        <Pressable onPress={handlePress} className={styles.button}>
          <Text className={styles.buttonText}>Press Me</Text>
        </Pressable>

        <TouchableOpacity
          onPress={() => console.log('Help link pressed!')}
          className={styles.helpContainer}>
          <Text className={styles.helpLinkText}>Need help? Click here!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  codeHighlightContainer: `rounded-md px-1`,
  getStartedContainer: `items-center mx-12`,
  getStartedText: `text-lg leading-6 text-center`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLink: `py-4`,
  helpLinkText: `text-center`,
  homeScreenFilename: `my-2`,
  button: `mt-6 bg-blue-500 py-3 px-6 rounded-md`,
  buttonText: `text-white font-bold text-center`,
};
