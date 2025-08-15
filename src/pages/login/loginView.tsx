import { Form, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { userAPI } from '../../services/user';
import { useNavigate } from 'react-router';

export default function LoginView() {
    const [countdown, setCountdown] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        let timer: number;
        if (countdown > 0) {
            timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleGetCode = () => {
        const phone = form.getFieldValue('phone');
        const phoneReg = /^1[3-9]\d{9}$/;

        if (!phone || !phoneReg.test(phone)) {
            form.setFields([{ name: 'phone', errors: ['请输入有效手机号'] }]);
            return;
        }
        userAPI.getVerifyCode(phone).then((response) => {
            if (response.testCode !== "") {
                form.setFieldValue("code", response.testCode);
                message.success('验证码已发送');
                setCountdown(10);
            } else {
                message.error('验证码发送失败');
            }
        }).catch((e) => {
            message.error('验证码发送失败,' + e);
        });

    };

    const handleLogin = async () => {
        try {
            const values = await form.validateFields();
            const phone = values.phone;
            const code = values.code;

            setLoading(true);
            const user = await userAPI.login(phone, code); // 调用真实登录接口
            setLoading(false);
            message.success(`欢迎回来，${user.fullName || user.phone || '用户'}`);
            navigate("/admin")
            navigator
        } catch (error) {
            setLoading(false);
            message.error((error as Error)?.message ?? '登录失败');
        }
    };

    return (
        <div className='flex flex-col justify-center items-center bg-white w-[360px] shadow'>
            <h2 className="text-2xl font-semibold text-center mt-6">手机号登录</h2>
            <div className='w-[200px] h-[380px] flex justify-center items-center'>
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark={false}
                    className="space-y-4"
                >
                    <Form.Item
                        label="手机号"
                        name="phone"
                        rules={[
                            { required: true, message: '请输入手机号' },
                            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
                        ]}
                    >
                        <Input placeholder="请输入手机号" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="验证码"
                        name="code"
                        rules={[{ required: true, message: '请输入验证码' }]}
                    >
                        <Input
                            placeholder="请输入验证码"
                            size="large"
                            addonAfter={
                                <Button
                                    type="link"
                                    size="small"
                                    disabled={countdown > 0}
                                    onClick={handleGetCode}
                                    style={{ padding: 0, margin: 0 }}
                                >
                                    {countdown > 0 ? `${countdown}s` : '获取验证码'}
                                </Button>
                            }
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        size="large"
                        block
                        loading={loading}
                        onClick={handleLogin}
                        className="rounded-lg mt-6"
                    >
                        登录
                    </Button>
                </Form>
            </div>
        </div>
    )
}
