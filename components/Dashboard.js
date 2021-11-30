import CenterBody from "./CenterBody";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {playingTrackState} from "../atoms/playerAtom";
import { useEffect, useState } from "react";
import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
    clientId:process.env.SPOTIFY_CLIENT_ID
});

const Dashboard = () => {
    const{data:session} = useSession();
    const {accessToken} = session;

    const[playingTrack,setPlayingTrack] = useRecoilState(playingTrackState);
    const[showPlayer,setShowPlayer] = useState(false);
    
    useEffect(()=>{
        setShowPlayer(true);
    },[]);

    const chooseTrack = (track)=>{
        setPlayingTrack(track);
    };

    useEffect(()=>{
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    },[accessToken]);


    return (
        <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
            <LeftSidebar />
            <CenterBody spotifyApi={spotifyApi} chooseTrack={chooseTrack}/>
            <RightSidebar spotifyApi={spotifyApi} chooseTrack={chooseTrack}/>

            {showPlayer && (
                <div className="fixed bottom-0 left-0 right-0 z-50">
                     <Player accessToken={accessToken} trackUri={playingTrack.uri}/>
                </div>
            )}
        </main>
    )
}

export default Dashboard;
