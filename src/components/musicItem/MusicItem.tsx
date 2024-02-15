import React from "react";
import Container from "@mui/material/Container";
import styles from "./MusicItem.module.css"
import {useAppSelector} from "../../redux/hooks";
import {motion} from "framer-motion";

export interface musicProps {
    id: String;
    artist: String;
    trackName: String;
    photoId: String;

}

const MusicItem = (props: musicProps) => {
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
                    {props.artist}
                </div>
                <div className={`${theme ? styles["dark"] : styles["light"]} ${styles["music-item-text"]}`}>
                    {props.trackName}
                </div>
            </div>
        </Container>
    );
};

export default MusicItem;