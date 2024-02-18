import { useEffect } from "react";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import { AxiosError } from "axios";

import * as auth from "@/api/auth.api";

import Layout from "@/components/layout";

export default function() {
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
        <Layout>
            <div className="grid grid-cols-12 gap-0">
                <div 
                    className="xs:col-span-12 xl:col-span-7 xs:px-0 sm:px-5 
                        xs:py-0 sm:py-5 xl:pl-5 xl:pr-2.5 min-h-dvh"
                >
                    <div 
                        className="w-full h-full rounded bg-spotify-darkgray"
                    >
                        
                    </div>
                </div>

                <div 
                    className="xs:hidden xs:col-span-0 xl:block xl:col-span-5
                        px-5 xs:py-5 xl:pl-2.5 xl:pr-5 min-h-dvh"
                >
                    <div 
                        className="w-full h-full rounded bg-spotify-darkgray"
                    >
                        
                    </div>
                </div>
            </div>
        </Layout>
    );
}
