import React, {Suspense, useMemo} from 'react';
import './App.module.css';
import {Grid} from "@mui/material";
import Menu from "./components/Menu/Menu";
import Home from "./pages/Home/Home"
import MusicContainer from "./pages/Music/MusicContainer"
import {Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import {loadErrorMessages, loadDevMessages} from "@apollo/client/dev";
import FallbackLoading from "./components/loader/FallbackLoading";
import {ThemeProvider, createTheme} from '@mui/material/styles';
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
            <Suspense fallback={<FallbackLoading/>}>
                <Grid>
                    <Menu/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/music" element={<MusicContainer/>}/>
                    </Routes>
                </Grid>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
