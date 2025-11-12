import { useState } from "react";
import { HEADER_HEIGHT } from "../components/header/header.component";
import { iYoutubeListItem } from "../models/youtube-list.model";

export interface HoverCooridates {
  x: number;
  y: number;
  width: number;
  height: number;
  contentItem: iYoutubeListItem | null;
}

export interface useHoverCoordinatesReturn {
  x: number;
  y: number;
  height: number;
  width: number;
  contentItem: iYoutubeListItem | null;
  setCoordinates: (cooridates: HoverCooridates) => void;
}
export default function useHoverCoordinator(): useHoverCoordinatesReturn {
  const [coords, setCoords] = useState<HoverCooridates>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    contentItem: null,
  });

  const setCoordinates = (coordinates: HoverCooridates) => {
    const { x, y, width, height, contentItem } = coordinates;
    setCoords({ x, y: y - HEADER_HEIGHT, width, height, contentItem });
  };

  return {
    x: coords.x,
    y: coords.y,
    height: coords.height,
    width: coords.width,
    contentItem: coords.contentItem,
    setCoordinates,
  };
}
