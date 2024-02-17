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
                        siderBg: "#121212"
                    }
                }
            }}
        >
            <Layout className="min-h-dvh">
                <Layout.Sider
                    className="xs:block sm:hidden"
                    collapsed={collapsed}
                    width={300}
                    collapsedWidth={0}
                    trigger={null}

                    collapsible
                >
                    <Menu />
                </Layout.Sider>

                <Layout.Sider
                    className="xs:hidden sm:block"

                    width={275}
                >   
                    <Menu />
                </Layout.Sider>

                <Layout className="bg-spotify-black text-nowrap overflow-x-hidden">
                    <button 
                        className="xs:block sm:hidden fixed m-3 py-2 px-2 rounded
                            bg-spotify-lightgray active:bg-spotify-gray"

                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <icons.FaBars size={25}/>
                    </button>

                    <Layout.Content className="xs:mx-0 sm:mx-5 xs:my-0 sm:my-5">
                        <div className="px-7 py-5 h-full sm:rounded-md bg-spotify-darkgray">
                            {props.children}
                        </div>
                    </Layout.Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
