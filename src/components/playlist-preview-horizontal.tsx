import { MouseEventHandler } from "react";

export interface IPlaylistPreviewHorizontalProps {
    playlist: any;
    className?: string;
    onClick?: MouseEventHandler;
}

export default function(props: IPlaylistPreviewHorizontalProps) {
    return (
        <div
            className={`${props.className}`}

            onClick={(event) => props.onClick?.(event)}
        >
            {props.playlist.title}
        </div>
    );
}