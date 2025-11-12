import React from "react";
import {
  View,
  Text,
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { iYoutubeListItem } from "../../models/youtube-list.model";
import { styles } from "./youtube-thumbnail-details.styles";

export interface YoutubeThumbnailDetailsProps {
  item: iYoutubeListItem;
  customImageStyle?: StyleProp<ImageStyle>;
  customDetailsContainerStyle?: StyleProp<ViewStyle>;
  showControls?: boolean;
  showHoverPlayLabel?: boolean;
}

export const YoutubeThumbnailDetails = ({
  item,
  customImageStyle,
  customDetailsContainerStyle,
  showControls,
  showHoverPlayLabel,
}: YoutubeThumbnailDetailsProps) => {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Image
          source={{ uri: item.snippet.thumbnails.medium.url }}
          style={[styles.thumbnailImage, customImageStyle]}
          resizeMode="cover"
        />
        {showHoverPlayLabel && (
          <Text style={styles.hoverTopPlayLabel}>Keep hovering to play</Text>
        )}
      </View>

      <View style={[styles.detailsContainer, customDetailsContainerStyle]}>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {item.snippet.title}
          </Text>
          <Text style={styles.channelTitle} numberOfLines={1}>
            {item.snippet.channelTitle}
          </Text>
        </View>

        {showControls && (
          <View style={styles.controlButtonsContainer}>
            <TouchableOpacity style={styles.controlButtons}>
              <Text>Watch later</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButtons}>
              <Text>Add to queue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
