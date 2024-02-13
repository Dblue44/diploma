import React from "react";
import Container from "@mui/material/Container";
import styles from "./MusicItem.module.css"
import {useAppSelector} from "../../redux/hooks";
import {motion} from "framer-motion";

export interface musicProps {
    data: {
        id: String;
        artist: String;
        trackName: String;
        photoId: String;
    }

}

const MusicItem = ({data}: musicProps) => {
    const theme = useAppSelector((state) => state.user.theme)
    return (
        <Container
            className={`${theme ? styles["dark"] : styles["light"]} ${styles["music-item"]}`}
            component={motion.div}
            whileHover={{
                scale: 1.1,
                transition: {duration: 0.3}
            }}
        >
            <div className={styles["music-item-container"]}>
                <div className={`${theme ? styles["dark"] : styles["light"]} ${styles["music-item-name"]}`}>
                    STARBOY
                </div>
                <div className={`${theme ? styles["dark"] : styles["light"]} ${styles["music-item-text"]}`}>
                    The Weeknd, Daft Punk
                </div>
            </div>
        </Container>
    );
};

export default MusicItem;