import useSpotify from "../hooks/useSpotify"
import { millisToMinutesAndSeconds } from "../lib/time";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";


function Song({order, track}){
    const spotifyApi = new useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    
    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        
        spotifyApi.play(
            {
                uris: [track.track.uri]
            }
        );
        
    }

    return (
        
        <div className = {`hover:bg-[#2a2b2b] hover:scale-105 transition transform duration-100 ease-in-out cursor-pointer rounded-lg p-2 text-xs lg:text-sm  px-4 py-2 grid grid-cols-2 ${currentTrackId === track.track.id ? "bg-gray-800" : ""}`} onClick={playSong}>
            <div className="flex items-center  space-x-4">
                    <p className= {`text-gray-400 ${ currentTrackId === track.track.id ? "text-[#4FE34F]" : "text-gray-400"}`}>{currentTrackId === track.track.id && isPlaying ? (<img  src="https://open.scdn.co/cdn/images/equaliser-animated-green.f93a2ef4.gif"/>):order+1}</p>
                    <img className = "h-10 w-10" src={track.track.album.images[0].url} alt=""/> 
                    <div>
                        <p className=  {`w-36 lg:w-64 ${currentTrackId === track.track.id ? "text-[#4FE34F]" : "text-white" } truncate`}>{track.track.name}</p>
                        <p className = "text-gray-400">{track.track.artists[0].name}</p>
                    </div>
                </div>
                <div className ="flex items-center justify-between ml-auto md:ml-0 text-gray-400">
                    <p className="w-40 hidden md:inline" >
                        {track.track.album.name}
                    </p>
                    <p>
                        {millisToMinutesAndSeconds(track.track.duration_ms)}
                    </p>
                </div>
        </div>
    );
}

export default Song;