import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"
import styles from "./Home.module.css";
import {Typography} from "@mui/material";
import PhotoInput from "../../components/photoInput/PhotoInput";
import Phone from "../../components/phone/Phone";
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
            <Grid container spacing={4} className={styles["main-content"]}>
                <Grid item md={3} className={styles["text-left"]}>
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Музыка под настроение
                    </Typography>
                </Grid>
                <Grid item md={5}>
                    <Phone/>
                </Grid>
                <Grid item md={4}>
                    <Container className={styles["text-right"]}>
                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            AI проанализирует ваше
                            фото и составит плейлист
                        </Typography>
                    </Container>
                    <PhotoInput/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;