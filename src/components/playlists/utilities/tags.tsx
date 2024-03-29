import { 
    useEffect,
    
    useState
} from "react";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { Modal } from "antd/lib";

import * as icons from "react-icons/fa6";

import * as _playlists from "@/api/playlists.api";

import type IPlaylist from "@/types/playlist";

const FaXmark = <icons.FaXmark 
    className="text-[#C1C1C1] hover:text-white active:text-white"

    size={25}
/>;

export interface ITagsProps {
    playlist: IPlaylist;

    owner?: boolean;
    className?: string;
    onChange?: (tags: string[]) => void;
}

export default function Tags(props: ITagsProps) {
    const { 
        playlist, 
        
        owner 
    } = props;

    const { 
        reset,
        watch,
        register,

        getValues
    } = useForm<{ tag: string }>();

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (open)
            reset();
    }, [open]);

    function add(tag: string): void {
        const tags = [ ...playlist.tags, tag ];

        _playlists.patch(playlist._id, { tags })
            .then((_) => {
                props.onChange?.(tags);
                
                setOpen(false);
            })
            .catch((error: any) => {
                toast.error(error.response?.data.error ??
                    "Generic error, try again later...");
            });
    }

    function remove(index: number): void {
        const tags = [ ...playlist.tags ];

        tags.splice(index, 1);

        _playlists.patch(playlist._id, { tags })
            .then((_) => props.onChange?.(tags))
            .catch((_) => {/* ignore */});
    }

    return (
        <div className={`${props.className} overflow-x-scroll`}>
            { playlist.tags.map((tag, i) => (
                <div 
                    key={i}

                    className="inline mr-2.5 px-3 bg-spotify-lightgray text-spotify-white rounded-full"
                >
                    { tag } { owner && 
                        <span 
                            className="text-sm text-[#C1C1C1] hover:text-white active:text-white cursor-pointer"

                            onClick={(_) => remove(i)}
                        >
                            <icons.FaTrash className="inline -mt-1" />
                        </span> 
                    }
                </div>
            ))}

            { owner && (
                <div 
                    className="inline mr-2.5 text-[#C1C1C1] hover:text-white active:text-white rounded-full cursor-pointer"
                
                    onClick={(_) => setOpen(true)}
                >
                    { <icons.FaPlus className="inline -mt-1" /> }
                </div>
            )}

            <Modal
                open={open}    
                closeIcon={FaXmark}
                footer={null}

                width={400}

                onCancel={(_) => setOpen(false)}
            >
                <form className="text-spotify-white">
                    <h1 className="text-lg font-semibold">
                        Add tag <icons.FaTag className="inline -mt-1 ml-0.5"/>
                    </h1>

                    <input
                        type="text"
                        placeholder="Your new tag (e.g. good vibes)"
                        className="w-full bg-spotify-gray outline-none mt-2
                            hover:ring-white hover:ring-2 rounded-full px-3.5 py-2
                            text-base text-white placeholder:text-spotify-lightergray
                            peer"

                        {...register("tag")}
                    />
                </form>

                <div className="w-full mt-3 text-right">
                    <button
                        className="text-black text-base py-1.5 px-3.5 rounded-full
                            font-semibold bg-spotify-green hover:bg-spotify-darkgreen
                            active:bg-spotify-darkgreen leading-tight mr-3"

                        onClick={(_) => setOpen(false)}
                    >
                        Cancel
                    </button>

                    <button
                        className="text-black text-base py-1.5 px-3.5 rounded-full font-semibold 
                            bg-spotify-green hover:bg-spotify-darkgreen active:bg-spotify-darkgreen 
                            disabled:bg-opacity-65 disabled:hover:bg-opacity-65 disabled:active:bg-opacity-65 
                            disabled:hover:bg-spotify-green disabled:active:bg-spotify-green leading-tight"

                        disabled={!watch("tag")}

                        onClick={(_) => add(getValues("tag").trim().toLowerCase())}
                    >
                        Add <icons.FaPlus className="inline -mt-1"/>
                    </button>
                </div>
            </Modal>
        </div>
    );
}
