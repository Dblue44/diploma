import React from "react";
import styles from "./PhotoInput.module.css";
import {Container} from "@mui/material";
import InputLogo from "../../img/input.svg"
import {useNavigate} from "react-router-dom";

const PhotoInput = () => {
    const navigate = useNavigate();
    const handleImageUpload = (e: any) => {
        const [file] = e.target.files;
        if (file) {
            console.log(file);
        }
        navigate("/music")
    };

    return (
        <Container className={styles["input_box"]}>
            <img src={InputLogo}  alt="Logo"/>
            <label>Загрузить фото</label>
            <input type={"file"} accept={"image/*"} onChange={handleImageUpload}/>
        </Container>
    );
}

export default PhotoInput;
