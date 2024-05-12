import React from "react";
import Container from "@mui/material/Container";
import styles from "./MusicItem.module.css";
import play from "../../img/Play.svg";
import {motion} from "framer-motion";

type TPlayFunction = (event: React.MouseEvent<HTMLDivElement>, musicId: string) => void;

export interface IMusicProps {
    id: string;
    artist: string;
    trackName: string;
    photoId: string;
    //imageSrc: string;
    theme: boolean;
    clickFn: TPlayFunction;
}

const MusicItem = (props: IMusicProps) => {

    return (
        <Container
            onClick={event => {
                props.clickFn(event, props.id)
            }}
            className={styles["music-item"]}
            sx={{"display": "grid"}}
            component={motion.div}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 1.0}}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
            }}
        >
            <motion.div
                id={styles["music-item-play-container"]}
                initial={{opacity: 0}}
                whileHover={{opacity: 0.9}}
            >
                <img id={styles["music-item-play"]} alt={"music-play-icon"} src={play}/>
            </motion.div>
            <div className={styles["music-item-image"]}>
                <img src={`http://${process.env.BACKEND_URL}/api/v1/react/photo?fileId=${props.photoId}`} alt={"music-logo"}/>
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