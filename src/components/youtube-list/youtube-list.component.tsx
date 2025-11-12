import React, { useEffect, useMemo, useRef } from "react";
import { Animated, FlatList, View } from "react-native";
import { iYoutubeListItem } from "../../models/youtube-list.model";
import useScreenSize from "../../hooks/useScreenSize";
import { YoutubeThumbnail } from "../youtube-thumbnail/youtube-thumbnail.component";
import { styles } from "./youtube-list.styles";
import useHoverCoordinator from "../../hooks/useHoverCoordinates";
import { YoutubeThumbnailDetails } from "../youtube-thumbnail-details/youtube-thumbnail-details.component";

export interface YoutubeListProps {
  items: iYoutubeListItem[];
  onEndReached?: () => void;
}

export const YoutubeList = ({ items, onEndReached }: YoutubeListProps) => {
  const { x, y, height, width, contentItem, setCoordinates } =
    useHoverCoordinator();
  const { breakpoint } = useScreenSize({ debounce: 50 });
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: contentItem ? 1 : 0,
      duration: 300,
      useNativeDriver: false, //not natively working on web
    }).start();
  }, [contentItem]);

  const renderItem = ({ item }: { item: iYoutubeListItem }) => {
    return <YoutubeThumbnail item={item} coordinatesSetter={setCoordinates} />;
  };

  const animatedWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["140%", "150%"],
  });

  const animatedHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["150%", "165%"],
  });

  const animatedStyle = {
    opacity: animatedValue,
    width: animatedWidth,
    height: animatedHeight,
  };

  const numColumns = useMemo(() => {
    switch (breakpoint) {
      case "xs":
      case "sm":
        return 1;
      case "md":
        return 2;
      case "lg":
        return 4;
      case "xl":
        return 5;
      default:
        return 3;
    }
  }, [breakpoint]);

  return (
    <View style={styles.rootView}>
      <FlatList
        data={items}
        renderItem={renderItem}
        key={`${breakpoint}-list`}
        keyExtractor={(item: iYoutubeListItem) =>
          `${item.snippet.channelId}-${item.id.kind}-${item.id.videoId}`
        }
        contentContainerStyle={styles.thumbnailContainer}
        numColumns={numColumns}
        columnWrapperStyle={
          numColumns > 1 ? styles.columnWrapperStyle : undefined
        }
        style={styles.flatList}
        onEndReached={onEndReached}
      />

      <View style={[styles.hoverItem, { top: y, left: x, height, width }]}>
        {contentItem && (
          <Animated.View style={[styles.hoverContainer, animatedStyle]}>
            <YoutubeThumbnailDetails
              item={contentItem}
              customImageStyle={styles.customImageStyle}
              customDetailsContainerStyle={styles.customDetailsContainerStyle}
              showControls
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};
