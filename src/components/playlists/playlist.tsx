import { 
    useEffect,
    
    useState 
} from "react";

import { toast } from "react-toastify";

import { Modal } from "antd/lib";

import * as icons from "react-icons/fa6";

import * as _playlists from "@/api/playlists.api";

import Tags from "@/components/playlists/utilities/tags";

import Thumbnail from "@/components/playlists/utilities/thumbnail";

import Track from "@/components/tracks/track";

import TrackPreviewHorizontal from "@/components/tracks/track-preview-horizontal";

import type IPlaylist from "@/types/playlist";

import type IUser from "@/types/user";

const FaXmark = <icons.FaXmark 
    className="text-[#C1C1C1] hover:text-white active:text-white"

    size={25}
/>;

export interface IPlaylistProps {
    id: string;

    user: IUser;

    className?: string;
    onChange?: (playlist: IPlaylist) => void;
    onClose?: () => void;
}

export default function Playlist(props: IPlaylistProps) {
    const { 
        id,

        user
    } = props;

    const [owner, setOwner] = useState<boolean>();
    const [playlist, setPlaylist] = useState<IPlaylist>();
    const [delModalOpen, setDelModalOpen] = useState<boolean>(false);

    const [track, setTrack] = useState<any>();

    useEffect(() => {
        if (playlist) {
            setOwner(user._id == playlist.owner._id)

            props.onChange?.(playlist);
        }
    }, [playlist]);

    useEffect(() => {
        get(id)
            .then(() => setTrack(undefined));
    }, [props.id]);

    function get(id: string): Promise<void> {
        return _playlists.get(id)
            .then(({ data }) => setPlaylist(data))
            .catch((_) => {/* ignore */});
    }

    function edit(playlist: IPlaylist): void {

    }

    function del(playlist: IPlaylist): void {
        _playlists.del(playlist._id)
            .then((_) => {
                toast.success("The playlist has been successfully deleted!");
                props.onChange?.(playlist);
                props.onClose?.();
            });
    }

    function heart(playlist: IPlaylist): void {
        const endpoint = 
            playlist.followers.includes(user._id) ?
                _playlists.unfollow : 
                _playlists.follow;

        endpoint(playlist._id)
            .then((_) => get(playlist._id))
            .catch((_) => {/* ignore */});
    }

    
    function remove(playlist: IPlaylist, id: string): void {
        _playlists.remove(playlist._id, id)
            .then((_) => get(playlist._id))
            .catch((_) => {/* ignore */});
    }

    return (
        <>
            { playlist && (
                <div className={props.className}>
                    { track && (
                        <Track 
                            track={track}
                            onAdd={(_) => props.onChange?.(playlist)}
                            onClose={() => setTrack(undefined)}
                        />
                    )}

                    { !track && (
                        <div className="relative text-white">
                            <div className="absolute w-full bg-spotify-darkgray bg-opacity-75 md:rounded-t-md z-[100]">
                                <button 
                                    className="m-2.5 p-2 text-[#C1C1C1] hover:text-white active:text-white"
        
                                    onClick={() => props.onClose?.()}
                                >
                                    <icons.FaXmark size={25}/>
                                </button>
        
                                { owner && 
                                    <div className="float-right mt-4 mr-4 text-lg text-spotify-white text-opacity-75 font-bold">
                                        <div 
                                            className="inline hover:text-spotify-white cursor-pointer mr-3.5"
        
                                            onClick={(_) => edit(playlist)}
                                        >
                                            Edit <icons.FaGear className="inline -mt-1 ml-0.5"/>
                                        </div>
        
                                        <div 
                                            className="inline hover:text-spotify-white cursor-pointer"
        
                                            onClick={(_) => setDelModalOpen(true)}
                                        >
                                            Delete <icons.FaTrash className="inline -mt-1 ml-0.5"/>
                                        </div>
                                    </div>
                                }
                            </div>
                    
                            <div className="pb-3">
                                <div className="w-full h-[45vh] relative">
                                    <Thumbnail 
                                        id={playlist._id}
                                        gradient={true}
                                        className="w-full h-full md:rounded-t-md"
                                    />
        
                                    <div
                                        className="absolute bottom-0 w-full px-5 pb-3 flex justify-between"
                                    >
                                        <div className="truncate">
                                            <div className="text-5xl text-spotify-white font-bold truncate">
                                                { playlist.title } { !playlist.public && <icons.FaLock className="inline -mt-4"/> }
                                            </div>
        
                                            <div className="text-xl text-[#C1C1C1] font-semibold mt-1 truncate">
                                                <span className="font-bold">{ playlist.owner.username }</span> { owner && <icons.FaCrown className="inline -mt-1 mx-0.5"/> } • { playlist.tracks.length } tracks, {
                                                    playlist.public ?
                                                        `${playlist.followers.length} followers` :
                                                        "private"
                                                }
                                            </div>
                                        </div>
        
                                        { !owner &&
                                            <div className="flex-none place-self-center">
                                                <button 
                                                    className="m-0 p-3 text-3xl text-black rounded-full
                                                        bg-spotify-green hover:bg-spotify-lightgreen 
                                                        active:bg-spotify-lightgreen"
        
                                                    onClick={(_) => heart(playlist)}
                                                > 
                                                    { playlist.followers.includes(user._id) ?
                                                        <icons.FaHeartCircleCheck/> :
                                                        <icons.FaHeart/>
                                                    }
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
        
                                <div className="px-5">
                                    { playlist.description &&
                                        <div className="text-base w-full text-wrap break-all">
                                            { playlist.description }
                                        </div>
                                    }
        
                                    { (owner || playlist.tags.length != 0) &&
                                        <Tags
                                            playlist={playlist}

                                            owner={owner}
                                            className="text-lg mt-3.5 pb-2.5 mb-3.5"
                                            onChange={(_) => get(playlist._id)}
                                        />
                                    }
        
                                    <div className="mt-3"> 
                                        { playlist.tracks.length == 0 &&
                                            <div className="w-full mt-5 text-center text-lg text-[#C1C1C1] text-opacity-50 font-semibold">
                                                No tracks found
                                            </div>
                                        }
        
                                        { playlist.tracks.map((track, i) => (
                                            <div
                                                className="flex justify-between"
                                            >
                                                <TrackPreviewHorizontal
                                                    key={i}
                                                    track={track}
                                                    className="mb-3 truncate"
        
                                                    onClick={(_) => setTrack(track)}
                                                />
        
                                                { owner &&
                                                    <div 
                                                        className="flex-none place-self-center pr-1 pl-5 -mt-3 text-lg text-spotify-white cursor-pointer"
        
                                                        onClick={(_) => remove(playlist, track.id)}
                                                    >
                                                        { FaXmark }
                                                    </div>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
        
                            <Modal
                                open={delModalOpen}    
                                closeIcon={FaXmark}
                                footer={null}
        
                                width={400}
        
                                onCancel={(_) => setDelModalOpen(false)}
                            >
                                <div className="text-spotify-white">
                                    <h1 className="text-lg font-semibold">
                                        Warning <icons.FaTriangleExclamation className="inline -mt-1 ml-0.5"/>
                                    </h1>
        
                                    <p className="text-sm mt-1">
                                        Do you really want to delete this playlist?
                                    </p>
                                </div>
        
                                <div className="w-full mt-3 text-right">
                                    <button
                                        className="text-black text-base py-1.5 px-3.5 rounded-full
                                            font-semibold bg-spotify-green hover:bg-spotify-darkgreen
                                            active:bg-spotify-darkgreen leading-tight mr-3"
        
                                        onClick={(_) => setDelModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
        
                                    <button
                                        className="text-black text-base py-1.5 px-3.5 rounded-full
                                            font-semibold bg-spotify-green hover:bg-spotify-darkgreen
                                            active:bg-spotify-darkgreen leading-tight"
        
                                        onClick={(_) => del(playlist)}
                                    >
                                        Delete <icons.FaTrash className="inline -mt-1 "/>
                                    </button>
                                </div>
                            </Modal>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
