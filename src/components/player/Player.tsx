import React from "react";
import styles from "./Player.module.css";
import {motion, Variants} from "framer-motion";
import {Grid, CircularProgress} from "@mui/material";
import image from "../../img/musicCard1.png";
import PlayerControl from "../playerControl/PlayerControl";


interface IPlayerProps {
    trackName: string;
    artist: string;
    isListen: boolean;
    isPlay: boolean;
    isLoadingMusic: boolean;
    duration: number;
    listenProgress: number;
    playFn: () => void;
    nextFn: () => void;
    prevFn: () => void;
    changeDuration: (value: number) => void;
}

const leftContentVariants: Variants = {
    open: {
        opacity: 1,
        x: 0,
        transition: {type: "spring", stiffness: 500, damping: 24}
    },
    closed: {
        opacity: 0,
        x: -20,
        transition: {duration: 0.1}
    }
};

const topContentVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {type: "spring", stiffness: 500, damping: 24}
    },
    closed: {
        opacity: 0,
        y: -20,
        transition: {duration: 0.1}
    }
};

const Player = (props: IPlayerProps) => {

    return (
        <Grid container spacing={2}>
            <Grid item md={3}>
                <Grid container spacing={0}>
                    <Grid
                        item
                        md={3}
                        className={styles['music-track-image']}
                        component={motion.div}
                        variants={leftContentVariants}
                    >
                        <img src={image} alt={"TrackLogo"}/>
                    </Grid>
                    <Grid
                        item
                        md={9}
                        className={styles['music-track-info']}
                        component={motion.div}
                        variants={topContentVariants}
                    >
                        <div id={styles['music-track-name']}>{props.trackName}</div>
                        <div id={styles['music-track-author']}>{props.artist}</div>
                    </Grid>
                </Grid>
            </Grid>
            {props.isLoadingMusic ?
                <Grid item md={6} className={styles['player-progress']}>
                    <CircularProgress/>
                </Grid>
                 :
                <PlayerControl {...props}/>
            }
            <Grid item md={3}/>
        </Grid>
    );
};

export default Player
