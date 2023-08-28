import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../firebase';

export default function Home() {
    const [songs, setSongs] = useState([]);

    const audioRefs = useRef({});
    const [playingSongId, setPlayingSongId] = useState(null);

    const handleTogglePlay = (songId) => {
        if (playingSongId === songId) {
            audioRefs.current[songId].pause();
            setPlayingSongId(null);
        } else {
            if (playingSongId !== null) {
                audioRefs.current[playingSongId].pause();
            }
            audioRefs.current[songId].play();
            setPlayingSongId(songId);
        }
    }

    useEffect(() => {
        const musicRef = collection(db, "songs");
        const q = query(musicRef);

        onSnapshot(q, (snapshot) => {
            const musicData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setSongs(musicData);
        });
    }, []);

    return (
        <div>
            <div className='flex justify-between items-start'>
            {songs.length === 0 ? <h1>Loading</h1> : (
                songs.map((data) => {
                    const isPlaying = playingSongId === data.id;
                    return (
                        <div className='w-1/4 overflow-hidden rounded relative' key={data.id}>
                            <img className='w-full mt-8' src={data.imgURL} />
                            <audio
                                className="audio songAudioPlayer mt-2"
                                ref={el => (audioRefs.current[data.id] = el)}
                            >
                                <source src={data.musicURL} type="audio/mpeg" />
                            </audio>
                            <h5 className='mt-2'>Song: {data.title} by Prabh</h5>
                            <button onClick={() => handleTogglePlay(data.id)}>
                                {isPlaying ? 'Pause' : 'Play'}
                            </button>
                        </div>
                    );
                })
            )}
            </div>
        </div>
    );
}
