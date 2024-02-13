import React from "react";
import {Container, Grid, List, ListItem } from "@mui/material";
import styles from "./Music.module.css";
import MusicItem from "../../components/musicItem/MusicItem";


type musicProps = {
    id: String;
    artist: String;
    trackName: String;
    photoId: String;
}

const Music = () => {

    let prop: musicProps = {
        id: "12",
        artist: "34",
        trackName: "56",
        photoId: "78"
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <List sx={{overflow: 'auto', height: '35em'}}>
                        <ListItem>
                            <MusicItem data={prop}/>
                        </ListItem>
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