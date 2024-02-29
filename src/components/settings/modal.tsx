import { 
    MouseEventHandler,
    useEffect,
    useState 
} from "react";

import { Modal } from "antd/lib";

import * as icons from "react-icons/fa6";

import * as _users from "@/api/users.api";

import Artists from "@/components/settings/utilities/artists";

import Genres from "@/components/settings/utilities/genres";

import type IUser from "@/types/user";

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

    const [user, setUser] = useState<IUser>();

    const [username, setUsername] = useState<string>();

    useEffect(() => {
        if (open)
            get();
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
                            >
                                Update <icons.FaPen className="inline -mt-1 "/>
                            </button>
                        </div>
                    </div>

                    <hr className="mt-3.5 h-px bg-spotify-white bg-opacity-25 border-0" />

                    <div className="mt-3 overflow-x-scroll">
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
                </div>
            }
        </Modal>
    )
}