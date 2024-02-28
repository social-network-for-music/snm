import { useState } from "react";

import { toast } from "react-toastify";

import { Modal } from "antd/lib";

import { AxiosError } from "axios";

import * as icons from "react-icons/fa6";

import * as _playlists from "@/api/playlists.api";

import Input from "@/components/utilities/input";

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

    const [open, setOpen] = useState<boolean>(false);

    const [tag, setTag] = useState<string>("");

    function add(tag: string): void {
        const tags = [ ...playlist.tags, tag ];

        _playlists.patch(playlist._id, { tags })
            .then((_) => {
                props.onChange?.(tags);
                
                setOpen(false);

                setTag("");
            })
            .catch((error: AxiosError) => {
                if (error.response?.status == 400)
                    toast.error("Tags must be alpha-numeric (and \
                        between 3 and 18 characters long).");
                else
                    toast.error("Generic error, try again later...");
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
                <div className="text-spotify-white">
                    <h1 className="text-lg font-semibold">
                        Add tag <icons.FaTag className="inline -mt-1 ml-0.5"/>
                    </h1>

                    <Input
                        icon={icons.FaTag}
                        className="text-nowrap mt-2 py-2"
                        placeholder="Your new tag (e.g. good vibes)"

                        value={tag}

                        onChange={(value) => setTag(value)}
                    />
                </div>

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
                        className="text-black text-base py-1.5 px-3.5 rounded-full
                            font-semibold bg-spotify-green hover:bg-spotify-darkgreen
                            active:bg-spotify-darkgreen leading-tight"

                        disabled={!tag}

                        onClick={(_) => add(tag!.trim().toLowerCase())}
                    >
                        Add <icons.FaPlus className="inline -mt-1"/>
                    </button>
                </div>
            </Modal>
        </div>
    );
}
