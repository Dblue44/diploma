import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
import Home from "./Home";
import Footer from "../../components/footer/Footer";
import CloseIcon from "@mui/icons-material/Close";
import {
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    Typography,
    DialogActions,
    Button
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {setErrorMessage} from "../../redux/features/photo/photoReducer";


const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const HomeContainer = () => {
    const navigate = useNavigate();
    const isPhotoLoaded = useAppSelector((state) => state.user.loadPhoto);
    const errorMessage = useAppSelector((state) => state.photo.error);
    const dispatch = useAppDispatch();

    const closeInfoMessage = () => {
        dispatch(setErrorMessage(""));
    };

    useEffect(() => {
        if (isPhotoLoaded) {
            navigate("/music")
        }
    }, [isPhotoLoaded, navigate])

    return (
        <>
            <Home/>
            <Footer/>
            <BootstrapDialog
                onClose={closeInfoMessage}
                aria-labelledby="customized-dialog-title"
                open={errorMessage !== ""}
            >
                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                    Ошибка при выполнении запроса
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={closeInfoMessage}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        При выполнении запроса произошла ошибка.
                    </Typography>
                    <Typography gutterBottom>
                        {errorMessage === "Failed to fetch" ? "В данный момент сервис недоступен" : errorMessage}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeInfoMessage}>
                        Закрыть
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>

    )
}

export default HomeContainer;