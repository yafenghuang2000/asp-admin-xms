import { useRef, useState } from 'react';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Tabs, message, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '@/utils/cookies';
import { loginData, backgroundImageUrl, backgroundVideoUrl } from './data';
import './index.scss';

type LoginType = 'phone' | 'account';

const Page = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const formRef = useRef(null);
  const { token } = theme.useToken();

  console.log(formRef, 'asdjnajsndjabsdhbag');
  const onFinish = (value: { mobile: string; captcha: string }) => {
    setCookie({
      key: 'username',
      value: `admin-${value.mobile}`,
      options: { expires: 7 * 24 * 60 * 60 },
    });
    navigate('/');
    message.success('登录成功');
  };

  return (
    <div className='xms-login-page'>
      <LoginFormPage
        initialValues={{
          mobile: '15512341234', // 默认用户名
          captcha: '123456',
        }}
        formRef={formRef}
        onFinish={onFinish}
        backgroundImageUrl={backgroundImageUrl}
        logo={''}
        backgroundVideoUrl={backgroundVideoUrl}
        title={<div className='xms-login-page-title'>XXXXXXXXXX管理系统</div>}
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.3)',
          backdropFilter: 'blur(4px)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          right: 0,
          bottom: 0,
          padding: '20px',
          width: 'fit-content',
          height: 'fit-content',
        }}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          items={loginData}
        />

        {loginType === 'account' && (
          <>
            <ProFormText
              name='username'
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className='prefixIcon'
                  />
                ),
              }}
              placeholder='请输入用户名:'
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name='password'
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className='prefixIcon'
                  />
                ),
              }}
              placeholder='请输入密码'
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className='prefixIcon'
                  />
                ),
              }}
              name='mobile'
              placeholder='请输入手机号'
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className='prefixIcon'
                  />
                ),
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder='请输入验证码'
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name='captcha'
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name='autoLogin' className='xms-login-page-checkbox'>
            自动登录
          </ProFormCheckbox>
          <Button type='primary' className='xms-login-page-password'>
            忘记密码
          </Button>
        </div>
      </LoginFormPage>
    </div>
  );
};

const Login = (): JSX.Element => (
  <ProConfigProvider>
    <Page />
  </ProConfigProvider>
);

export default Login;
