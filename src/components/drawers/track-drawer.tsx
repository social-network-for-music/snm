import { 
    useState,

    useEffect
} from "react";

import { toast } from "react-toastify";

import * as icons from "react-icons/fa6";

import * as _playlists from "@/api/playlists.api";

import { 
    ConfigProvider,
    
    Drawer
} from "antd/lib";

import type IPlaylistPreview from "@/types/playlist-preview";
import PlaylistPreviewHorizontal from "../playlists/playlist-preview-horizontal";

const FaXmark = <icons.FaXmark 
    className="text-[#C1C1C1] hover:text-white active:text-white"

    size={25}
/>;

export interface ITrackDrawer {
    track: string;

    open: boolean;
    setOpen: (value: boolean) => void;
    onClose?: () => void;
}

export default function TrackDrawer(props: ITrackDrawer) {
    const { track, open, setOpen } = props;

    const [playlists, setPlaylists] = useState<IPlaylistPreview[]>([]);

    useEffect(() => {
        _playlists.index("owner")
            .then(({ data }) => setPlaylists(data))
            .catch((_) => {/* ignore */});
    }, []);

    function add(playlist: IPlaylistPreview): void {
        _playlists.add(playlist._id, track)
            .then((_) => {
                toast.success("The track has been added to your playlist!");

                setOpen(false);
            })
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    motion: false
                }
            }}
        >
            <Drawer
                title="Add to playlist"

                placement="bottom"
                closable={true}
                open={open}

                getContainer={false}

                closeIcon={FaXmark}

                onClose={(_) => props.onClose?.()}
            >
                { playlists.map((playlist, i) => (
                    <PlaylistPreviewHorizontal
                        playlist={playlist}
                        className="mb-3.5"
                        key={i}

                        onClick={(_) => add(playlist)}
                    />
                ))}
            </Drawer>
        </ConfigProvider>
    );
}