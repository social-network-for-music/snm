import { 
    MouseEventHandler,

    useEffect
} from "react";

import { useForm } from "react-hook-form";

import { Modal } from "antd/lib";

import * as icons from "react-icons/fa6";

import * as _playlists from "@/api/playlists.api";

import type { IPostData } from "@/api/playlists.api";

const FaXmark = <icons.FaXmark 
    className="text-[#C1C1C1] hover:text-white active:text-white"

    size={25}
/>;

export interface ICreateProps {
    open: boolean;
    onCancel?: MouseEventHandler;
    onSubmit?: (data: IPostData) => void;
}

export default function Create(props: ICreateProps) {
    const { open } = props;

    const { 
        reset,
        
        watch,
        register,
        handleSubmit,
    } = useForm<IPostData>();

    useEffect(() => {
        if (open)
            reset();
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
                    Add playlist <icons.FaCompactDisc className="inline -mt-1 ml-0.5"/>
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

                <div className="mt-2.5">
                    <label className="inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox"
                            className="sr-only peer"
                            {...register("public")}
                        />

                        <div 
                            className="relative w-11 h-6 bg-spotify-gray rounded-full peer peer-focus:outline-none
                                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                                peer-checked:bg-spotify-darkgreen peer-checked:after:border-spotify-white 
                                after:absolute after:top-[2px] after:start-[2px] after:bg-spotify-white 
                                after:border-gray-300 after:border after:rounded-full after:h-5 
                                after:w-5 after:transition-all"
                        >
                            {/* Nothing to do. */}
                        </div>
                        
                        <span 
                            className="ml-2.5 text-base text-spotify-white select-none"
                        >
                            { watch("public") ?
                                <p>
                                    Public <icons.FaEarthAmericas className="inline -mt-1 ml-0.5"/>
                                </p> :
                                <p>
                                    Private <icons.FaLock className="inline -mt-1 ml-0.5"/>
                                </p>
                            }
                        </span>
                    </label>
                </div>

                <div className="w-full mt-0.5 text-right">
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
                        Create <icons.FaPlus className="inline -mt-1 ml-0.5"/>
                    </button>
                </div>
            </form>
        </Modal>
    );
}