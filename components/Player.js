import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { playState } from "../atoms/playerAtom"
import SpotifyPlayer from "react-spotify-web-playback";
import FreeUserPlayer from "./FreeUserPlayer";

const Player = ({ accessToken, trackUri }) => {
    const [play, setPlay] = useRecoilState(playState);
    
    useEffect(() => {
        if (trackUri) {
            setPlay(true);
        }
    }, [trackUri]);

    if (!accessToken) return null;


    return (
        <>
           {/* <FreeUserPlayer/> */}
            <SpotifyPlayer
                styles={{
                    activeColor: "#fff",
                    bgColor: "#181818",
                    color: "#fff",
                    loaderColor: "#fff",
                    sliderColor: "#1cb954",
                    trackArtistColor: "#ccc",
                    trackNameColor: "#fff",
                    height: "70px",
                    sliderTrackColor: "#535353",
                    sliderTrackBorderRadius: "4px",
                    sliderHandleColor: "#fff",
                    errorColor: "#fff",
                }}
                token={accessToken}
                showSaveIcon
                callback={(state) => {
                    setPlay(state.isPlaying);
                }}
                play={play}
                uris={trackUri ? [trackUri] : []}
                magnifySliderOnHover={true}
                autoPlay={true}
            />
        </>
    )
}

export default Player
