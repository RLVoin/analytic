"use client"

import {Button, Form, Input} from "antd";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    axios.defaults.headers.common = {
        'ngrok-skip-browser-warning': 1
    }

    const onSubmit = async (value) => {
        const formData = new FormData()
        formData.append("username", value.username);
        formData.append("password", value.password);
        await axios.post(`${apiUrl}/auth/jwt/login`, formData).then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('Authorization', `Bearer ${response.data.access_token}`);
                    router.push('/charts');
                }

                // if (response.status === 204) {
                //     // router.push('/orders')
                // }

            }
        ).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div className="flex justify-center p-8 rounded-2xl bg-white">
            <Form
                layout="vertical"
                onFinish={onSubmit}
            >
                <Form.Item className="mb-2" name="username"
                           rules={[{
                               required: true,
                               message: "Введите логин"
                           }]}>
                    <Input placeholder="Логин"/>
                </Form.Item>
                <Form.Item name="password"
                           rules={[
                               {
                                   required: true,
                                   message: "Введите пароль"
                               }
                           ]}>
                    <Input.Password placeholder="Пароль"/>
                </Form.Item>
                <Form.Item>
                    <Button className="w-full" type="primary" htmlType="submit">
                        Авторизоваться
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}