import { MouseEventHandler } from "react";

import * as icons from "react-icons/fa6";

import Thumbnail from "@/components/utilities/thumbnail";

import type IUser from "@/types/user";

import type IPlaylistPreview from "@/types/playlist-preview";

export interface IPlaylistPreviewProps {
    playlist: IPlaylistPreview;

    owner?: boolean;
    className?: string;
    onClick?: MouseEventHandler;
}

export default function IPlaylistPreview(props: IPlaylistPreviewProps) {
    const { playlist } = props;
 
    return (
        <div 
            className={`${props.className}
                w-[200px] h-[315px] bg-[#181818]
                hover:bg-[#282828] rounded-xl 
                cursor-pointer`}

            onClick={(event) => props.onClick?.(event)}
        >
            <div className="pt-5 px-5">
                <Thumbnail
                    id={playlist._id}

                    className="h-40"
                />

                <div
                    className="text-lg text-[#F8F8F8] font-semibold mt-3 truncate"
                >
                    { playlist.title }
                </div>

                <div
                    className="text-md text-[#868686] mt-0 truncate"
                >
                    <p>
                        { playlist.owner.username } { props.owner && <icons.FaCrown className="inline -mt-1 mx-0.5"/> } • { playlist.totalFollowers } followers
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
    );
}