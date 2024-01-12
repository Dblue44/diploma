import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"
import styles from "./Home.module.css";
import { Typography } from "@mui/material";
import PhotoInput from "../../components/PhotoInput/PhotoInput";
import Phone from "../../img/phone.png"

const Home = () => {
    return (
        <Container>
            <Container>
                <Typography
                    variant="h1"
                    gutterBottom
                    className={styles["main-text"]}
                >
                    MOOD TUNER
                </Typography>
            </Container>
            <Grid container spacing={4}>
                <Grid item md={3} className={styles["text-left"]}>
                    Музыка под настроение
                </Grid>
                <Grid item md={5} className={styles["phone"]}>
                    <img src={Phone}  alt="Phone"/>
                </Grid>
                <Grid item md={4}>
                    <Container className={styles["text-right"]}>
                        AI проанализирует ваше
                        фото и составит плейлист
                    </Container>
                    <PhotoInput/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;