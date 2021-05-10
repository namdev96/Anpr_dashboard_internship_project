import React from "react";
import { Form, Input, Button, Row, Col, Select, Tag, DatePicker, message} from "antd";
import axios from "axios";
import dateFormat from "dateformat";
import ReactDOM from 'react-dom';
const layout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 14,
    offset: 3
  }
};
const Option = Select.Option;

const validateMessages = {};
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Registration extends React.Component {
  state = {
    features: [],
    violations: [],
    feature_ids: "",
    violation_ids: "",
    channel: 1,
    number: 1,
    user_id: "",
    expire_date: "",
    start_date: "",
    dropdownItems: [],
    dropdownItems2: [],
    selectedValue: null,
    counter: 1,
    inputValue: 0,
    counter1: 1,
    inputValue1: 0,
    option: [],
    featureArray: [],
    violationArray: [],
    featureData: "",
    violationData: "",
  };

  featureArray = e => {
    axios
      .get("http://13.235.160.249:8000/v1/api/get_anpr_features/", {
        headers: {
          key: "1432427wded8c3bc34rr5tf6b2df7e67sca0s451aaf79fga84yfd6043e9"
        }
      })
      .then(response => {
        console.log("response", response.data.data);
        const data = response.data.data;
        const final_data = data.map(option => {
          return {value:option, name:option.name, id:option.id}
        })
        this.setState({
          dropdownItems: final_data
        });
      });
  };

  violationArray = e => {
    axios
      .get("http://13.235.160.249:8000/v1/api/get_anpr_violations/", {
        headers: {
          key: "1432427wded8c3bc34rr5tf6b2df7e67sca0s451aaf79fga84yfd6043e9"
        }
      })
      .then(response => {
        console.log("response1", response.data.data);

        const data = response.data.data;
        this.setState({
          dropdownItems2: data
        });
      });
  };
  tagRender = props => {
    const { label, value, closable, onClose } = props;

    return (
      <Tag
        color={value}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };
  validate = e =>{
   
    this.setState({
      features:''
    })
    console.log("features", this.state.features)
    this.setState({
      violations:''
    })
    console.log("violations", this.state.violations)

    this.setState({
      user_id:''
    })
    console.log("usreid", this.state.user_id)

    this.setState({
      expire_date:''
    })
    console.log("expireDte", this.state.expire_date)

    this.setState({
      start_date:''
    })
    console.log("startDte", this.state.start_date)

    
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll({force:true},(err, values)  => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
     
    });
    console.log("featureIds",this.state.feature_ids)
   
    console.log("startDte", this.state.start_date)

   
  // else{
  
 /*let {  features, violations, feature_ids, violation_ids,channel,number,user_id,expire_date,start_date } = this.state;
    console.log("feature",features)
    const form_data = new URLSearchParams();
    form_data.append("features",features);
    form_data.append("feature_ids",feature_ids);
    form_data.append("violations",violations);
    form_data.append("violation_ids",violation_ids);
    form_data.append("channel",  channel);
    form_data.append("number", number);
    form_data.append("user_id",  user_id);
    form_data.append("expire_date",expire_date);
    form_data.append("start_date",start_date);
   
    
    axios 
      .post("http://13.235.160.249:8000/v1/api/create_anpr_license/", form_data, {
        headers: {
          'key': "1432427wded8c3bc34rr5tf6b2df7e67sca0s451aaf79fga84yfd6043e9"
        }
      }).then(response =>{
        console.log("response",response.data)
         if(response.data.status === 201){
            this.props.form.resetFields()
           message.success("Data inserted sucessfully.")
         }
         else if(response.data.status === 500){
         

           message.warning("Server Error!")
         }
        
        }
        
      )*/
      //}
     
}
  componentDidMount() {
    this.featureArray();
    this.violationArray();
    
  }

  handleChange = event => {
   

    const keycode = event.keyCode || event.which;
    console.log("event", keycode);
    const keyValue = String.fromCharCode(keycode);
  
    if (keycode > 58) {
      event.preventDefault()}
}

changeUser = e =>{
  this.setState({
    user_id: e.target.value
  });
  console.log("userid",e.target.value)

}
  startDateChange = (date, dateString) => {
   
    this.setState({
      start_date: dateString
    });
  };
  endDateChange = (date, dateString) => {
    
    this.setState({
      expire_date: dateString
    });
  };
  onChannelChange = event => {
    let inputValue = event.target.value;
    this.setState({ channel: inputValue });
  };

  onIncrease = () => {
    if (this.state.inputValue <= 1) {
      let counter = this.state.counter + 1;
      this.setState({ counter });
      this.setState({
        channel: counter
      });
    }
  };

  onDecrease = () => {
    if (this.state.counter > 1) {
      let counter = this.state.counter - 1;
      this.setState({ counter });
      this.setState({
        channel: counter
      });
    }
  };
  onNumberChange = event => {
    let inputValue1 = event.target.value;
    this.setState({ number: inputValue1 });
  };

  onIncrease1 = () => {
    if (this.state.inputValue1 <= 1) {
      let counter1 = this.state.counter1 + 1;
      this.setState({ counter1 });
      this.setState({
        number: counter1
      });
    }
  };

  onDecrease1 = () => {
    if (this.state.counter1 > 1) {
      let counter1 = this.state.counter1 - 1;
      this.setState({ counter1 });
      this.setState({
        number: counter1
      });
    }
  };
  selectFeature = (e, value) => {
    const ids = e.toString();
    this.setState({
      feature_ids:ids
    })
    const ans = value.map(val => {
      
      console.log(val.props.children)
      return val.props.children
      
     
    })
    console.log("ans",ans.join(","))
    this.setState({
      features:ans.join(",")
    })
  };
  selectViolation = (e, value) => {
    console.log(e.toString());
    const ids = e.toString();
   
    this.setState({
      violation_ids:ids
    })
    const ans = value.map(val => {
           return val.props.children
    })
      this.setState({
        violations:ans.join(",")
    });
  };
  reset = e =>{
   
   
   
  }
  render() {
    console.log("features", this.state.features);
    console.log("violayions",this.state.violations);
    console.log("user",this.state.user_id);
    console.log("user",this.state.start_date);
    console.log("user",this.state.expire_date);
    
    console.log(",mbkcg",this.state.features)
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const validateMessages = {
      required: 'This field is required!',
    }
   
   console.log("features",this.state.features);
   console.log(this.state.violations);
    const { dropdownItems } = this.state;
    const { dropdownItems2 } = this.state;

      const onFinish = values => {
        console.log('Received values of form: ', values);
      };
     
    return (
      <div>
        <Row>
          <Col
            lg={{ span: 15, offset: 0 }}
            xs={{ span: 24 }}
            style={{ marginTop: "0vh" }}
          >
            <Form
              {...layout}
              onFinish={onFinish}
              style={{
                height: "750px",
                width: "100%",
                backgroundColor: "#EBECEF",
                boxShadow: "1px 1px 2px 2px #5786A3",
                borderRadius: 10,
                margintop: 20
              }}
              onSubmit={this.handleSubmit}
              validateMessages={validateMessages}
              name="nest-messages"
            
              
            >
              <p
                style={{
                  backgroundColor: "#182345",
                  height: 30,
                  marginTop: 10,
                  borderRadius: 5,
                  color: "white",
                  textAlign: "center"
                }}
              >
                ANPR Registration
              </p>
              <hr />
              <Form.Item name='feature' rules={[{ required: true, message: 'Please select Feature!' }]}>
              <Col lg={{ span: 24, offset: 0 }} xs={{ span: 18 }}>
              
                {getFieldDecorator('feature', {
                  rules: [{
                    required: true, message: 'Please Select features',
                  }],
                })
                  (
                    
                    <Select 
                    mode="multiple"
                    tagRender={this.tagRender}
                    style={{
                      width: "100%",
                      color: "black",
                      textAlign: "center"
                    }}
                    
                    placeholder="Select Feature"
                    onChange={this.selectFeature}
                    
                   
                  >
                    {dropdownItems.map((item, index) => {
                     return <Select.Option value={item.id} key={index}>
                        {item.name}
                      </Select.Option>
                    }
                    )}
                  </Select>)}
                </Col>
              </Form.Item>
              <Form.Item name = "violation" rules={[{ required: true, message: 'Please select violation!' }]} >
                <Col lg={{ span: 24, offset: 0 }} xs={{ span: 18 }}>
                {getFieldDecorator('violation', {
                  rules: [{
                    required: true, message: 'Please Select Violatios',
                  }],
                })
                  (
                  <Select
                    mode="multiple"
                    tagRender={this.tagRender}
                    style={{ width: "100%", color: "black" }}
                    placeholder="Select Violation"
                    onChange={this.selectViolation}
                    

                   
                  >
                    {dropdownItems2.map((item, index) => (
                      <Select.Option key={index}>{item.name}</Select.Option>
                    ))}
                  </Select>)}{" "}
                </Col>
              </Form.Item>
              <Form.Item label="Channel" rules={[{ required: true }]}>
                <Col lg={{ span: 10, offset: 0 }} xs={{ span: 18 }}>
                  <Input
                    onChange={this.onChannelChange}
                    value={this.state.counter}
                    placeholder="Channel"
                  />

                  <Button
                    onClick={this.onIncrease}
                    style={{
                      marginLeft: "1%",
                      backgroundColor: "dodgerblue",
                      color: "white"
                    }}
                  >
                    +
                  </Button>

                  <Button
                    onClick={this.onDecrease}
                    style={{
                      marginLeft: "1%",
                      backgroundColor: "dodgerblue",
                      color: "white"
                    }}
                  >
                    -
                  </Button>
                </Col>
              </Form.Item>
              <Form.Item label="Number" rules={[{ required: true }]}>
                <Col lg={{ span: 10, offset: 0 }} xs={{ span: 18 }}>

                  <Input
                    onChange={this.onNumberChange}
                    value={this.state.counter1}
                    placeholder="Number"
                  />
                  <Button
                    onClick={this.onIncrease1}
                    style={{
                      marginLeft: "1%",
                      backgroundColor: "dodgerblue",
                      color: "white"
                    }}
                  >
                    +
                  </Button>
                  <Button
                    onClick={this.onDecrease1}
                    style={{
                      marginLeft: "1%",
                      backgroundColor: "dodgerblue",
                      color: "white"
                    }}
                  >
                    -
                  </Button>
                </Col>
              </Form.Item>
              <Form.Item >
                <Col lg={{ span: 24, offset: 0 }} xs={{ span: 18 }}>
                {getFieldDecorator('user_id', {
                  rules: [
                    {
                    required: true, message: 'Please input user id',
                  }],
                })
                  (
                  <Input
                    name ="user_id"
                    placeholder="User Id"
                    onKeyPress={this.handleChange}
                    onChange = {this.changeUser}
                   
                  
                  />)}
                </Col>
              </Form.Item>
              <Form.Item >
                <Col lg={{ span: 24, offset: 0}} xs={{ span: 18 }}>
                {getFieldDecorator('start_date', {
                  rules: [
                    {
                    required: true, message: 'Please input Start Date',
                  }],
                })
                  (
                  <DatePicker
                    onChange={this.startDateChange}
                    placeholder="Start Date"
                    style={{ width: "100%" }}
                    required
                  />)}
                </Col>
              </Form.Item>
              <Form.Item >
                <Col lg={{ span: 24, offset: 0}} xs={{ span: 18 }}>
                {getFieldDecorator('expire_date', {
                  rules: [
                    {
                    required: true, message: 'Please input Expire Date',
                  }],
                })
                  (
                  <DatePicker
                    onChange={this.endDateChange}
                    placeholder="Expire Date"
                    style={{ width: "100%" }}
                   
                  />)}
                </Col>
              </Form.Item>
              <Col lg={{ span: 4, offset: 8 }}>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} rules={[{ required: true }]} disabled={hasErrors(getFieldsError())}>
                  <Button type="primary" htmlType="submit" onClick = {this.reset}>
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
const Anpr_Registration = Form.create({ name: "login" })(Registration);

export default Anpr_Registration;
