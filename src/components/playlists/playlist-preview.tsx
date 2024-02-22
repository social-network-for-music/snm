import { MouseEventHandler } from "react";

import Thumbnail from "@/components/utilities/thumbnail";

import type IPlaylistPreview from "@/types/playlist-preview";

export interface IPlaylistPreviewProps {
    playlist: IPlaylistPreview;
    className?: string;
    onClick?: MouseEventHandler;
}

export default function IPlaylistPreview(props: IPlaylistPreviewProps) {
    const { playlist } = props;
 
    return (
        <div 
            className={`${props.className} relative
                w-[200px] h-[275px] bg-[#181818]
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
            </div>
        </div>
    );
}