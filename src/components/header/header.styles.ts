import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  rootView: {
    paddingHorizontal: 140,
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
  },
  searchTextInput: {
    borderWidth: 1,
    height: 40,
    width: "40%",
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: "#ccc",
  },
  searchButton: {
    marginLeft: 12,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
});
