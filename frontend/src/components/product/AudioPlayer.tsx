import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

import { secondsToString } from '../../utils/utils.ts';

import '../../assets/styles/components/AudioPlayer.css';


function AudioPlayer(props: {src: string, title: string }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playerTime, setPlayerTime] = useState(0);  // normalized: 0-1
    const [seekTime, setSeekTime] = useState(0);  // normalized: 0-1
    const [isSeeking, setIsSeeking] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    function togglePlay() {
        const audio = audioRef.current;

        if (!audio) return;

        if (audio.paused) {
            void audio.play();
        } else {
            audio.pause();
        }
    }

    function handleSeekChange(event: ChangeEvent<HTMLInputElement>) {
        setSeekTime(Number(event.target.value));
    }

    function handleSeekStart() {
        setIsSeeking(true);
    }

    function handleSeekEnd() {
        const audio = audioRef.current;

        if (audio && audio.duration) {
            audio.currentTime = seekTime * audio.duration;
            setPlayerTime(seekTime);
        }

        setIsSeeking(false);
    }

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        const handleTimeUpdate = () => {
            if (!isSeeking && audio.duration) {
                setPlayerTime(audio.currentTime / audio.duration);
            }
        };

        const setPlaying = () => setIsPlaying(true);
        const setPaused = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('play', setPlaying);
        audio.addEventListener('pause', setPaused);
        audio.addEventListener('ended', setPaused);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('play', setPlaying);
            audio.removeEventListener('pause', setPaused);
            audio.removeEventListener('ended', setPaused);
        };
    }, [isSeeking]);

    return (
        <div className='audio-player'>
            <button onClick={togglePlay} className={isPlaying ? 'active' : undefined}>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <div>
                <span>{props.title}</span>
                <div>
                    <span>{secondsToString(audioRef.current?.currentTime || 0)}</span>
                    <input
                        type='range' className='slider'
                        min={0} max={1} step={0.01}
                        value={isSeeking ? seekTime : playerTime}
                        onChange={handleSeekChange}
                        onMouseDown={handleSeekStart}
                        onMouseUp={handleSeekEnd}
                    />
                    <span>{secondsToString(audioRef.current?.duration || 0)}</span>
                </div>
            </div>

            <audio ref={audioRef} src={props.src} controls={false} />
        </div>
    )
}


export default AudioPlayer;