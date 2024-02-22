import { MouseEventHandler } from "react";

import * as icons from "react-icons/fa6";

import Thumbnail from "@/components/utilities/thumbnail";

import type IUser from "@/types/user";

import type IPlaylistPreview from "@/types/playlist-preview";

export interface IPlaylistPreviewHorizontalProps {
    user: IUser;
    playlist: IPlaylistPreview;
    className?: string;

    onClick?: MouseEventHandler;
    
    onToggle?: (playlist: IPlaylistPreview) => void;
}

export default function PlaylistPreviewHorizontal(props: IPlaylistPreviewHorizontalProps) {
    const { 
        user,
        
        playlist
    } = props;

    const owner = user._id == playlist.owner._id;
    
    return (
        <div
            className={`${props.className}
                w-full h-[100px] bg-[#181818]
                hover:bg-[#282828] rounded-md
                cursor-pointer`}

            onClick={(event) => props.onClick?.(event)}
        >
            <div className="flex gap-1 justify-between items-center">
                <div className="flex-none w-[100px] p-2.5">
                    <Thumbnail
                        id={playlist._id}

                        className="h-20"
                    />
                </div>

                <div className="flex-initial w-full truncate">
                    <div
                        className="text-sm text-[#F8F8F8] font-semibold truncate"
                    >
                        { playlist.title } { !playlist.public && <icons.FaLock className="inline -mt-1"/> }
                    </div>
                    
                    <div
                        className="text-xs text-[#868686] mt-0 truncate"
                    >
                        <p>
                            { playlist.owner.username } { owner && <icons.FaCrown className="inline -mt-1 mx-0.5"/> } • {
                                playlist.public ?
                                    `${playlist.followers.length} followers` :
                                    "private"
                            }
                        </p>
                        
                        <p>{ playlist.totalTracks } tracks</p>

                        { playlist.tags.length == 0 &&
                            <div className="mt-4 text-[#868686]">
                                No tags found
                            </div>
                        }

                        { playlist.tags.length != 0 &&
                            <div className="text-md mt-2 pb-2 overflow-x-scroll">
                                { playlist.tags.map((tag, i) => (
                                    <div 
                                        className="inline mr-1 px-2 text-white bg-spotify-darkgreen rounded-full"
                                    
                                        key={i}
                                    >
                                        { tag }
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>

                <div className="flex-none w-[45px]">
                    <button 
                        className={`p-2 rounded-full bg-spotify-green text-base
                            hover:bg-spotify-lightgreen active:bg-spotify-lightgreen 
                            text-black ${owner && "hidden"}`}

                        onClick={(event) => {
                            event.stopPropagation();
    
                            props.onToggle?.(playlist);
                        }}
                    >
                        { playlist.followers.includes(user._id) ?
                            <icons.FaHeartCircleCheck/> :
                            <icons.FaHeart/>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}