import { MouseEventHandler } from "react";

import * as icons from "react-icons/fa6";

import Thumbnail from "@/components/utilities/thumbnail";

import type IUser from "@/types/user";

import type IPlaylistPreview from "@/types/playlist-preview";

export interface IPlaylistPreviewProps {
    user?: IUser;
    playlist: IPlaylistPreview;
    className?: string;

    onClick?: MouseEventHandler;

    onHeart?: (playlist: IPlaylistPreview) => void;
}

export default function IPlaylistPreview(props: IPlaylistPreviewProps) {
    const {
        user,
        
        playlist
    } = props;

    const owner = user?._id == playlist.owner._id;
 
    return (
        <div 
            className={`${props.className}
                w-[200px] h-[315px] bg-[#181818]
                hover:bg-[#282828] rounded-xl 
                cursor-pointer relative`}

            onClick={(event) => props.onClick?.(event)}
        >
            <div className="pt-5 px-5">
                <Thumbnail
                    id={playlist._id}

                    className="h-40 rounded-md"
                />

                { user &&
                    <button 
                        className={`absolute bottom-[115px] right-0 m-3 p-2 text-2xl
                            rounded-full bg-spotify-green hover:bg-spotify-lightgreen 
                            active:bg-spotify-lightgreen text-black ${owner && "hidden"}`}

                        onClick={(event) => {
                            event.stopPropagation();

                            props.onHeart?.(playlist);
                        }}
                    > 
                        { playlist.followers.includes(user._id) ?
                            <icons.FaHeartCircleCheck/> :
                            <icons.FaHeart/>
                        }
                    </button>
                }

                <div
                    className="text-lg text-spotify-white font-semibold mt-3 truncate"
                >
                    { playlist.title } { !playlist.public && <icons.FaLock className="inline -mt-1"/> }
                </div>

                <div
                    className="text-md text-[#868686] mt-0 truncate"
                >
                    <p>
                        { playlist.owner.username } { owner && <icons.FaCrown className="inline -mt-1 mx-0.5"/> } • {
                            playlist.public ?
                                `${playlist.followers.length} followers` :
                                "private"
                        }
                    </p>
                    
                    <p>{ playlist.totalTracks } tracks</p>
                </div>

                { playlist.tags.length == 0 &&
                    <div className="mt-4 text-[#868686]">
                        No tags found
                    </div>
                }

                { playlist.tags.length != 0 &&
                    <div className="text-md mt-2 pb-2 overflow-x-scroll">
                        { playlist.tags.map((tag, i) => (
                            <div 
                                className="inline mr-1 px-2 bg-spotify-lightgray text-spotify-white rounded-full"
                            
                                key={i}
                            >
                                { tag }
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}