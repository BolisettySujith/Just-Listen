import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon
} from "@heroicons/react/solid";
import {useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import {useEffect, useState} from "react";
import { playlistIdState } from "../atoms/playlistAtom";
import { useRecoilState } from "recoil";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import Link from 'next/link'

function Sidebar() {
    const spotifyApi = useSpotify();
    const {data:session, status} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const[PlaylistId, setPlaylistId] = useRecoilState(playlistIdState);
    

    useEffect(() => {
        if(spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    },[session,spotifyApi])

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
        <div className="text-gray-400 p-5 text-sm border-r border-gray-900 sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36 flex-grow h-screen overflow-y-scroll scrollbar-hide ">
            <ToastContainer align={"right"} position={"top"} id="toast-comp-3" />
            
            <div className = "space-y-4">
                <Link href="">
                    <a>
                    <Image  src="/justListen.png" alt="logo" width="200" height="60"></Image>
                    </a>
                </Link>
                
                <p className = "text-gray-600">Built by <a className="text-gray-400" href="https://bolisettysujith.rocks" target="_blank" rel="noopener noreferrer">Bolisetty Sujith</a> </p>
                
                <hr className="border-t-[0.1px] border-gray-900"/>
                <button className = "flex items-center space-x-2 hover:text-white" onClick={ToastMessage}>
                    <HomeIcon className = "h-5 w-5"/>
                    <p>Home</p>
                </button>
                <button className = "flex items-center space-x-2 hover:text-white" onClick={ToastMessage}>
                    <SearchIcon className = "h-5 w-5"/>
                    <p>Search</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900"/>

                <button className = "flex items-center space-x-2 hover:text-white" onClick={ToastMessage}>
                    <PlusCircleIcon className = "h-5 w-5"/>
                    <p>Create Playlist</p>
                </button>
                <button className = "flex items-center space-x-2  hover:text-white" onClick={ToastMessage}>
                    <HeartIcon className = "h-5 w-5 text-red-600"/>
                    <p>Liked Songs</p>
                </button>
                <button className = "flex items-center space-x-2 hover:text-white" onClick={ToastMessage}>
                    <RssIcon className = "h-5 w-5 text-green-600"/>
                    <p>Your Episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900"/>
                <button className = "flex items-center space-x-2 text-white">
                    <LibraryIcon className = "h-5 w-5"/>
                    <p>Your Library</p>
                </button>
                {/* Playlist */}
                {
                    playlists.map((playlist) => {
                        return (
                            <p key={playlist.id} onClick={() =>setPlaylistId(playlist.id)} className={`cursor-pointer hover:text-white`}>
                                {playlist.name}
                            </p>
                        )
                        
                    })
                }
                <p className ="pb-28">  </p>
            </div>
        </div>
    )
}

export default Sidebar
