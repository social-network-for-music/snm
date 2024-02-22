import { useEffect, useState } from "react";

import * as icons from "react-icons/fa6";

import * as _playlists from "@/api/playlists.api";

import type IPlaylist from "@/types/playlist";

export interface IPlaylistProps {
    id: string;
    className?: string;
    onClose?: () => void;
}

export default function Playlist(props: IPlaylistProps) {
    const { id } = props;

    const [playlist, setPlaylist] = useState<IPlaylist>();

    useEffect(() => {
        _playlists.get(id)
            .then(({ data }) => setPlaylist(data))
            .catch((_) => {/* ignore */});
    }, [props.id]);

    return (
        <div className={`${props.className} text-white`}>
            <div className="h-auto">
                <button 
                    className="m-3 p-2 text-[#C1C1C1] hover:text-white active:text-white"

                    onClick={() => props.onClose?.()}
                >
                    <icons.FaXmark size={25}/>
                </button>
            </div>

            <div>
                { playlist && (
                    <div>
                        { playlist.description }
                    </div>
                )}
            </div>
        </div>
    );
}
