import React, {useEffect} from "react";
import Music from './Music'
import {useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
const MusicContainer = () => {
    /*const navigate = useNavigate();
    const isPhotoLoaded = useAppSelector((state) => state.user.loadPhoto);

    useEffect(() => {
        if (!isPhotoLoaded) {
            navigate("/")
        }
    }, [isPhotoLoaded, navigate])
*/
    return (
        <Music />
    )
}

export default MusicContainer;