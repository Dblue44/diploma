import React, {ReactNode, useMemo} from "react";
import {Prediction} from "../../redux/features/photo/photoReducer";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {Container, Grid, List, ListItem} from "@mui/material";
import styles from "./Music.module.css";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {motion, Variants} from "framer-motion";
import MusicItem from "../../components/musicItem/MusicItem";
import { updateListenState } from "../../redux/features/user/userReducer";

ChartJS.register(ArcElement, Tooltip, Legend);

const data: ChartData<"pie"> = {
    labels: ['Весёлый', 'Грустный', 'Нейтральный', 'Агрессивный'],
    datasets: [
        {
            label: '%',
            data: [0, 0, 0, 0],
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(255, 99, 132, 0.6)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const playerVariants: Variants = {
    open: {
        clipPath: "inset(0% 0% 0% 0% round 10px)",
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.5,
            delayChildren: 0.3,
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

const playerContentVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.2 }
    }
};

type TMusicTrack = {
    id: String,
    artist: String,
    trackName: String,
    photoId: String,
}

const Music = () => {
    const prediction: Prediction = useAppSelector((state) => state.photo.prediction);
    const isListen: boolean = useAppSelector((state) => state.user.isListen);
    const theme = useAppSelector((state) => state.user.theme);
    const music: TMusicTrack[] = useAppSelector((state) => state.music.musicList);
    const dispatch = useAppDispatch();

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    const setCurrentMusic = (event: React.MouseEvent<HTMLDivElement>, musicId: String) => {
        dispatch(updateListenState(true));
    };

    const getMusicImage = (musicId: String) => {
    };

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
                    image={getMusicImage(music.id)}
                    theme={theme}
                    clickFn={setCurrentMusic}
                />
            </ListItem>
        );
    }

    const chartData: ChartData<"pie"> = useMemo<ChartData<"pie">>(() => {
        data.datasets[0].data = [prediction.happy, prediction.sad, prediction.normal, prediction.angry];
        return data;
    } , [prediction]);

    const musicList = useMemo<ReactNode[]>(() => {
        return music.map((musicTrack, index) => getMusicTrack(musicTrack, index));
    }, [music]);

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
                        <Pie data={chartData} options={options}/>
                    </Container>
                </Grid>
                <Grid
                    item
                    md={12}
                    className={styles['music-player']}
                    component={motion.div}
                    animate={isListen ? "open" : "closed"}
                    variants={playerVariants}
                >
                    <Container
                        component={motion.div}
                        variants={playerContentVariants}
                    >
                        музыкаааааа
                    </Container>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Music