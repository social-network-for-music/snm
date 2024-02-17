import { useEffect } from "react";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import { AxiosError } from "axios";

import * as auth from "@/api/auth.api";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("token"))
            router.push("/");
        else
            auth.verify()
                .catch((error: AxiosError) => {
                    if (error.response?.status == 401)
                        router.push(`/?timeout=1`);
                    else
                        toast.error("Generic error, try again later...");
                });
    }, []);

    return (
        <b>Hello World!</b>
    );
}
