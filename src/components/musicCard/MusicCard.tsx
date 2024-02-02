import React from "react";
import Container from "@mui/material/Container";
import styles from "./MusicCard.module.css";
import MusicCardPhoto from "../../img/musicCard1.png"
import {useAppSelector} from "../../redux/hooks";
import { motion } from "framer-motion";
const MusicCard = () => {
    const theme = useAppSelector((state) => state.user.theme)

    return (
        <Container
            className={`${theme ? styles["dark"] : styles["light"]} ${styles["music-card"]}`}
            component={motion.div}
            whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 }
            }}
        >
            <img src={MusicCardPhoto}/>
            <div className={styles["music-card-text-container"]}>
                <div className={`${theme ? styles["dark"] : styles["light"]} ${styles["music-card-name"]}`}>
                    STARBOY
                </div>
                <div className={`${theme ? styles["dark"] : styles["light"]} ${styles["music-card-text"]}`}>
                    The Weeknd, Daft Punk
                </div>
            </div>

        </Container>
    );
};

export default MusicCard;