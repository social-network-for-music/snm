import { MouseEventHandler } from "react";

import { Modal } from "antd/lib";

import * as icons from "react-icons/fa6";

import * as _users from "@/api/users.api";

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

    return (
        <Modal
            open={open}
            closeIcon={FaXmark}
            footer={null}

            width={550}

            onCancel={(e) => props.onCancel?.(e)}
        >
            <div className="text-spotify-white">
                <div className="text-lg font-semibold">
                    Edit profile <icons.FaGear className="inline -mt-1 ml-0.5"/>
                </div>
            </div>
        </Modal>
    )
}