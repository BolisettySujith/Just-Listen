import {signOut,useSession } from "next-auth/react"
import { LogoutIcon, MinusSmIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const colors = [
    "via-indigo-500",
    "via-purple-500",
    "via-pink-500",
    "via-red-500",
    "via-orange-500",
    "via-yellow-500",
    "via-green-500",
    "via-teal-500",
    "via-blue-500",
    "via-[#00FFFF]",
    "via-[#6a737b]",
    "via-[#8a7967]",
    "via-[#788cb6]",
    "via-[#3b5998]",
    "via-[#2bde73]",
    "via-[#0093d0]",

];


function Center() {
    const spotifyApi = useSpotify();    
    const {data:session, status} = useSession();
    const [color, setColor] = useState(null);
    const PlaylistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    const ToastMessage = () => {
        return(
            toast.warn("Loging out",{
                    position: "top-right",
                    autoClose: 3000,
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

    const exit = () => {
        ToastMessage();

        return signOut();
    }

    useEffect(() => {
        setColor(shuffle(colors).pop());
    },[PlaylistId]);

    useEffect(() => {
        spotifyApi.getPlaylist(PlaylistId).then((data) => {
            setPlaylist(data.body);
        }).catch((err) => {
            console.log("Something went wrong !!!", err);
        })
    } ,[spotifyApi, PlaylistId]);

    var userimage = session?.user.image;
    if(session?.user.image === undefined){
        userimage = "JustListenLogo.png";
    }
    
    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-4 right-8">
                <div className = "flex items-center text-white bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-1 pl-1">
                    <img 
                        className ="rounded-full w-7 h-7" 
                        src = {userimage} alt = "logo" 
                    />
                    <h2 className ="hidden md:inline-flex" >{session?.user.name}</h2>
                    <LogoutIcon className="h-5 w-5 text-red-600 hidden md:inline-flex pr-1 hover:scale-125 transition transform duration-100 ease-in-out" onClick={exit} alt = "Log out" />
                    
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b from-black ${color} to-black h-80 text-white p-8`}>
                <img className=" h-52 w-52 shadow-2xl" src={playlist?.images?.[0]?.url} alt="playlistimage" />
                <div>
                    <p className = "text-xs" >PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                    <div className="items-center space-x-2 text-xs lg:text-sm text-gray-200 hidden md:inline-flex">
                        <p className = "text-white">{playlist?.owner?.display_name}</p>
                        <MinusSmIcon className ="h-1.5 w-1.5"/>
                        <p>{playlist?.followers?.total} likes</p>
                        <MinusSmIcon className ="h-1.5 w-1.5"/>
                        <p>{playlist?.tracks?.total} songs</p>
                    </div>
                </div>
            </section>
            <div className = { `text-white  bg-[#121212]`}>
                <Songs/>
            </div>
        </div>
    )
}

export default Center;