import React, { 
    PropsWithChildren,
    useState,
    useEffect
} from "react";

import { 
    ConfigProvider, 

    Layout
} from "antd/lib";

import { toast } from "react-toastify";

import Head from "next/head";

import { useRouter } from "next/navigation";

import { AxiosError } from "axios";

import * as icons from "react-icons/fa";

import * as _auth from "@/api/auth.api";

import Menu from "./menu";

export interface ITemplateProps extends PropsWithChildren {
    auth?: boolean;

    title?: string;
}

export default function Template(props: ITemplateProps) {
    const { title } =  props;

    const router = useRouter();

    const [collapsed, setCollapsed] = useState<boolean>(true);

    useEffect(() => {
        if (props.auth)
            if (!localStorage.getItem("token"))
                router.push("/");
            else
                _auth.verify()
                    .catch((error: AxiosError) => {
                        if (error.response?.status == 401)
                            router.push(`/?timeout=1`);
                        else
                            toast.error("Generic error, try again later...");
                    });
    }, []);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        siderBg: "#191414"
                    }
                }
            }}
        >
            <Layout className="min-h-dvh">
                <Layout.Sider
                    className="xs:block md:hidden"
                    collapsed={collapsed}
                    width={300}
                    collapsedWidth={0}
                    trigger={null}

                    collapsible

                    style={{
                        position: "absolute", 
                        height: "100dvh",
                        zIndex: 10_000
                    }}
                >
                    <Menu 
                        onClose={(_) => setCollapsed(true)}
                    />
                </Layout.Sider>

                <Layout.Sider
                    className="xs:hidden md:block"

                    width={275}
                >   
                    <Menu />
                </Layout.Sider>

                <Layout className="bg-spotify-black text-nowrap overflow-x-hidden">
                    <button 
                        className="xs:block md:hidden absolute bottom-0 right-0 m-3 p-3 
                            rounded-full bg-spotify-gray hover:bg-spotify-lightgray 
                            active:bg-spotify-lightgray z-[10000]"

                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <icons.FaBars color="white" size={25}/>
                    </button>

                    <Layout.Content>
                        { title && (
                            <Head>
                                <title>{ title }</title>
                            </Head>
                        )}

                        {props.children}
                    </Layout.Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
