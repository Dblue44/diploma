import React from 'react'
import styles from "./PhotoInput.module.css";
import {Container} from "@mui/material";
import InputLogo from "../../img/input.svg"
import {useNavigate} from "react-router-dom";
import {SEND_PHOTO} from "../../apollo/user";
import {useMutation} from "@apollo/client";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {updateTheme} from "../../redux/features/user/userReducer";

const PhotoInput = () => {
    const theme = useAppSelector((state) => state.user.theme)
    const [mutate, {data, loading, error}] = useMutation(SEND_PHOTO);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleImageUpload = async ({
           target: {
               validity,
               files: [file]
           }
       }: any) => {
        validity.valid && await mutate({
            variables: { file },
            onCompleted: () => {dispatch(updateTheme(true))},
        });
    };

    return (
        <Container className={`${theme ? styles["dark"] : styles["light"]} ${styles["input_box"]}`}>
            <img src={InputLogo} alt="Logo"/>
            <label>Загрузить фото</label>
            <input type={"file"} accept={"image/*"} onChange={handleImageUpload}/>
        </Container>
    );
}

export default PhotoInput;
