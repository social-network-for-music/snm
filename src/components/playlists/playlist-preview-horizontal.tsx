import { MouseEventHandler } from "react";

import type IUser from "@/types/user";

import type IPlaylistPreview from "@/types/playlist-preview";

export interface IPlaylistPreviewHorizontalProps {
    playlist: IPlaylistPreview;

    owner?: boolean;
    className?: string;
    onClick?: MouseEventHandler;
}

export default function PlaylistPreviewHorizontal(props: IPlaylistPreviewHorizontalProps) {
    const { playlist } = props;
    
    return (
        <div
            className={`${props.className}`}

            onClick={(event) => props.onClick?.(event)}
        >
            {playlist.title}
        </div>
    );
}