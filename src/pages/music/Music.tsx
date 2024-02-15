import React, {ReactNode, useMemo} from "react";
import {useAppSelector} from "../../redux/hooks";
import {Container, Grid, List, ListItem} from "@mui/material";
import styles from "./Music.module.css";
import MusicItem from "../../components/musicItem/MusicItem";

type MusicTrack = {
    id: String,
    artist: String,
    trackName: String,
    photoId: String,
}

const Music = () => {
    const music: MusicTrack[] = useAppSelector((state) => state.music.musicList);

    const getMusicTrack = (music: MusicTrack): ReactNode => {
        return (
            <ListItem>
                <MusicItem
                    id={music.id}
                    artist={music.artist}
                    trackName={music.trackName}
                    photoId={music.photoId}
                />
            </ListItem>
        )
    }

    const musicList = useMemo<ReactNode[]>(() => {
        return music.map((musicTrack) => getMusicTrack(musicTrack));
    }, [music])

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <List sx={{overflow: 'auto', height: '35em'}}>
                        {musicList}
                    </List>
                </Grid>
                <Grid item md={6}>
                    123
                </Grid>
            </Grid>
        </Container>
    )
}

export default Music;