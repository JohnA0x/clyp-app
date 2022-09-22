import { StyleSheet } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";


export const ErrorSnack = ({
  error,
  snackVisibility,
  setSnackVisibility,
}) => {
  <Snackbar
    visible={snackVisibility}
    duration={5000}
    onDismiss={() => setSnackVisibility}
    action={{
      label: "OK",
      onPress: () => {
        // Do something
      },
    }}
    style={{ backgroundColor: theme.textinput }}
  >
    <View>
      <Text style={{ color: theme.text }}>{error}</Text>
    </View>
  </Snackbar>;
};
