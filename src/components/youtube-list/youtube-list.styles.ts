import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },

  flatList: {
    paddingHorizontal: 140,
  },

  thumbnailContainer: {
    gap: 16,
  },
  hoverItem: {
    position: "absolute",
    alignSelf: "center",
    top: 0,
    left: 0,
    justifyContent: "center",
  },
  columnWrapperStyle: {
    gap: 16,
  },
  hoverContainer: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.45,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 16,
    alignSelf: "center",
  },

  customImageStyle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  customDetailsContainerStyle: {
    padding: 12,
    paddingTop: 0,
  },
});
