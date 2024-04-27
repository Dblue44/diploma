import {useEffect, useRef} from "react";

interface IUseAudioProps {
    src: string;
    volume: number;
    playbackRate: number;

}
const useAudio = (props: IUseAudioProps) => {
    const audio = useRef(new Audio(props.src))

    useEffect(() => {
        audio.current.volume = props.volume
    }, [props.volume])

    useEffect(() => {
        audio.current.playbackRate = props.playbackRate
    }, [props.playbackRate])

    return audio.current;
}

export default useAudio;