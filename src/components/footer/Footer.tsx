import React from "react";
import styles from "./Footer.module.css";
import {Container} from "@mui/material";
import {useAppSelector} from "../../redux/hooks";


const Footer = () => {
    const theme = useAppSelector((state) => state.user.theme);

    return (
        <Container className={styles["footer"] `${theme ? styles["dark"] : styles["light"]}`}>
            © 2024 Все права защищены. Дипломная работа Стахеева Дмитрия. Сделано с любовью и старанием.
        </Container>
    )
}

export default Footer;