import React, {Suspense, useMemo} from 'react';
import './App.module.css';
import {Grid} from "@mui/material";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";
import HomeContainer from "./pages/home/HomeContainer"
import MusicContainer from "./pages/music/MusicContainer"
import {Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import {loadErrorMessages, loadDevMessages} from "@apollo/client/dev";
import FallbackLoading from "./components/loader/FallbackLoading";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useAppSelector} from "./redux/hooks";


// Adds messages only in a dev environment
loadDevMessages();
loadErrorMessages();


function App() {
    const darkTheme = useAppSelector(state => state.user.theme)
    const theme = useMemo(
        () => createTheme({
            palette: {
                mode: darkTheme ? "dark" : "light",
            },
        }),
        [darkTheme],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<FallbackLoading/>}>
                <Grid>
                    <Menu/>
                    <Routes>
                        <Route path="/" element={<HomeContainer/>}/>
                        <Route path="/music" element={<MusicContainer/>}/>
                    </Routes>
                    <Footer/>
                </Grid>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
