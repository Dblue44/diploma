import React, {useEffect, useMemo} from "react";
import Music from './Music'
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
import {Prediction} from "../../redux/features/photo/photoReducer";
import {ChartData} from "chart.js/dist/types";
import {TMusicTrack} from "../../redux/features/music/musicReducer";

const data: ChartData<"pie"> = {
    labels: ['Весёлый', 'Грустный', 'Нейтральный', 'Агрессивный'],
    datasets: [
        {
            label: '%',
            data: [0, 0, 0, 0],
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(255, 99, 132, 0.6)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
const MusicContainer = () => {
    const musics: TMusicTrack[] = useAppSelector((state) => state.music.musicList);
    const prediction: Prediction = useAppSelector((state) => state.photo.prediction);
    //const images = useAppSelector((state) => state.photo.images);

    const dispatch = useAppDispatch();

    /*const navigate = useNavigate();
    const isPhotoLoaded = useAppSelector((state) => state.user.loadPhoto);

    useEffect(() => {
        if (!isPhotoLoaded) {
            navigate("/")
        }
    }, [isPhotoLoaded, navigate])
    */
    const chartData: ChartData<"pie"> = useMemo<ChartData<"pie">>(() => {
        data.datasets[0].data = [prediction.happy, prediction.sad, prediction.normal, prediction.angry];
        return data;
    }, [prediction]);

    // useEffect(() => {
    //     musics.forEach((music) => {
    //         dispatch(getImage(music.photoId));
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    return (
        <Music
            musics={musics}
            //images={images}
            chartData={chartData}
        />
    )
}

export default MusicContainer;