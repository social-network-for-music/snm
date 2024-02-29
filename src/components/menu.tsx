import { 
    MouseEventHandler,
    PropsWithChildren,
    useState
} from "react";

import {
    usePathname,

    useRouter
} from "next/navigation";

import * as icons from "react-icons/fa6";

import Settings from "@/components/settings";

interface IItemProps extends PropsWithChildren {
    url?: string;

    onClick?: MouseEventHandler
}

function Item(props: IItemProps) {
    const pathname = usePathname();

    const router = useRouter();

    return (
        <div 
            className={`${pathname == props.url ? "text-white" : "text-[#B3B3B3] hover:text-white"} 
                font-semibold text-xl my-5 px-5 cursor-pointer select-none`}

            onClick={(event) => {
                props.onClick?.(event);

                if (props.url)
                    router.push(props.url);
            }}
        >
            { props.children }
        </div>
    )
}

export interface IMenuProps {
    onClose?: MouseEventHandler;
}

export default function Menu(props: IMenuProps) {
    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);

    function logout(): void {
        localStorage.removeItem("token");

        router.push("/");
    }

    return (
        <div className="relative w-full h-full text-nowrap">
            <div className="mb-10">
                <h1 className="text-6xl font-bold text-white -skew-y-3 bg-spotify-green pb-1 px-2">SNM</h1>

                <h3 className="text-xl font-bold text-white -skew-y-3 px-2">Social Network for Music</h3>
            </div>

            <div className="mb-10">
                <Item url="/explore/tracks">
                    <icons.FaMusic className="inline -mt-1 mr-4" size={30}/> Explore tracks
                </Item>

                <Item url="/explore/playlists">
                    <icons.FaRecordVinyl className="inline -mt-1 mr-4" size={30}/> Explore playlists
                </Item>

                <Item url="/playlists">
                    <icons.FaPodcast className="inline -mt-1 mr-4" size={30}/> My playlists
                </Item>
            </div>

            <div>
                <Item 
                    onClick={(e) => {
                        setOpen(true);

                        props.onClose?.(e);
                    }}
                >
                    <icons.FaWrench className="inline -mt-1 mr-4" size={30}/> Settings
                </Item>
            </div>

            <div className="absolute bottom-0.5 text-white">
                <Item onClick={logout}>
                    <icons.FaRightFromBracket className="inline -mt-1 mr-4" size={30}/> Logout
                </Item>
            </div>

            <Settings 
                open={open}
                
                onCancel={(_) => setOpen(false)}
            />
        </div>
    );
}
