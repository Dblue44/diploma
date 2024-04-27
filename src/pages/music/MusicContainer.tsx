import React, {useMemo} from "react";
import Music from './Music'
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
import {Prediction} from "../../redux/features/photo/photoReducer";
import {TMusicTrack} from "../../redux/features/music/musicReducer";

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
const MusicContainer = () => {
    const musics: TMusicTrack[] = useAppSelector((state) => state.music.musicList);
    const prediction: Prediction = useAppSelector((state) => state.photo.prediction);

    /*const navigate = useNavigate();

    useEffect(() => {
        if (!isPhotoLoaded) {
            navigate("/")
        }
    }, [isPhotoLoaded, navigate])
    */
    const chartData = useMemo(() => {
        const currentData = data[0];
        currentData.data[0].value = prediction.happy;
        currentData.data[1].value = prediction.sad;
        currentData.data[2].value = prediction.normal;
        currentData.data[3].value = prediction.angry;
        data[0] = currentData;
        return data;
    }, [prediction]);

    return (
        <Music
            musics={musics}
            chartData={chartData}
        />

    )
}

export default MusicContainer;