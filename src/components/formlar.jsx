import './form.css';
import 'antd/dist/antd.min.css';
import { Form, Button, Input } from 'antd';
import resim1 from '../components/acibadem.png';
import { useState } from 'react';
import axios from 'axios';

import { useNavigate } from "react-router-dom";


function Forms(props) {
const navigate = useNavigate();
  const [userName, setuserName] = useState('user1234');
  const [password, setpassword] = useState('1234');
  const handleUsername = (value) => {
    setuserName(value);
  };
  const handlePassword = (value) => {
    setpassword(value);
  };
  const sendRequest = (path) => {
    axios.post(
      `http://localhost:8080/auth/${path}`,
      { userName: userName, password: password },
      {
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': 'JWT fefege...'},
        },
      },
    ).then((result)=>{
      navigate("/hasta");
      localStorage.setItem("tokenKey",result.data.accessToken);
      localStorage.setItem("refreshKey",result.data.refreshToken);
      localStorage.setItem("currentUser",result.data.userId);
      localStorage.setItem("userName",userName)
    }).catch((error)=>{
      console.log("error",error)
    })
  };
  const handleButton = (path) => {
    sendRequest(path);};
  return (
    <div className="Forms">
      <header className="Forms-header"></header>
      <body>
        <div className="formmm">
          <Form
            autoComplete="off"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 5 }}
            onFinish={sendRequest}
            onFinishFailed={(error) => {
              console.log({ error });
            }}
          >
            <img src={resim1} className="resim2" alt='logo'></img>
            <Form.Item
              className="Tcno"
              name="userName"
              label="Kullanıcı Adı:"
              rules={[
                {
                  required: true,
                  message: 'Bu Alanı Boş Bırakmayınız.',
                },
                { whitespace: true },
              ]}
              hasFeedback
            >
              <Input
                value={userName}
                onChange={(i) => handleUsername(i.target.value)}
                name="userName"
                id="userName"
                placeholder="Lütfen Kullanıcı Adınızı Giriniz"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Şifre"
              rules={[
                {
                  required: true,
                  message: 'Bu Alanı Boş Bırakmayınız.',
                },
                { whitespace: true },
              ]}
              hasFeedback
            >
              <Input.Password
                value={password}
                onChange={(i) => handlePassword(i.target.value)}
                placeholder="Lütfen Şifrenizi Giriniz"
                id="password"
                name="password"
              />
            </Form.Item>
            <br></br>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="button"
                onClick={() => handleButton('login')}
                className="submit"
              >
                Giriş Yap
              </Button>
              
            </Form.Item>
          </Form>
        
        </div>
      </body>
    </div>
    
  );
}

export default Forms;
