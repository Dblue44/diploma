import React from "react";
import Container from "@mui/material/Container";
import styles from "./Phone.module.css";
import {Typography} from "@mui/material";
import MusicCard from "../musicCard/MusicCard";

const Phone = () => {
    return (
        <Container className={styles["phone"]}>
            <Typography
                variant="h1"
                gutterBottom
                className={styles["phone-text"]}
            >
                MOOD TUNER
            </Typography>
            <Container>
                <MusicCard/>
                <MusicCard/>
                <MusicCard/>
                <MusicCard/>
            </Container>
        </Container>
    );
};

export default Phone;