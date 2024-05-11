import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import Home from "../pages/home/Home";
import App from "../App";
import MusicContainer from "../pages/music/MusicContainer";
import PhotoInput from "../components/photoInput/PhotoInput";
import HomeContainer from "../pages/home/HomeContainer";
import PhoneInput from "../components/phoneInput/PhoneInput";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Home">
                <Home/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/MusicContainer">
                <MusicContainer/>
            </ComponentPreview>
            <ComponentPreview path="/PhotoInput">
                <PhotoInput/>
            </ComponentPreview>
            <ComponentPreview path="/HomeContainer">
                <HomeContainer/>
            </ComponentPreview>
            <ComponentPreview path="/PhoneInput">
                <PhoneInput/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;