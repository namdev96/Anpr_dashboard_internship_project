import React from "react";
import { Table, Button, Collapse, Menu, Layout, message } from "antd";
import "./Style.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined 
} from '@ant-design/icons';
import DemoTable from "../Demo/DemoTable.js";
import Table1 from "../Demo/Anpr_Registration.js";
import Table2 from "../Demo/Table2.js";
import Anpr_Registration from "../Demo/Anpr_Registration.js";

const { Panel } = Collapse;
const { Header, Content, Sider } = Layout;

class Dashboard extends React.Component {
  state = {
    theme: "dark",
    current: "1",
    collapsed: false,
    defaultSelectedKeys: "",
    key:''
  };
  componentDidMount() {
    document.title = "Dashboard";
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age"
      }
    });
  };

  handleClick = (e,val) => {
    console.log('click ', e);
    this.setState({
      current: e.keyPath,
    });
  };

  logOut = e => {
    window.location.href = "#/";
    sessionStorage.clear();
    message.info("You are signed out");
  };
  menuClick1 = e =>{
    const current  = e.key;
   sessionStorage.setItem('key',current)
  
  }
  
  menuClick2 = e =>{
    const current  = e.key;
    sessionStorage.setItem('key',current)
   
   }
   menuClick3 = e =>{
    const current  = e.key;
    sessionStorage.setItem('key',current)
    }
  render() {
    console.log("current",this.state.current)
    const token = sessionStorage.getItem("lgnSession");
    if (token === null) {
      window.location.href = "/#";
      localStorage.clear();
    }
  
    const { xScroll, yScroll, ...state } = this.state;

    return (
      <div>
        <Layout style={{ height: "100vh" }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            {/* sessionStorage.getItem('key')*/}
            <div className="logo" />
            <Menu theme="dark" mode="inline"  defaultSelectedKeys = {[sessionStorage.getItem('key')]}  >
              <img
                src={process.env.PUBLIC_URL + "./images/intozi.png"}
                style={{ height: "70px", width: "60%", marginLeft: 35 }}
              />
              <hr style={{ border: "2px solid white" }} />
              <Menu.Item key="1"  onClick = {this.menuClick1} >
                <UserOutlined />
                <span className="nav-text" >License</span>
                <Link to="/dashboard/license" />
              </Menu.Item>
              <Menu.Item key="2" onClick = {this.menuClick2} >
             
                <VideoCameraOutlined />
                <span className="nav-text">Anpr Registration</span>
                <Link to="/dashboard/Anpr_Registration" />
              </Menu.Item>
              <Menu.Item key="3"  onClick = {this.menuClick3}>
                <UploadOutlined />
                <span className="nav-text">Table2</span>
                <Link to="/dashboard/table2" />
              </Menu.Item>
              <Menu.Item key="4">
              <LogoutOutlined />
              
                <span className="nav-text" onClick={this.logOut}>
                  Log out
                </span>
                <Link to="/" />

              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Switch>
                  <Route path="/dashboard/license" component={DemoTable} />
                  <Route path="/dashboard/Anpr_Registration" component={Anpr_Registration} />
                  <Route path="/dashboard/table2" component={Table2} />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>

        <footer
          style={{
            backgroundColor: "black",
            textAlign: "center",
            padding: "10px",
            color: "white",
            fontWeight: "bold"
          }}
        >
          Copyright © 2020 Intozi Tech Pvt. Ltd. All Rights Reserved
        </footer>
      </div>
    );
  }
}
export default Dashboard;
