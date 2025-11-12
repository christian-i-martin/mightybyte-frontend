import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "./header.styles";

export const HEADER_HEIGHT = 60;

interface HeaderProps {
  onPressSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header = ({
  onPressSearch,
  searchQuery,
  setSearchQuery,
}: HeaderProps) => {
  return (
    <View style={[{ height: HEADER_HEIGHT }, styles.rootView]}>
      <View style={styles.innerView}>
        <TextInput
          style={styles.searchTextInput}
          placeholder="Search YouTube videos..."
          placeholderTextColor={"#bbb"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={onPressSearch} style={styles.searchButton}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
