import React, { useState } from "react";
import { Pressable, View, Text } from "react-native";
import { iYoutubeListItem } from "../../models/youtube-list.model";
import { styles } from "./youtube-thumbnail.styles";
import { HoverCooridates } from "../../hooks/useHoverCoordinates";
import { YoutubeThumbnailDetails } from "../youtube-thumbnail-details/youtube-thumbnail-details.component";

export interface YoutubeThumbnailProps {
  item: iYoutubeListItem;
  coordinatesSetter: (coordinates: HoverCooridates) => void;
}

export const YoutubeThumbnail = ({
  item,
  coordinatesSetter,
}: YoutubeThumbnailProps) => {
  let hoverTimeout: NodeJS.Timer;

  const [isHovered, setIsHovered] = useState(false);
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onHovered = () => {
    if (isHovered) {
      return;
    }

    setIsHovered(true);
    coordinatesSetter?.({ x: 0, y: 0, width: 0, height: 0, contentItem: null });

    hoverTimeout = setTimeout(() => {
      const { x, y, width, height } = coordinates;
      coordinatesSetter?.({ x, y, width, height, contentItem: item });
      setIsHovered(false);
    }, 700);
  };

  const onHoverOut = () => {
    clearTimeout(hoverTimeout);
    setIsHovered(false);
  };

  return (
    <Pressable
      ref={(view) =>
        view?.measureInWindow((x, y, width, height) => {
          setCoordinates({ x, y, width, height });
        })
      }
      style={[styles.thumbnail]}
      onHoverIn={onHovered}
      onHoverOut={onHoverOut}
    >
      <YoutubeThumbnailDetails item={item} showHoverPlayLabel={isHovered} />
    </Pressable>
  );
};
