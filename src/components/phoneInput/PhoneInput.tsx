import React from "react";
import Container from "@mui/material/Container";
import styles from "./PhoneInput.module.css";
import {Typography} from "@mui/material";
import MusicCard from "../musicCard/MusicCard";
import PhotoInput from "../photoInput/PhotoInput";

const PhoneInput = () => {
    return (
        <Container className={styles["phone"]}>
            <Typography
                variant="h1"
                gutterBottom
                className={styles["phone-text"]}
            >
                MOOD TUNER
            </Typography>
            <Container className={styles["phone-content"]}>
                <MusicCard/>
                <PhotoInput/>
            </Container>
        </Container>
    );
};

export default PhoneInput;