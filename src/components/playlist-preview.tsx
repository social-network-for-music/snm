import { MouseEventHandler } from "react";

export interface IPlaylistPreviewProps {
    playlist: any;
    className?: string;
    onClick?: MouseEventHandler;
}

export default function(props: IPlaylistPreviewProps) {
    return (
        <div
            className={`${props.className}`}

            onClick={(event) => props.onClick?.(event)}
        >
            {props.playlist.title}
        </div>
    );
}