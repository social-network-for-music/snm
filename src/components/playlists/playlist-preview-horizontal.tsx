import { MouseEventHandler } from "react";

import type IPlaylistPreview from "@/types/playlist-preview";

export interface IPlaylistPreviewHorizontalProps {
    playlist: IPlaylistPreview;
    className?: string;
    onClick?: MouseEventHandler;
}

export default function PlaylistPreviewHorizontal(props: IPlaylistPreviewHorizontalProps) {
    return (
        <div
            className={`${props.className}`}

            onClick={(event) => props.onClick?.(event)}
        >
            {props.playlist.title}
        </div>
    );
}