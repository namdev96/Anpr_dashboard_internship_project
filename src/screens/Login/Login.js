import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Icon,
  message
} from "antd";
import "./Log.css";
import axios from "axios";
import { MailOutlined } from "@ant-design/icons";

class LoginForm extends React.Component {
  state = {
    validator: "",
    input: "",
    error: "",
    email: "",
    password: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    console.log("email", email);
    console.log("pass", password);
    if(email && password === ''){

      message.info('Please enter your password!')
     
    }
    else if(password && email ===''){

      message.info('Please enter your email!')
  
      
    }
    else if( email === '' && password === ''){
    this.setState({
      email:''
    })
    this.setState({
     password:''
    })
      message.info('Please provide both email and password!')

    }
    
    else{
    const form_data = new URLSearchParams();
    form_data.append("email", email);
    form_data.append("password", password);
    axios
      .post("http://13.235.160.249:8000/v1/api/admin_login/", form_data, {
        headers: {
          'key': "14427sduj7833nf33d3i3icca0ac1aaf799a84a6aa048aw1a34qwxjd568dn4u"
        }
      })
      .then(response => {
        console.log(response);
        console.log(response.data.status);
         if (response.data.status === 201) {
          window.location.href = "#/dashboard/license";
          sessionStorage.setItem('key','1')
          sessionStorage.setItem("lgnSession", "true");
 
          message.success('Successfully logged in')
        }
        else{
          message.info('Email or Password is not valid!')
        }
 })
    };
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
     
    });
  };

  btnClick = event => {
    const keycode = event.keyCode || event.which;
    console.log("event", keycode);
    const keyValue = String.fromCharCode(keycode);

    if (keycode > 58) event.preventDefault();
  };

  handleChange1 = e => {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  };
  handleChange2 = e => {
    e.preventDefault();
    this.setState({
      password: e.target.value
    });
  };
  componentDidMount() {
    document.title = "Login";
    
  }
  form = () => Form.useForm();
  onFinish = values => {
    console.log("Received values of form: ", values);
  };
  render() {
    
    const { getFieldDecorator } = this.props.form;
    const validateMessages = {
      required: "This field is required!",
      types: {
        email: "Not a validate email!"
      }
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 8 },
        lg: { span: 20 }
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 16 },
        lg: { span: 20, offset: 2 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 10,
          offset: 3
        },
        sm: {
          span: 16,
          offset: 10
        },
        lg: {
          span: 22,
          offset: 4
        }
      }
    };
   if(sessionStorage.getItem('lgnSession') === 'true'){
     sessionStorage.clear();
     window.location.href = '#/'
   }
    return (

      <div
        style={{
          backgroundImage:
            "linear-gradient(to right bottom, #007cdf, #00a0ee, #00c0ec, #00dce0, #80f5d4)",
          height: "100vh"
        }}
      >
        <Row>
          <Col
            lg={{ span: 5, offset: 9 }}
            xs={{ span: 17, offset: 3 }}
            style={{ marginTop: "23vh" }}
          >
            <Form
              {...formItemLayout}
              onSubmit={this.handleSubmit}
              form={this.form}
              onFinish={this.onFinish}
              style={{
                height: "350px",
                width: "100%",
                background: "white",
                boxShadow: "1px 1px 2px 2px #5786A3",
                borderRadius: 10
              }}
              scrollToFirstError
              rules={[{ required: true }]}
            >
              <Col
                lg={{ span: 20, offset: 6 }}
                xs={{ span: 20, offset: 6 }}
                style={{ marginTop: 10 }}
              >
                <img
                  src={process.env.PUBLIC_URL + "./images/i.png"}
                  style={{ height: "70px", width: "50%" }}
                />
              </Col>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ]
                })(
                  <Col xs={{ span: 22, offset: 1 }}>
                    <Input
                      placeholder="Email"
                      onChange={this.handleChange1}
                      style={{ textAlign: "center" }}
                      prefix={<MailOutlined style={{ color: "#008CBA" }} />}
                    />
                  </Col>
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      validator: this.state.validator
                    }
                  ]
                })(
                  <Col xs={{ span: 18, offset: 1 }}>
                    <Input.Password
                      onChange={this.handleChange2}
                      style={{
                        borderRadius: 20,
                        width: "120%",
                        textAlign: "center"
                      }}
                      placeholder="Password"
                      prefix={<Icon type="key" style={{ color: "#008CBA" }} />}
                    />
                  </Col>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginTop: 20,
                    backgroundColor: "#008CBA",
                    borderColor: "rgb(31, 206, 208)",
                    fontFamily: "josfin Sans",
                    fontSize: "20px",
                    fontWeight: "bold",
                    width: "70%",
                    height: "40px",
                    borderRadius: 28,
                    boxShadow: "0px 0px 2px 2px Lightgray"
                  }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
const Login = Form.create({ name: "login" })(LoginForm);
export default Login;
