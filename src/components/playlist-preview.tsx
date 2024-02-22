import { MouseEventHandler } from "react";

import type PlaylistPreview from "@/types/playlist-preview";

export interface IPlaylistPreviewProps {
    playlist: PlaylistPreview;
    className?: string;
    onClick?: MouseEventHandler;
}

export default function PlaylistPreview(props: IPlaylistPreviewProps) {
    return (
        <div
            className={`${props.className}`}

            onClick={(event) => props.onClick?.(event)}
        >
            {props.playlist.title}
        </div>
    );
}