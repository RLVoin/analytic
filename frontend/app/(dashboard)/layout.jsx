"use client"

import {ConfigProvider, Layout, Menu} from 'antd';
import {AreaChartOutlined, HomeOutlined, TableOutlined} from '@ant-design/icons';
import {Content, Header} from "antd/es/layout/layout";
import axios from "axios";

const items = [
    {
        key: '/',
        icon: <HomeOutlined/>,
        label: 'Главная',
    },
    {
        key: '/dashboard',
        icon: <AreaChartOutlined/>,
        label: <a href="/charts">Аналитика</a>,
    },
    {
        key: '/table',
        icon: <TableOutlined/>,
        label: <a href="/table">Таблица</a>,
    }
];

export default function DashBoardLayout({children}) {

    axios.defaults.headers.common = {
        'ngrok-skip-browser-warning': 1
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        colorBgBase: '#001529',
                        darkItemBg: '#363c4d',
                    }
                }
            }}>
            {/*<Layout style={{minHeight: '100vh'}}>*/}
                {/*<Sider*/}
                {/*    breakpoint="lg"*/}
                {/*    collapsedWidth="0"*/}
                {/*    style={{backgroundColor: '#363c4d'}}*/}
                {/*>*/}
                {/*    <div className="demo-logo-vertical w-[100%] h-16"/>*/}
                {/*    <Menu*/}
                {/*        style={{*/}
                {/*            width: '100%',*/}
                {/*            fontWeight: 500,*/}
                {/*        }}*/}
                {/*        theme="dark"*/}
                {/*        defaultOpenKeys={['sub1']}*/}
                {/*        mode="inline"*/}
                {/*        items={items}*/}
                {/*    />*/}
                {/*</Sider>*/}
                <Layout style={{backgroundColor: '#e6eaf2', minWidth: '100%'}}>
                    <Header
                        style={{
                            padding: 0,
                            fontWeight: 500,
                            backgroundColor: '#f0f2f7',
                            minWidth: '100%'
                        }}
                    >
                        <Menu
                            style={{
                                width: '100%',
                                paddingLeft: '30px',
                                fontWeight: 500,
                            }}
                            theme="dark"
                            defaultOpenKeys={['sub1']}
                            mode="horizontal"
                            items={items}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 40px 0',
                            minHeight: '100vh',
                    }}>
                        {children}
                    </Content>
                </Layout>
            {/*</Layout>*/}
        </ConfigProvider>
    )
}
