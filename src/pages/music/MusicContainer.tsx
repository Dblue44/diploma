import React, {useEffect, useMemo} from "react";
import Music from './Music'
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
import {Prediction, setErrorMessage} from "../../redux/features/photo/photoReducer";
import {TMusicTrack} from "../../redux/features/music/musicReducer";
import {
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    Typography,
    DialogActions,
    Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {styled} from "@mui/material/styles";

const data = [
    {
        data: [
            { id: 0, value: 0, label: 'Happy' },
            { id: 1, value: 0, label: 'Sad' },
            { id: 2, value: 0, label: 'Normal' },
            { id: 3, value: 0, label: 'Angry' },
        ],
        innerRadius: 4,
        outerRadius: 150,
        paddingAngle: 4,
        cornerRadius: 5,
        cx: 120
    },
];

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const MusicContainer = () => {
    const musics: TMusicTrack[] = useAppSelector((state) => state.music.musicList);
    const prediction: Prediction = useAppSelector((state) => state.photo.prediction);
    const isPhotoLoaded = useAppSelector((state) => state.user.loadPhoto);
    const errorMessage = useAppSelector((state) => state.photo.error);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const closeInfoMessage = () => {
        dispatch(setErrorMessage(""));
    };

    useEffect(() => {
        if (!isPhotoLoaded) {
            navigate("/")
        }
    }, [isPhotoLoaded, navigate])

    const chartData = useMemo(() => {
        const currentData = data[0];
        currentData.data[0].value = prediction.happy * 100;
        currentData.data[1].value = prediction.sad * 100;
        currentData.data[2].value = prediction.normal * 100;
        currentData.data[3].value = prediction.angry * 100;
        data[0] = currentData;
        return data;
    }, [prediction]);

    return (
        <>
            <Music
                musics={musics}
                chartData={chartData}
            />

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

export default MusicContainer;