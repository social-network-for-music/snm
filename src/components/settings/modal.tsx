import { 
    MouseEventHandler,
    useEffect,
    useState 
} from "react";

import { 
    SubmitHandler, 
    
    useForm 
} from "react-hook-form";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { Modal } from "antd/lib";

import * as icons from "react-icons/fa6";

import * as _users from "@/api/users.api";

import Artists from "@/components/settings/utilities/artists";

import Genres from "@/components/settings/utilities/genres";

import type IUser from "@/types/user";

import type { IPasswordData } from "@/api/users.api";

const FaXmark = <icons.FaXmark 
    className="text-[#C1C1C1] hover:text-white active:text-white"

    size={25}
/>;

export interface ISettingsProps {
    open: boolean;

    onCancel?: MouseEventHandler;
}

export default function Settings(props: ISettingsProps) {
    const { open } = props;

    const router = useRouter();

    const { 
        reset,
        register,
        handleSubmit
    } = useForm<IPasswordData>();

    const [user, setUser] = useState<IUser>();
    const [username, setUsername] = useState<string>();
    const [visible, setVisible] = useState<boolean>(false);

    const [delModalOpen, setDelModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            get();

            reset();
        }
    }, [open]);

    useEffect(() => {
        if (user)
            setUsername(user.username);
    }, [user]);

    function get(): void {
        _users.get()
            .then(({ data }) => setUser(data))
            .catch((_) => {/* ignore */});
    }

    function del(): void {
        _users.del()
            .then((_) => {
                toast.success("Your account has been \
                    successfully deleted!");

                localStorage.removeItem("token");

                router.push("/");
            });
    }

    function patch(): void {
        _users.patch({ username })
            .then((_) => {
                toast.success("Your account's username has \
                    been successfully updated!");
            })
            .catch((error: any) => {
                toast.error(error.response?.data.error ??
					"Generic error, try again later...");
            });
    }

    const onSubmit: SubmitHandler<IPasswordData> = (data) => {
        _users.password(data)
            .then((_) => {
                toast.success("Your password has been \
                    successfully updated!");

                reset();
            })
            .catch((error: any) => {
				toast.error(error.response?.data.error ??
					"Generic error, try again later...");
			});
    }

    return (
        <Modal
            open={open}
            closeIcon={FaXmark}
            footer={null}

            width={550}

            onCancel={(e) => props.onCancel?.(e)}
        >
            { user && 
                <div className="text-spotify-white">
                    <div className="text-lg font-semibold">
                        Edit profile <icons.FaGear className="inline -mt-1 ml-0.5"/>
                    </div>

                    <div className="mt-3">
                        <label className="text-base">
                            <icons.FaUser className="inline -mt-1 mr-1"/> Username
                        </label>

                        <input
                            type="text"
                            placeholder="gordon.freeman"
                            className="w-full bg-spotify-gray outline-none mt-2
                                hover:ring-white hover:ring-2 rounded-full px-3.5 py-2
                                text-base text-white placeholder:text-spotify-lightergray"

                            value={username}

                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <div className="w-full mt-3.5 text-right">
                            <button
                                className="text-black text-base py-1.5 px-3.5 rounded-full
                                    font-semibold bg-spotify-green hover:bg-spotify-darkgreen
                                    active:bg-spotify-darkgreen leading-tight"

                                onClick={(_) => patch()}
                            >
                                Update <icons.FaPen className="inline -mt-1 "/>
                            </button>
                        </div>
                    </div>

                    <hr className="mt-5 h-px bg-spotify-white bg-opacity-25 border-0" />

                    <div className="mt-5 overflow-x-scroll">
                        <label className="text-base">
                            <icons.FaHeadphonesSimple className="inline -mt-1 mr-1"/> Favorite artists
                        </label>

                        <Artists
                            user={user}
                            className="text-lg mt-2.5 pb-2.5"
                            onChange={(_) => get()}
                        />
                    </div>

                    <div className="mt-5 overflow-x-scroll">
                        <label className="text-base">
                            <icons.FaMusic className="inline -mt-1 mr-1"/> Favorite genres
                        </label>

                        <Genres
                            user={user}
                            className="text-lg mt-2.5 pb-2.5"
                            onChange={(_) => get()}
                        />
                    </div>

                    <hr className="mt-5 h-px bg-spotify-white bg-opacity-25 border-0" />

                    <form 
                        className="mt-5"
                        
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div>
                            <label className="text-base">
                                <icons.FaKey className="inline -mt-1 mr-1"/> Old password
                            </label>

                            <div
                                className="w-full px-3.5 py-2 mt-2 bg-spotify-gray
                                    outline-none hover:ring-white hover:ring-2 
                                    rounded-full"
                            >
                                <input
                                    type={visible ? "text" : "password"}
                                    placeholder="••••••••••••••••"
                                    className="w-[90%] text-white text-lg bg-spotify-gray 
                                        placeholder:text-spotify-lightergray outline-none"

                                    {...register("oldPassword")}
                                />

                                <div 
                                    className="float-right text-xl cursor-pointer
                                        text-[#C1C1C1] hover:text-white active:text-white"

                                    onClick={(_) => setVisible(!visible)}
                                >
                                    { visible ?
                                        <icons.FaEye className="inline -mt-1 mr-1"/> :
                                        <icons.FaEyeSlash className="inline -mt-1 mr-1"/>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="text-base">
                                <icons.FaKey className="inline -mt-1 mr-1"/> Password
                            </label>

                            <div
                                className="w-full px-3.5 py-2 mt-2 bg-spotify-gray
                                    outline-none hover:ring-white hover:ring-2 
                                    rounded-full"
                            >
                                <input
                                    type={visible ? "text" : "password"}
                                    placeholder="••••••••••••••••"
                                    className="w-[90%] text-white text-lg bg-spotify-gray 
                                        placeholder:text-spotify-lightergray outline-none"

                                    {...register("password")}
                                />

                                <div 
                                    className="float-right text-xl cursor-pointer
                                        text-[#C1C1C1] hover:text-white active:text-white"

                                    onClick={(_) => setVisible(!visible)}
                                >
                                    { visible ?
                                        <icons.FaEye className="inline -mt-1 mr-1"/> :
                                        <icons.FaEyeSlash className="inline -mt-1 mr-1"/>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-3.5 text-right">
                            <button
                                type="submit"

                                className="text-black text-base py-1.5 px-3.5 rounded-full
                                    font-semibold bg-spotify-green hover:bg-spotify-darkgreen
                                    active:bg-spotify-darkgreen leading-tight"
                            >
                                Change password <icons.FaLock className="inline -mt-1 "/>
                            </button>
                        </div>
                    </form>

                    <hr className="mt-5 h-px bg-spotify-white bg-opacity-25 border-0" />

                    <div className="w-full mt-5">
                        <button
                            className="w-full text-white text-lg py-1.5 px-3.5 rounded-full
                                font-semibold bg-[#F60002] hover:bg-[#840807] active:bg-[#840807]"
                        
                            onClick={(_) => setDelModalOpen(true)}
                        >
                            Delete account <icons.FaTriangleExclamation className="inline -mt-1 "/>
                        </button>
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
                                Do you really want to delete your account?
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

                                onClick={(_) => del()}
                            >
                                Delete <icons.FaTrash className="inline -mt-1 "/>
                            </button>
                        </div>
                    </Modal>
                </div>
            }
        </Modal>
    )
}