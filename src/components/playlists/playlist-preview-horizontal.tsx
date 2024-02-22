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
            className={`${props.className}`}

            onClick={(event) => props.onClick?.(event)}
        >
            {playlist.title}
        </div>
    );
}