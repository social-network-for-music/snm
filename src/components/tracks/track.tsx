import * as icons from "react-icons/fa6";

export interface ITrackProps {
    track: any;
    className?: string;
    onClose?: () => void;
}

export default function Track(props: ITrackProps) {
    const { track } = props;

    return (
        <div className={`${props.className} text-white`}>
            <div className="h-auto">
                <button 
                    className="m-3 p-2 text-[#C1C1C1] hover:text-white active:text-white"

                    onClick={() => props.onClose?.()}
                >
                    <icons.FaXmark size={25}/>
                </button>
            </div>

            <div>
                
            </div>
        </div>
    );
}