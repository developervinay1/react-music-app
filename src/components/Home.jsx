import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import ReactPlayer from "react-player";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    const musicRef = collection(db, "songs");
    const q = query(musicRef);

    onSnapshot(q, (snapshot) => {
      const musicData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSongs(musicData);
    });
  }, []);

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
  };

  return (
    <div className="container mt-5">
      <div className="row gap-3 justify-content-center">
        {songs.length === 0 ? (
          <h1>Loading</h1>
        ) : (
          songs.map((data, index) => {
            return (
              <div
              className="col-lg-3 col-md-4 col-sm-6 col-12"
                style={{ boxShadow: "0px 6px 8px -2px #0000004d" }}
                key={data.id}
              >
                <img
                  src={data.imgURL}
                  style={{width: "100%", height: "250px", objectFit: "cover"}}
                  alt={`Album cover for ${data.title}`}
                />
                <div>
                  <div>
                    <ReactPlayer
                      className="audioPlayer"
                      url={data.musicURL}
                      controls
                      playing={index > 0 && index === currentSongIndex}
                      onPlay={() => setCurrentSongIndex(index)}
                      onEnded={playNextSong}
                    />
                  </div>
                  <h6 className="p-2">
                    Song: {data.title}
                  </h6>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
