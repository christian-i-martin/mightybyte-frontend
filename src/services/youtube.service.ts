import { iYoutubeListItem } from "../models/youtube-list.model";

const BASE_URL = "https://www.googleapis.com/youtube/v3/";

export interface iYoutubeListParams {
  query: string;
  nextPageToken?: string;
}

export interface iYoutubeListResponse {
  items: iYoutubeListItem[];
  nextPageToken?: string;
}

export const list = async ({
  query,
  nextPageToken,
}: iYoutubeListParams): Promise<iYoutubeListResponse> => {
  const enpoint = "search";
  const params = new URLSearchParams({
    part: "snippet",
    type: "video",
    maxResults: "10",
    q: query,
    pageToken: nextPageToken || "",
    key: process.env["REACT_APP_YOUTUBE_API_KEY"],
  }).toString();

  const url = `${BASE_URL}${enpoint}?${params}`;

  const result = await fetch(url);
  const data = await result.json();

  return {
    items: data.items || [],
    nextPageToken: data.nextPageToken,
  };
};
