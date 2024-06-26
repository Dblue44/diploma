import React from "react";
//import Logo from "../../img/Icon.svg"
import styles from "./Menu.module.css";
import {Select, MenuItem, Grid} from "@mui/material";
import {SelectChangeEvent} from '@mui/material/Select';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {updateTheme} from "../../redux/features/user/userReducer";
import {uploadPhoto} from "../../redux/features/photo/photoReducer";


const Menu = () => {
    const [lang, setLang] = React.useState("0");
    const [theme, setTheme] = React.useState("Dark");
    const isPhotoLoaded = useAppSelector((state) => state.user.loadPhoto);
    const dispatch = useAppDispatch();

    const handleImageUpload = async ({
                                         target: {
                                             validity,
                                             files: [file]
                                         },
                                     }: any) => {
        if (validity.valid) {
            dispatch(uploadPhoto(file))
        }
    };

    const handleLang = (event: SelectChangeEvent) => {
        setLang(event.target.value);
    };

    const handleTheme = (event: SelectChangeEvent) => {
        dispatch(updateTheme(event.target.value === "Dark"))
        setTheme(event.target.value);
    };

    return (
        <Grid container spacing={2} className={styles["main-menu"]}>
            <Grid item md={1} className={styles["lang"]}>
                <Select
                    variant={"outlined"}
                    defaultValue={"0"}
                    value={lang}
                    onChange={handleLang}
                    className={styles["lang-selector"]}
                >
                    <MenuItem value={0}>RUS</MenuItem>
                    <MenuItem value={1}>ENG</MenuItem>
                </Select>
            </Grid>
            <Grid item md={1} className={styles["theme"]}>
                <Select
                    defaultValue={"Dark"}
                    value={theme}
                    onChange={handleTheme}
                    className={styles["lang-selector"]}
                >
                    <MenuItem value={"Dark"}>Dark</MenuItem>
                    <MenuItem value={"Light"}>Light</MenuItem>
                </Select>
            </Grid>
            {isPhotoLoaded ? <Grid item md={2} className={styles["new-photo"]}>
                <label>Загрузить фото</label>
                <input type={"file"} accept={"image/*"} onChange={handleImageUpload}/>
            </Grid> : null}
        </Grid>
    )
}

export default Menu;