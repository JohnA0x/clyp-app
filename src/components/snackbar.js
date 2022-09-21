import { Button, TextInput, Snackbar } from "react-native-paper";

export const ErrorSnack = ({ text, handlePress, visibility, setVisibility }) => {
  <Snackbar
    visible={visibility}
    duration={5000}
    onDismiss={() => setVisibility}
    action={{
      label: "Undo",
      onPress: () => {
        handlePress
      },
    }}
    style={{ backgroundColor: theme.primary }}
  >
    <View>
      <Text>{text}</Text>
    </View>
  </Snackbar>;
};


