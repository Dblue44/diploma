import React from "react";
import {useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
import Home from "./Home";


const MenuContainer = () => {
    const navigate = useNavigate();
    const isPhotoLoaded = useAppSelector((state) => state.user.loadPhoto);

    if (isPhotoLoaded) {
        navigate("/music")
    }

    return (
        <Home/>
    )
}

export default MenuContainer;