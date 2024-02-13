import React from 'react'
import styles from "./PhotoInput.module.css";
import {motion} from "framer-motion";
import {Container} from "@mui/material";
import InputLogo from "../../img/input.svg"
import {useNavigate} from "react-router-dom";
import {SEND_PHOTO} from "../../apollo/user";
import {useMutation} from "@apollo/client";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {updateLoadPhoto} from "../../redux/features/user/userReducer";
import {updatePrediction} from "../../redux/features/photo/photoReducer";
import {addMusic} from "../../redux/features/music/musicReducer";

interface Music {
    id: String
    author: String
    trackName: String
    photoId: String
}

interface photoUpload {
    photoUpload: {
        music: Music[]
        prediction: number[]
    }
}

const PhotoInput = () => {
    const theme = useAppSelector((state) => state.user.theme)
    const [getPhoto] = useMutation(SEND_PHOTO);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleImageUpload = async ({
     target: {
         validity,
         files: [file]
     }
    }: any) => {
        validity.valid && await getPhoto({
            variables: {file},
            onCompleted: (data: photoUpload) => {
                //dispatch(updateLoadPhoto(true));
                dispatch(updatePrediction(data.photoUpload.prediction))
                dispatch(addMusic(data.photoUpload.music))
                console.log(data.photoUpload.prediction);
            },
        });
    };

    return (
        <Container
            className={`${theme ? styles["dark"] : styles["light"]} ${styles["input_box"]}`}
            component={motion.div}
            whileHover={{
                scale: 1.1,
                transition: {duration: 0.3}
            }}
        >
            <img src={InputLogo} alt="Logo"/>
            <label>Загрузить фото</label>
            <input type={"file"} accept={"image/*"} onChange={handleImageUpload}/>
        </Container>
    );
}
export default PhotoInput;
