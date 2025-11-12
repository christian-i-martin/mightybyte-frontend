import * as React from "react";
import { View } from "react-native";
import { list } from "../services/youtube.service";
import { useState } from "react";
import { iYoutubeListItem } from "../models/youtube-list.model";
import { YoutubeList } from "../components/youtube-list/youtube-list.component";
import { Header } from "../components/header/header.component";
import { styles } from "./home.styles";

const Home = () => {
  const [youtubeList, setYoutubeList] = useState<iYoutubeListItem[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const onPressSearch = async () => {
    const response = await list({ query: searchQuery });
    setYoutubeList(response.items);
    setNextPageToken(response.nextPageToken || null);
  };

  const onEndReached = async () => {
    if (!nextPageToken) {
      return;
    }
    const response = await list({ query: "programming", nextPageToken });
    setYoutubeList((prev) => [...prev, ...response.items]);
    setNextPageToken(response.nextPageToken || null);
  };

  return (
    <View style={styles.rootView}>
      <Header
        onPressSearch={onPressSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <YoutubeList items={youtubeList} onEndReached={onEndReached} />
    </View>
  );
};

export default Home;
