import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  thumbnailInner: {
    flex: 1,
  },

  thumbnailImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 14,
    marginBottom: 8,
  },

  title: {
    fontWeight: "bold",
  },

  channelTitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 8,
  },

  controlButtons: {
    backgroundColor: "#eee",
    padding: 8,
    height: 32,
    borderRadius: 16,
    textAlign: "center",
    marginTop: 12,
  },

  controlButtonsContainer: {
    marginTop: 8,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },

  hoverTopPlayLabel: {
    position: "absolute",
    backgroundColor: "#111",
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontSize: 11,
    bottom: 20,
    right: 0,
  },
});
