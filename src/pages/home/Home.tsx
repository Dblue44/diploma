import React, {useState, useEffect} from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"
import styles from "./Home.module.css";
import {Typography} from "@mui/material";
import PhotoInput from "../../components/photoInput/PhotoInput";
import Phone from "../../components/phone/Phone";
import PhoneInput from "../../components/phoneInput/PhoneInput";

const Home = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        // @ts-ignore
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                <Grid item xs={12} sm={12} md={3} className={styles["text-left"]}>
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Музыка под настроение
                    </Typography>
                </Grid>
                {width > 700 ?
                    <>
                        <Grid item md={5} sm={7}>
                            <Phone/>
                        </Grid>
                        <Grid item md={4} sm={5} className={styles["right-grid"]}>
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
                    </>
                    :
                    <>
                        <Grid item xs={12} sm={12} className={styles["right-grid"]}>
                            <Container className={styles["text-right"]}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                >
                                    AI проанализирует ваше
                                    фото и составит плейлист
                                </Typography>
                            </Container>
                        </Grid>
                        <Grid item xs={12} sm={12} className={styles["phone-input"]}>
                            <PhoneInput/>
                        </Grid>
                    </>
                }

            </Grid>
        </Container>
    );
};

export default Home;