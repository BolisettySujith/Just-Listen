import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react"
import {useState, useEffect, useCallback} from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import {VolumeUpIcon as VolumeDownIcon} from "@heroicons/react/outline";
import { 
    SwitchHorizontalIcon, 
    RewindIcon,
    VolumeUpIcon,
    PlayIcon,
    PauseIcon,
    FastForwardIcon,
    ReplyIcon
} from "@heroicons/react/solid";
import {debounce} from "lodash";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Player() {

    const spotifyApi = useSpotify();   
    const {data:session, status} = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);
    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }

    useEffect(() => {
        if(spotifyApi.getAccessToken() && !currentTrackId){
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackIdState,spotifyApi,session]);

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            if(data.body?.is_playing){
                spotifyApi.pause();
                setIsPlaying(false);
            }else{
                spotifyApi.play();
                setIsPlaying(true);
            }
           
        })
    };

    useEffect(() => {
        if(volume >0 && volume < 100){
            debouncedAdjustVolume(volume);
        }
    } , [volume]);

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch(err => {});
        }, 500),
        []
    );

    const ToastMessage = () => {
        return(
            toast.info("Currently Not Availabe !",{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                }
            )
        );
    }

    return (
        <div className="h-20 bg-gradient-to-b from-[#191918] to-black text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            {/* left */}
            <div className = "flex items-center space-x-4">
                
                <img className = "hidden md:inline h-10 w-10 " src = {songInfo?.album.images?.[0]?.url} alt=""/>
                <div>
                    <h3 className = " w-36 lg:w-64 text-white truncate">{songInfo?.name}</h3>
                    <p className = "text-xs lg:text-sm text-gray-500 truncate">{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            <div className="flex items-center justify-evenly space-x-0 md:space-x-2">
                    <SwitchHorizontalIcon className ="button hidden md:inline-flex" onClick={ToastMessage}/>
                    <RewindIcon className = "button" onClick={ToastMessage}/>
                    {
                        isPlaying ?(
                            <PauseIcon onClick = {handlePlayPause} className ="button w-10 h-10" />
                        ):(
                            <PlayIcon onClick = {handlePlayPause} className ="button w-10 h-10" />
                        )
                    }
                    <FastForwardIcon className ="button" onClick={ToastMessage}/>
                    <ReplyIcon className ="button hidden md:inline-flex" onClick={ToastMessage}/>
            </div>
            
            <div className = "items-center space-x-2 md:space-x-4 justify-end pr-5 flex" >
                <VolumeDownIcon onClick ={() => volume > 0 && setVolume(volume - 10)} className = "button"  />
                <input className = "w-14 md:w-28"
                type="range" 
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                />
                <VolumeUpIcon onClick ={() => volume < 100 && setVolume(volume + 10)} className = "button"  />
            </div>
        </div>
    )
}

export default Player
