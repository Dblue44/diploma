import React from "react";
import Container from "@mui/material/Container";
import styles from "./MusicItem.module.css";
import image from "../../img/musicCard1.png";
import play from "../../img/Play.svg";
import { motion } from "framer-motion";

type TPlayFunction = (event: React.MouseEvent<HTMLDivElement>, musicId: String) => void;

export interface IMusicProps {
    id: String;
    artist: String;
    trackName: String;
    photoId: String;
    image: any;
    theme: boolean;
    clickFn: TPlayFunction;
}

const playImage = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
}

const MusicItem = (props: IMusicProps) => {

    return (
        <Container
            onClick={event => {props.clickFn(event, props.id)}}
            className={styles["music-item"]}
            sx={{"display": "grid"}}
            component={motion.div}
            whileHover={{scale: 1.05}}
            whileTap={{ scale: 1.0 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
            }}
        >
            <div className={styles["music-item-image"]}>
                <img src={image} />
                <motion.img
                    id={styles["music-item-play"]}
                    src={play}
                    variants={playImage}
                    initial="hidden"
                    whileHover="show"
                />
            </div>
            <div className={styles["music-item-content"]}>
                <div className={styles["music-item-name"]}>
                    {props.artist}
                </div>
                <div className={styles["music-item-text"]}>
                    {props.trackName}
                </div>
            </div>
            <div className={styles["music-item-prediction"]}>

            </div>
        </Container>
    );
};

export default MusicItem