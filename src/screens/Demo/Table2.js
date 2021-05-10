import React from "react";
import { Form, Input, Select, Tooltip, Button } from "antd";

class Table2 extends React.Component {
  render() {

    const { Option } = Select;
    const onFinish = values => {
      console.log("Received values of form: ", values);
    };
    return (
      <div>
        <Form
          name="complex-form"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="Username" >
            <Form.Item
              name="username"
             
              rules={[{ required: true, message: "Username is required" }]}
            >
           
              <Input style={{ width: 160 }} placeholder="Please input" required/>
            </Form.Item>
            <Tooltip title="Useful information">
              <a href="#API" style={{ marginLeft: 8 }}>
                Need Help?
              </a>
            </Tooltip>
          </Form.Item>
          <Form.Item label="Address">
            <Input.Group compact>
              <Form.Item
                name={["address", "province"]}
                rules={[{ required: true, message: "Province is required" }]}
              >
                <Select placeholder="Select province">
                  <Option value="Zhejiang">Zhejiang</Option>
                  <Option value="Jiangsu">Jiangsu</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={["address", "street"]}
               
                rules={[{ required: true, message: "Street is required" }]}
              >
                <Input style={{ width: "50%" }} placeholder="Input street" />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
            <Form.Item
              name="year"
              rules={[{ required: true }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 5px)",
                marginRight: 8
              }}
            >
              <Input placeholder="Input birth year" />
            </Form.Item>
            <Form.Item
              name="month"
              rules={[{ required: true }]}
              style={{ display: "inline-block", width: "calc(50% - 5px)" }}
            >
              <Input placeholder="Input birth month" />
            </Form.Item>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Table2;
