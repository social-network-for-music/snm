import { PropsWithChildren } from "react";

export interface IMessageProps extends PropsWithChildren {
    description?: string;

    className?: string;
}

export default function Message(props: IMessageProps) {
    return (
        <div className={`${props.className} w-full h-full text-wrap text-center`}>
            <div className="text-white xs:text-sm sm:text-xl font-bold">
                { props.children }
            </div>

            { props.description && (
                <div className="text-[#C1C1C1] xs:text-xs sm:text-sm font-semibold xs:mt-1 sm:mt-2">
                    { props.description }
                </div>
            )}
        </div>
    );
}
