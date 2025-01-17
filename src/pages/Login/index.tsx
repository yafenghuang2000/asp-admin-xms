import { useState } from 'react';
import type { CSSProperties } from 'react';
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';
import { loginData } from './data';
import './index.scss';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const { token } = theme.useToken();
  return (
    <div className='xms-login-page'>
      <LoginFormPage
        backgroundImageUrl='https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp'
        logo='https://github.githubassets.com/favicons/favicon.png'
        backgroundVideoUrl='https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr'
        title={<div className='xms-login-page-title'>ASP-XMS售后系统</div>}
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
        // subTitle={<div className='xms-login-page-subTitle'></div>}
        // activityConfig={{
        //   style: {
        //     boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
        //     color: token.colorTextHeading,
        //     borderRadius: 8,
        //     backgroundColor: 'rgba(255,255,255,0.25)',
        //     backdropFilter: 'blur(4px)',
        //   },
        //   title: '活动标题，可配置图片',
        //   subTitle: '活动介绍说明文字',
        //   action: (
        //     <Button
        //       size='large'
        //       style={{
        //         borderRadius: 20,
        //         background: token.colorBgElevated,
        //         color: token.colorPrimary,
        //         width: 120,
        //       }}
        //     >
        //       去看看
        //     </Button>
        //   ),
        // }}
        actions={
          <div className='xms-login-page-actions'>
            <Divider plain>
              <span className='xms-login-page-actions-spanlogin'>其他登录方式</span>
            </Divider>
            <Space align='center' size={24}>
              <div className='xms-login-page-actions-icon'>
                <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
              </div>
              <div className='xms-login-page-actions-icon'>
                <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
              </div>
              <div className='xms-login-page-actions-icon'>
                <WeiboOutlined style={{ ...iconStyles, color: '#1890ff' }} />
              </div>
            </Space>
          </div>
        }
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
                  pattern: /^1\d{10}$/,
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
