import { useEffect, useState } from 'react';

export function useInsightsData() {
  const [summary, setSummary] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);

  const fetchAll = async () => {
    // const [sumRes, tracksRes, albumsRes] = await Promise.all([getSummary(), getTrackInsights(), getAlbumInsights()]);
    //   setSummary(sumRes.data);
    //   setTracks(tracksRes.data);
    //   setAlbums(albumsRes.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { summary, tracks, albums };
}
