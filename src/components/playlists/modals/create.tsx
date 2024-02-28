import { MouseEventHandler } from "react";

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

    return (
        <Modal
            open={open}
            closeIcon={FaXmark}
            footer={null}

            width={550}
        
            onCancel={(e) => props.onCancel?.(e)}
        >
            
        </Modal>
    );
}