import React, { 
    PropsWithChildren,

    useState 
} from "react";

import { 
    ConfigProvider, 

    Layout
} from "antd/lib";

import * as icons from "react-icons/fa";

import Menu from "./menu";

export default function(props: PropsWithChildren) {
    const [collapsed, setCollapsed] = useState<boolean>(true);

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
                        
                        height: "100dvh"
                    }}
                >
                    <Menu />
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
                            active:bg-spotify-lightgray"

                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <icons.FaBars color="white" size={25}/>
                    </button>

                    <Layout.Content>
                        {props.children}
                    </Layout.Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
