import { 
    useEffect,
    
    useState 
} from "react";

import { toast } from "react-toastify";

import { Modal } from "antd/lib";

import * as icons from "react-icons/fa6";

import * as _playlists from "@/api/playlists.api";

import Thumbnail from "@/components/utilities/thumbnail";

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
    onClose?: () => void;
    onChange?: (playlist: IPlaylist) => void;
}

export default function Playlist(props: IPlaylistProps) {
    const { 
        id,

        user
    } = props;

    const [owner, setOwner] = useState<boolean>();
    
    const [playlist, setPlaylist] = useState<IPlaylist>();

    const [delModalOpen, setDelModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (playlist)
            setOwner(user._id == playlist.owner._id)
    }, [playlist]);

    useEffect(() => {
        get(id);
    }, [props.id]);

    function get(id: string): void {
        _playlists.get(id)
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
            .then((_) => {
                get(id);

                props.onChange?.(playlist);
            });
    }

    return (
        <div className={props.className}>
            { playlist &&
                <div className="relative text-white h-full">
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
            
                    <div>
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

                            { playlist.tags.length != 0 &&
                                <div className="text-lg mt-3.5 pb-2.5 overflow-x-scroll mb-3.5">
                                    { playlist.tags.map((tag, i) => (
                                        <div 
                                            className="inline mr-2.5 px-3 bg-spotify-lightgray text-spotify-white rounded-full"
                                        
                                            key={i}
                                        >
                                            { tag }
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>

                    <Modal
                        open={delModalOpen}    
                        closeIcon={ FaXmark }
                        footer={null}

                        width={400}

                        onCancel={(_) => setDelModalOpen(false)}
                    >
                        <div className="text-spotify-white">
                            <h1 className="text-lg font-semibold">
                                Warning <icons.FaTriangleExclamation className="inline -mt-1 "/>
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
            }
        </div>
    );
}
