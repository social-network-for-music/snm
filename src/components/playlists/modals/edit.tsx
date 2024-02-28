import { 
    MouseEventHandler,

    useEffect
} from "react";

import { useForm } from "react-hook-form";

import { Modal } from "antd/lib";

import * as icons from "react-icons/fa6";

import * as _playlists from "@/api/playlists.api";

import type IPlaylist from "@/types/playlist";

import type { IPatchData } from "@/api/playlists.api";

const FaXmark = <icons.FaXmark 
    className="text-[#C1C1C1] hover:text-white active:text-white"

    size={25}
/>;

export interface IEditProps {
    playlist: IPlaylist;

    open: boolean;
    onCancel?: MouseEventHandler;
    onSubmit?: (data: IPatchData) => void;
}

export default function Edit(props: IEditProps) {
    const { 
        playlist,
        
        open 
    } = props;

    const { 
        register,
        handleSubmit,
        setValue
    } = useForm<IPatchData>();

    useEffect(() => {
        if (open) {
            setValue("title", playlist.title);

            setValue("description", playlist.description);
        }
    }, [open]);

    return (
        <Modal
            open={open}
            closeIcon={FaXmark}
            footer={null}

            width={550}
        
            onCancel={(e) => props.onCancel?.(e)}
        >
            <form 
                className="text-spotify-white" 
                
                onSubmit={handleSubmit((data) => props.onSubmit?.(data))}
            >
                <h1 className="text-lg font-semibold">
                    Edit playlist <icons.FaGears className="inline -mt-1 ml-0.5"/>
                </h1>

                <div className="mt-3">
					<label className="text-base">
						<icons.FaHeadphones className="inline -mt-1 mr-1"/> Title
					</label>

					<input
						type="text"
						placeholder="Give your playlist a nice title!"
						className="w-full mt-1.5 bg-spotify-gray outline-none 
                            hover:ring-white hover:ring-2 rounded-full px-3.5 py-2
                            text-base text-white placeholder:text-spotify-lightergray"

                        {...register("title")}
					/>
				</div>

                <div className="mt-3">
					<label className="text-base">
						<icons.FaComment className="inline -mt-1 mr-1"/> Description (optional)
					</label>

					<textarea
						placeholder="Tell us something about your playlist..."

						className="w-full mt-1.5 bg-spotify-gray outline-none 
                            hover:ring-white hover:ring-2 rounded-lg px-3.5 py-2
                            text-base text-white placeholder:text-spotify-lightergray
                            h-[100px] min-h-[40px] max-h-[250px]"

                        {...register("description")}
					/>
				</div>

                <div className="w-full mt-2 text-right">
                    <button
                        className="text-black text-base py-1.5 px-3.5 rounded-full
                            font-semibold bg-spotify-green hover:bg-spotify-darkgreen
                            active:bg-spotify-darkgreen leading-tight mr-3"

                        onClick={(e) => {
                            e.preventDefault();

                            props.onCancel?.(e);
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"

                        className="text-black text-base py-1.5 px-3.5 rounded-full
                            font-semibold bg-spotify-green hover:bg-spotify-darkgreen
                            active:bg-spotify-darkgreen leading-tight"
                    >
                        Update <icons.FaPen className="inline -mt-1 ml-0.5"/>
                    </button>
                </div>
            </form>
        </Modal>
    );
}