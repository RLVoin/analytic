import React from "react";
import "@/app/globals.css";
import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout'


const headerStyle = {
    textAlign: 'center',
    height: 'auto',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    color: '#292929',
    backgroundColor: '#fff',
};
const contentStyle = {
    textAlign: 'center',
    minHeight: '100vh',
    color: '#292929',
    maxWidth: '90%',
    width: '100%',
    maxHeight: '100vh'
};
const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    fontFamily: 'Hoves'
};



export default function ShopLayout({children}) {

    return (
        <Layout className="mx-auto" style={layoutStyle}>
            <Content className="flex justify-center items-center mx-auto" style={contentStyle}>
                {children}
            </Content>
        </Layout>

    );
}