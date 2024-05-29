import React from "react";
import styles from "./Footer.module.css";
import {Container} from "@mui/material";


const Footer = () => {


    return (
        <Container className={styles["footer"]}>
            © 2024 Все права защищены. Дипломная работа Стахеева Дмитрий. Сделано с любовью и старанием.
        </Container>
    )
}

export default Footer;