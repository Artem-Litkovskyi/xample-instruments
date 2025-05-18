import { useRef, useState } from 'react';
import { secondsToString } from '../utils/utils';

import { FaPlay, FaPause } from 'react-icons/fa';

import '../assets/styles/components/AudioPlayer.css';


function AudioPlayer(props: {src: string, title: string }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currTime, setCurrTime] = useState(0);
    const [newTime, setNewTime] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);

    function togglePlay() {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            void audioRef.current?.play();
        }

        setIsPlaying(!isPlaying);
    }

    return (
        <div className='audio-player'>
            <button onClick={togglePlay}>
                {isPlaying ? (
                    <FaPause />
                ) : (
                    <FaPlay />
                )}
            </button>

            <div>
                <span>{props.title}</span>
                <div>
                    <span>{secondsToString(audioRef.current ? audioRef.current.currentTime : 0)}</span>
                    <input
                        type='range'
                        size={1}
                        min={0}
                        max={1}
                        step={0.01}
                        value={isSeeking ? newTime : currTime} className='slider'
                        onChange={(event) => {
                            setNewTime(Number(event.currentTarget.value))
                        }}
                        onMouseDown={() => setIsSeeking(true)}
                        onMouseUp={() => {
                            setIsSeeking(false);
                            setCurrTime(newTime);
                            if (audioRef.current) audioRef.current.currentTime = newTime * audioRef.current.duration;
                        }}
                    />
                    <span>{secondsToString(audioRef.current ? audioRef.current.duration : 0)}</span>
                </div>
            </div>

            <audio
                ref={audioRef}
                src={props.src}
                controls={false}
                onTimeUpdate={(event) => {
                    setCurrTime(event.currentTarget.currentTime / event.currentTarget.duration);
                }}
            />
        </div>
    )
}


export default AudioPlayer;