import React from "react";
import styles from "./Footer.module.css";
import {Container} from "@mui/material";

const Footer = () => {

    return (
        <Container className={styles["footer"]}>
            <p>
                © 2024 Все права защищены. Дипломная работа Стахеева Дмитрия. Сделано с любовью и старанием.
            </p>
        </Container>
    )
}

export default Footer;