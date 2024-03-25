import React from "react";
import styles from "./Player.module.css";
import {motion, Variants} from "framer-motion";
import {styled} from '@mui/material/styles';
import {Grid, Slider, Typography, Box, CircularProgress} from "@mui/material";
import image from "../../img/musicCard1.png";
import play from "../../img/Play.svg";
import pause from "../../img/Category.svg";

interface IPlayerProps {
    trackName: string;
    artist: string;
    isListen: boolean;
    isPlay: boolean;
    isLoadingMusic: boolean;
    duration: number;
    listenProgress: number;
    playFn: () => void;
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
const playVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {type: "spring", stiffness: 400, damping: 12}
    },
    closed: {
        opacity: 0,
        y: -20,
        transition: {duration: 0.2}
    }
}
const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});
const Player = (props: IPlayerProps) => {
    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = Math.floor(value - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

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
                <CircularProgress/> :
                <Grid item md={6}>
                    <Grid container spacing={0} className={styles['play-container']}>
                        <Grid
                            item
                            md={4}
                            className={styles['play-group']}
                            component={motion.div}
                            variants={playVariants}
                        >
                            <motion.img
                                id={styles['play-button']}
                                src={props.isPlay ? play : pause}
                                onClick={props.playFn}
                                whileTap={{scale: 0.9}}
                                whileHover={{scale: 1.1}}
                                transition={{
                                    type: "spring",
                                    damping: 12,
                                    stiffness: 300,
                                }}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mt: -2,
                            }}>
                                <TinyText>{formatDuration(props.listenProgress)}</TinyText>
                                <TinyText>-{formatDuration(props.duration - props.listenProgress)}</TinyText>
                            </Box>
                            <Slider
                                aria-label="time-indicator"
                                size="small"
                                min={0}
                                max={props.duration ? props.duration : 100}
                                step={1}
                                value={props.listenProgress ? props.listenProgress : 0}
                                onChange={(_, value) => props.changeDuration(value as number)}
                                sx={{
                                    color: '#fff',
                                    height: 7,
                                    '& .MuiSlider-thumb': {
                                        width: 15,
                                        height: 15,
                                        transition: '0.5s cubic-bezier(.8,.87,.54,.95)',
                                        '&::before': {
                                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                        },
                                        '&:hover, &.Mui-focusVisible': {
                                            boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)`,
                                        },
                                        '&.Mui-active': {
                                            width: 20,
                                            height: 20,
                                        },
                                    },
                                    '& .MuiSlider-rail': {
                                        opacity: 0.2,
                                    },
                                }}
                            />

                        </Grid>
                    </Grid>
                </Grid>
            }

            <Grid item md={3}>

            </Grid>
        </Grid>
    );
};

export default Player
