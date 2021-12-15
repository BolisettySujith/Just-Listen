import { useRecoilValue } from "recoil"
import {playlistState} from "../atoms/playlistAtom";
import Song from "./Song";
import {ClockIcon, MusicNoteIcon} from "@heroicons/react/solid";

function Songs() {

    const playlist = useRecoilValue(playlistState);
    
    return (
        <div className="text-white px-8 flex-col space-y-1 pb-28 ">
            <div className = {`p-2 text-xs lg:text-sm text-gray-400 px-4 py-2 pt-4 grid grid-cols-2`}>
                <div className="flex items-center  space-x-4">
                    <MusicNoteIcon className="w-4 h-4 mr-2" />
                    <p>TITLE</p>
                </div>
                <div className ="flex items-center justify-between ml-auto md:ml-0">
                    <p className="w-40 hidden md:inline" >
                        ALBUM
                        
                    </p>
                    <p>
                        <ClockIcon className = "w-4 h-5" />
                    </p>
                </div>
            </div>  
            <hr className="border-t-[0.1px] border-gray-800 pb-4"/>
            {
                playlist?.tracks.items.map((track,i)=>{
                    return(
                        <Song key={track.track.id} track={track} order={i}/>
                    );
                })
            }
        </div>
    )
}

export default Songs
