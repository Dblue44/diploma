import React, {useEffect} from "react";
import {useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
import Home from "./Home";
import Footer from "../../components/footer/Footer";


const HomeContainer = () => {
    const navigate = useNavigate();
    const isPhotoLoaded = useAppSelector((state) => state.user.loadPhoto);

    useEffect(() => {
        if (!isPhotoLoaded) {
            navigate("/")
        }
    }, [isPhotoLoaded, navigate])

    return (
        <>
            <Home/>
            <Footer/>
        </>

    )
}

export default HomeContainer;