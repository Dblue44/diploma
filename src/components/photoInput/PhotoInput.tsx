import React, {useState} from 'react'
import styles from "./PhotoInput.module.css";
import {motion} from "framer-motion";
import {Container, CircularProgress} from "@mui/material";
import InputDark from "../../img/input_dark.svg"
import InputLight from "../../img/input_light.svg"
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {updateLoadPhoto} from "../../redux/features/user/userReducer";
import {setErrorMessage, updatePrediction, uploadPhoto} from "../../redux/features/photo/photoReducer";
import {addMusic} from "../../redux/features/music/musicReducer";

interface IMusic {
    id: string
    artist: string
    trackName: string
    photoId: string
}

interface IPrediction {
    happy: number
    sad: number
    normal: number
    angry: number
}

interface IPhotoUpload {
    photoUpload: {
        music: IMusic[]
        prediction: IPrediction
    }
}

const PhotoInput = () => {
    const theme = useAppSelector((state) => state.user.theme)
    const isLoading = useAppSelector((state) => state.photo.isLoading)
    //const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleImageUpload = async ({
                                         target: {
                                             validity,
                                             files: [file]
                                         },
                                     }: any) => {
        if (validity.valid) {
            //setIsLoading(true);
            dispatch(uploadPhoto(file))
        }
    };

    return (
        <>
            {isLoading ?
                <Container className={styles["loading-container"]}>
                    <CircularProgress
                        disableShrink
                        className={styles["loader"]}
                    />
                </Container>
                 :
                <Container
                    className={`${theme ? styles["dark"] : styles["light"]} ${styles["input_box"]}`}
                    component={motion.div}
                    whileHover={{
                        scale: 1.05,
                        transition: {duration: 0.3}
                    }}
                >
                    <img src={theme ? InputDark : InputLight} alt="Logo"/>
                    <label>Загрузить фото</label>
                    <input type={"file"} accept={"image/*"} onChange={handleImageUpload}/>
                </Container>
            }
        </>
    );
}
export default PhotoInput;
