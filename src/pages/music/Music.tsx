import React, {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import styles from "./Music.module.css";

import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {updateListenState, updatePlayState} from "../../redux/features/user/userReducer";

import {Container, Grid, List, ListItem} from "@mui/material";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {motion, Variants} from "framer-motion";

import MusicItem from "../../components/musicItem/MusicItem";
import {TMusicTrack} from "../../redux/features/music/musicReducer";
import Player from "../../components/player/Player";
import useAudio from "../../hooks/useAudio";

import {getMusic, updateCurrentTrack} from "../../redux/features/music/musicReducer";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IMusicProps {
    musics: TMusicTrack[];
    //images: Map<string, string>;
    chartData: ChartData<"pie">;
}

const playerVariants: Variants = {
    open: {
        clipPath: "inset(0% 0% 0% 0% round 10px)",
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.5,
            delayChildren: 0.2,
            staggerChildren: 0.05
        }
    },
    closed: {
        clipPath: "inset(10% 50% 90% 50% round 10px)",
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.3
        }
    }
};

//const musicTrack = require("../../assest/music.mp3");

const Music = (props: IMusicProps) => {
    const [listenProgress, setListenProgress] = useState(0);
    const currentTrack = useAppSelector((state) => state.music.currentTrack)!;
    const isLoadingMusic = useAppSelector((state) => state.music.isLoadingMusic);
    const theme = useAppSelector((state) => state.user.theme);
    const isListen: boolean = useAppSelector((state) => state.user.isListen);
    const isPlay: boolean = useAppSelector((state) => state.user.isPlay);

    const audio = useAudio({src: currentTrack?.src!, volume: 1, playbackRate: 1});
    const intervalRef: React.MutableRefObject<NodeJS.Timer | undefined> = useRef();

    const dispatch = useAppDispatch();

    const getMusicTrack = (music: TMusicTrack, index: number): ReactNode => {
        return (
            <ListItem
                key={index}
            >
                <MusicItem
                    id={music.id}
                    artist={music.artist}
                    trackName={music.trackName}
                    photoId={music.photoId}
                    theme={theme}
                    clickFn={setCurrentMusic}
                />
            </ListItem>
        );
    }
    const setCurrentMusic = (event: React.MouseEvent<HTMLDivElement>, musicId: string) => {
        dispatch(getMusic(musicId));
        dispatch(updateCurrentTrack(props.musics.find(music => music.id === musicId)!));
        dispatch(updateListenState(true));
    };
    const changePlayStatus = () => {
        dispatch(updatePlayState());
    };
    const changeDuration = (value: number) => {
        clearInterval(intervalRef.current);
        audio.currentTime = value;
        setListenProgress(value);
    }
    const startTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (audio.ended) {
                toNextTrack();
            } else {
                setListenProgress(audio.currentTime);
            }
        }, 1000);
    };
    const toNextTrack = () => {

    }

    const musicList = useMemo<ReactNode[]>(() => {
        return props.musics.map((musicTrack, index) => getMusicTrack(musicTrack, index));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.musics]);

    useEffect(() => {
        if (!isLoadingMusic) {
            if (isPlay) {
                audio.play();
                startTimer();
            } else {
                audio.pause();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlay, isLoadingMusic]);

    return (
        <Container>
            <Grid
                container
                spacing={2}
                className={styles['music-list']}
            >
                <Grid
                    item
                    md={6}
                    className={styles['music-list-grid']}
                >
                    <List
                        sx={{overflow: 'auto', height: '35em'}}
                        className={styles['music-list-ul']}
                    >
                        {musicList}
                    </List>
                </Grid>
                <Grid item md={6} className={styles['prediction']}>
                    <Container className={styles['prediction-content']}>
                        <Pie data={props.chartData} options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        }}/>
                    </Container>
                </Grid>
                {!isLoadingMusic ?? <Grid
                        item
                        md={12}
                        className={styles['music-player']}
                        component={motion.div}
                        animate={isListen ? "open" : "closed"}
                        variants={playerVariants}
                    >
                        <Player
                            trackName={currentTrack?.trackName ?? ""}
                            artist={currentTrack?.artist ?? ""}
                            isListen={isListen}
                            isLoadingMusic={isLoadingMusic}
                            isPlay={isPlay}
                            duration={audio.duration}
                            listenProgress={listenProgress}
                            playFn={changePlayStatus}
                            changeDuration={changeDuration}
                        />
                    </Grid>
                }
            </Grid>
        </Container>
    );
}

export default Music