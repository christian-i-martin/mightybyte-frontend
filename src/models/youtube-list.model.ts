export interface iYoutubeListItem {
  id: iYoutubeId;
  snippet: {
    title: string;
    channelId: string;
    channelTitle: string;
    description: string;
    publishTime: string;
    pulishedAt: string;
    thumbnails: {
      default: iYoutubeThumbnail;
      high: iYoutubeThumbnail;
      medium: iYoutubeThumbnail;
    };
  };
}

interface iYoutubeThumbnail {
  height: number;
  width: number;
  url: string;
}

interface iYoutubeId {
  kind: string;
  videoId: string;
}
