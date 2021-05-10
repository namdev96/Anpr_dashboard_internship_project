import React from "react";
import {
  Table,
  Button,
  Tag,
  Collapse,
  Tooltip,
  Input,
  DatePicker,
  message,
  Spin,
  Row,
  Col
} from "antd";
import axios from "axios";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  CopyOutlined,
  CloudDownloadOutlined
} from "@ant-design/icons";
import dateFormat from "dateformat";
import "./Demo.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CSVLink, CSVDownload } from "react-csv";
import moment from "moment";

const { Panel } = Collapse;
class DemoTable extends React.Component {
  state = {
    table_data: [],
    searchText: "",
    searchedColumn: "",
    startValue: null,
    endValue: null,
    endOpen: false,
    startDate: "",
    endDate: "",
    filterData: [],
    condCheck: false,
    loader: true,
    result: "",
    filteredInfo: null,
    sortedInfo: null,
    value: "",
    copied: false,
    verified: [],
    unverified: [],
    reset: false,
    resetData: [],
    resetTableData: [],
    unverifiedStatus: false,
    verifiedStatus: false,
    verifyResult: "",
    verifyFilter: [],
    UnVerifyFilter:[],
    verifyReset: "",
    unverifyReset: "",
    resetVerifyData: [],
    resetUnverifyData: [],
    resetOverall:false
  };
  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  onStartChange = (value, e) => {
    this.setState({
      startValue: value
    });

    this.setState({
      startDate: dateFormat(e, "yyyy-mm-dd")
    });
  };

  onEndChange = (value, e) => {
    this.setState({
      endValue: value
    });
    this.setState({
      endDate: dateFormat(e, "yyyy-mm-dd")
    });
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    console.log(endValue);
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf() && endValue > moment();
  };
  removeUnVerifyFilter = () => {
    this.setState({
      startDate: ""
    });
    this.setState({
      endDate: ""
    });
    this.setState({
      startValue: ""
    });
    this.setState({
      endValue: ""
    });
    this.setState({
      UnVerifyFilter: [],
      unverifyCheck: false
    });
    if (this.state.unverifyCheck === false) {
      message.info("No data to remove filter");
    }
    if (this.state.unverifyReset === true) {
      const data = this.state.table_data;
      this.setState({
        resetUnVerifyData: data
      });
    }
  };
  removeVerifyFilter = () => {
    this.setState({
      startDate: ""
    });
    this.setState({
      endDate: ""
    });
    this.setState({
      startValue: ""
    });
    this.setState({
      endValue: ""
    });
    this.setState({
      verifyFilter: [],
      verifyCheck: false
    });
    if (this.state.verifyCheck === false) {
      message.info("No data to remove filter");
    }
    if (this.state.verifyReset === true) {
      const data = this.state.table_data;
      this.setState({
        resetVerifyData: data
      });
    }
  };

  onBtnClick = () => {
   
    const data = this.state.table_data;
    const verifieddata = this.state.verified;
    const unverifieddata = this.state.unverified;
    const start = this.state.startDate;
    const end = this.state.endDate;
    const result = data.filter(
      obj =>
        dateFormat(obj.license__created_datetime, "yyyy-mm-dd") >= start &&
        dateFormat(obj.license__created_datetime, "yyyy-mm-dd") <= end
    );
    console.log(result);
    this.setState({
      result: result.length
    });
    const verifiedresult = verifieddata.filter(
      obj =>
        dateFormat(obj.license__created_datetime, "yyyy-mm-dd") >= start &&
        dateFormat(obj.license__created_datetime, "yyyy-mm-dd") <= end
    );
   // console.log(result);
    this.setState({
      verifyResult: verifiedresult.length
    });
    const unverifiedresult = unverifieddata.filter(
      obj =>
        dateFormat(obj.license__created_datetime, "yyyy-mm-dd") >= start &&
        dateFormat(obj.license__created_datetime, "yyyy-mm-dd") <= end
    );
    console.log("unverified Result",unverifiedresult);
    this.setState({
      unverifyResult: unverifiedresult.length
    });

    if (this.state.startDate === "" && this.state.endDate === "") {
      message.info("Please select start date and end date");
    } else if (this.state.startDate !== "" && this.state.endDate === "") {
      message.info("Please select end date");
    } else if (this.state.startValue === null || this.state.endValue === null) {
      message.info("Should not be empty");
    } else if (this.state.endDate !== "" && this.state.startDate === "") {
      message.info("Please select start date");
    } else if(verifiedresult !==0 && this.state.verifiedStatus === true){
      this.setState({
        verifyFilter:verifiedresult,
        verifyCheck:true
      })
      console.log("verified result",verifiedresult)
      console.log("verifyfilter",this.state.verifyFilter)
      message.info("data filtered");

    }
    else if(unverifiedresult !==0  && this.state.unverifiedStatus === true){
      this.setState({
        UnVerifyFilter:unverifiedresult,
        unverifyCheck:true
      })
      console.log("unverified resut",this.state.UnVerifyFilter)
      message.info("data filtered");

    }
    else if (result.length !== 0) {
      this.setState({
        filterData: result,
        condCheck: true
      });
     
      message.info("data filtered");
      console.log(result.length);
    }
   
   
    else if (result.length === 0) {
      message.info("No data to filter");
    }
  };
  removeFilter = () => {
    this.setState({
      startDate: ""
    });
    this.setState({
      endDate: ""
    });
    this.setState({
      startValue: ""
    });
    this.setState({
      endValue: ""
    });
    this.setState({
      filterData: [],
      condCheck: false
    });
    this.setState({
      verifyFilter: [],
      verifyCheck: false
    });
    this.setState({
      UnVerifyFilter: [],
      unverifyCheck: false
    });
    if (this.state.condCheck === false && this.state.verifyCheck === false && this.state.unverifyCheck === false) {
      message.info("No data to remove filter");
    }
   
    if (this.state.reset === true) {
      const data = this.state.table_data;
      this.setState({
        resetData: data
      });
    }
  };
  resetTable = e => {
    
    const table_data = this.state.table_data;
    this.setState({
      
      resetTableData: table_data,
      verifiedStatus: false,
      unverifiedStatus: false,
      unverifyCheck:false,
      verifyCheck:false,
      condCheck:false,
     

    });
  
    console.log("reset table data",this.state.resetTableData)
    message.info("Reset Table")
  };
  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  componentDidMount() {
    document.title = "Demo Table";
    axios
      .get("http://13.235.160.249:8000/v1/api/get_anpr_licenses/", {
        headers: {
          key: "1432427wded8c3bc34rr5tf6b2df7e67sca0s451aaf79fga84yfd6043e9"
        }
      })
      .then(res => {
        console.log(res.data.data);
        this.setState({
          table_data: res.data.data,
          loader: false
        });
      });
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  onChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  onCopy = (e, item) => {
    console.log("e", e);
    console.log("item", item);
    this.setState({
      value: e
    });
  };
  copied = e => {
    this.setState({
      copied: true
    });
  };
  //unverfied
  onUnverifed = e => {
    const data = this.state.table_data;
    console.log("UNverified");
    const Unverify = data.filter(obj => obj.license__is_verified == false);
    console.log("Unverify-------------", Unverify);
    this.setState({
      unverified: Unverify,
      unverifiedStatus: true,
      verifiedStatus: false
    });
  };
  //verified
  onVerified = e => {
    const data = this.state.table_data;
    console.log("verified");
    const Verify = data.filter(obj => obj.license__is_verified == true);
    console.log("Verify*****************", Verify);
    this.setState({
      verified: Verify,
      verifiedStatus: true,
      unverifiedStatus: false
    });
  };

  render() {
    console.log("reset table data",this.state.resetTableData)
    console.log("unverified resut",this.state.UnVerifyFilter)
   
    console.log("unverify data filtered",this.state. UnVerifyFilter)
    console.log("verified :", this.state.verifiedStatus);
    console.log("Unverified :", this.state.unverifiedStatus);
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    const record = this.state.result;
    const columns = [
      {
        title: <b>License Key</b>,
        key: "license__license_key",
        dataIndex: "license__license_key",
        ...this.getColumnSearchProps("license__license_key"),
        render: key => {
          return (
            <div>
              <Tag
                color="volcano"
                style={{ fontWeight: "bold", color: "black" }}
              >
                {key}

                <CopyToClipboard value={key.id} text={key} onCopy={this.onCopy}>
                  <Tooltip placement="topLeft" title="copy">
                    <Button
                      style={{ borderRadius: 28, size: 20 }}
                      onClick={this.copied}
                    >
                      <CopyOutlined />
                    </Button>
                  </Tooltip>
                </CopyToClipboard>
              </Tag>
            </div>
          );
        }
      },

      {
        title: <b>Violation</b>,
        dataIndex: "violations",
        key: "violations",
        ...this.getColumnSearchProps("violations"),

        render: key => {
          if (key.length > 10) {
            return (
              <Tooltip placement="topLeft" title={key}>
                <Tag>{key.substring(0, 9)}...</Tag>
              </Tooltip>
            );
          } else if (key === "None") {
            return <Tag color="pink">None</Tag>;
          }
        }
      },
      {
        title: <b>Features</b>,
        dataIndex: "features",
        key: "features",
        ...this.getColumnSearchProps("features"),

        render: key => {
          if (key.length > 10) {
            return (
              <Tooltip placement="topLeft" title={key}>
                <Tag color="geekblue">{key.substring(0, 9)}...</Tag>
              </Tooltip>
            );
          } else if (key === "None") {
            return <Tag color="cyan">None</Tag>;
          }
        }
      },
      {
        title: <b>Channel</b>,
        dataIndex: "channel",
        key: "channel"
      },

      {
        title: <b>Status</b>,
        key: "license__is_activated",
        dataIndex: "license__is_activated",
        render: active => {
          if (String(active) === "true") return <Tag color="green">Active</Tag>;
          else if (String(active) === "false")
            return <Tag color="red">Inactive</Tag>;
        }
      },
      {
        title: <b>Verification</b>,
        key: "license__is_verified",
        dataIndex: "license__is_verified",
        render: active => {
          if (String(active) === "true")
            return <Tag color="green">Verified</Tag>;
          else if (String(active) === "false")
            return <Tag color="red">Unverified</Tag>;
        }
      },
      {
        title: <b>Creation Date & Time</b>,
        key: "license__created_date",
        dataIndex: "license__created_datetime",
        render: date => {
          return date.substring(0, 10) + " " + date.substring(11, 19);
        },
        sorter: (a, b) => {
          const dateA = new Date(a.license__created_datetime),
            dateB = new Date(b.license__created_datetime);
          console.log("value of dateA", dateA);
          console.log("value of dateB", dateB);
          return dateA - dateB;
        },
        ellipsis: true
      },
      {
        title: <b>Verification Date & Time</b>,
        key: "license__verified_datetime",
        dataIndex: "license__verified_datetime",
        render: date => {
          if (String(date) === "null") return <Tag color="orange">None</Tag>;
          else {
            return date.substring(0, 10) + " " + date.substring(11, 19);
          }
        },
        sorter: (a, b) => {
          console.log("a", a);
          const dateA = new Date(a.license__verified_datetime),
            dateB = new Date(b.license__verified_datetime).getTime();
          console.log("value of dateA", dateA);
          return dateA - dateB;
        },
        ellipsis: true
      },
      {
        title: <b>Device Id</b>,
        key: "license__device_id",
        dataIndex: "license__device_id",
        render: id => {
          return <Tag color="magenta">{id}</Tag>;
        }
      }
      
    ];
    console.log("verifyCheck", this.state.verifyCheck);
    return (
      <div>


<Collapse
              defaultActiveKey={["0"]}
              style={{
                backgroundColor: "#E7F0F1",
                marginLeft: "55%",
                width: "45%",
                marginTop: "1%",
                color: "white"
              }}
            >
              <Panel header=" Filter" key="1" style={{ fontWeight: "bold" }}>
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  format="YYYY-MM-DD"
                  value={this.state.startValue}
                  placeholder="Start Date"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                  disabledDate={current => {
                    return current && current > moment();
                  }}
                />
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  format="YYYY-MM-DD "
                  value={this.state.endValue}
                  placeholder="End Date"
                  onChange={this.onEndChange}
                  open={this.state.endOpen}
                  onOpenChange={this.handleEndOpenChange}
                  style={{ marginLeft: "1%" }}
                  disabledDate={current => {
                    return (
                      current > moment() || current <= this.state.startValue
                    );
                  }}
                />
                <br />
                <br />
                <Button
                  onClick={this.onBtnClick}
                  style={{
                    marginLeft: "1%",
                    backgroundColor: "dodgerblue",
                    color: "white"
                  }}
                >
                  Filter
                </Button>
                <Button
                  onClick={this.removeFilter}
                  style={{
                    marginLeft: "1%",
                    backgroundColor: "dodgerblue",
                    color: "white"
                  }}
                >
                  Reset
                </Button>
              </Panel>
            </Collapse>
        {this.state.loader ? (
          <Spin style={{ marginLeft: 500, marginTop: "200px" }} />
        ) : (
          <div>
            <Button
              onClick={this.onVerified}
              style={{ backgroundColor: "#C2650C", color: "white" }}
            >
              Verified
            </Button>
            <Button
              onClick={this.onUnverifed}
              style={{ backgroundColor: "#041C43", color: "white" }}
            >
              Unverified
            </Button>

            <Button
              style={{ backgroundColor: "#0CC2A5", color: "white" }}
              onClick={this.resetTable}
            >
              Reset Table
            </Button>
            {this.state.condCheck ? (
              <div>
                <p style={{ fontWeight: "bold", color: "dodgerBlue" }}>
                  Data is filtered between {startDate} to {endDate}
                </p>
                <p style={{ fontWeight: "bold", color: "dodgerBlue" }}>
                  Total {record} items found.
                </p>
                <Button
                  type="primary"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right top, #215ab3, #007ec6, #0098a7, #00a967, #85b121)"
                  }}
                >
                  <CSVLink
                    data={this.state.filterData}
                    style={{ color: "white" }}
                  >
                    Download
                  </CSVLink>
                </Button>
                <Table
                  rowKey={data => data.id}
                  columns={columns}
                  dataSource={this.state.filterData}
                  className="table"
                  style={{ marginTop: 10 }}
                  size="small"
                  pagination={{
                    showSizeChanger: true,
                    onShowSizeChange: this.onShowSizeChange,
                    defaultCurrent: 1,
                    defaultPageSize: 10,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                    pageSizeOptions: ["10", "20", "30", "40", "50"]
                  }}
                  scroll={{ x: true }}
                  onChange={this.onChange}
                />
              </div>
            ) : 
            (
              <div>
       
              {this.state.verifyCheck ?(
                <div>
                 <p style={{ fontWeight: "bold", color: "dodgerBlue" }}>
                 Data is filtered for verified items between {startDate} to {endDate}
               </p>
               <p style={{ fontWeight: "bold", color: "dodgerBlue" }}>
                 Total {this.state.verifyFilter.length} items found.
               </p>
               <Button
                 type="primary"
                 style={{
                   backgroundImage:
                     "linear-gradient(to right top, #215ab3, #007ec6, #0098a7, #00a967, #85b121)"
                 }}
               >
                 <CSVLink
                   data={this.state.verifyFilter}
                   style={{ color: "white" }}
                 >
                   Download
                 </CSVLink>
               </Button>
               
               <Table
                 rowKey={data => data.id}
                 columns={columns}
                 dataSource={this.state.verifyFilter}
                 className="table"
                 style={{ marginTop: 10 }}
                 size="small"
                 pagination={{
                   showSizeChanger: true,
                   onShowSizeChange: this.onShowSizeChange,
                   defaultCurrent: 1,
                   defaultPageSize: 10,
                   showQuickJumper: true,
                   showTotal: (total, range) =>
                     `${range[0]}-${range[1]} of ${total} items`,
                   pageSizeOptions: ["10", "20", "30", "40", "50"]
                 }}
                 scroll={{ x: true }}
                 onChange={this.onChange}
               />
             </div>
              ):
              (
              <div>
                 
                {this.state.unverifyCheck  ? (
                <div>
                 
             
                 <p style={{ fontWeight: "bold", color: "dodgerBlue" }}>
                 Data is filtered for Unverified items between {startDate} to {endDate}
               </p>
               <p style={{ fontWeight: "bold", color: "dodgerBlue" }}>
                 Total {this.state.UnVerifyFilter.length} items found.
               </p>
               <Button
                 type="primary"
                 style={{
                   backgroundImage:
                     "linear-gradient(to right top, #215ab3, #007ec6, #0098a7, #00a967, #85b121)"
                 }}
               >
                 <CSVLink
                   data={this.state.UnVerifyFilter}
                   style={{ color: "white" }}
                 >
                   Download
                 </CSVLink>
               </Button>
               
               <Table
                 rowKey={data => data.id}
                 columns={columns}
                 dataSource={this.state.UnVerifyFilter}
                 className="table"
                 style={{ marginTop: 10 }}
                 size="small"
                 pagination={{
                   showSizeChanger: true,
                   onShowSizeChange: this.onShowSizeChange,
                   defaultCurrent: 1,
                   defaultPageSize: 10,
                   showQuickJumper: true,
                   showTotal: (total, range) =>
                     `${range[0]}-${range[1]} of ${total} items`,
                   pageSizeOptions: ["10", "20", "30", "40", "50"]
                 }}
                 scroll={{ x: true }}
                 onChange={this.onChange}
               />
               </div>
                ):
                (
              <div>
                {
                  <div>
                    {this.state.unverifiedStatus ? (
                      <div>
                        <Button
                          type="primary"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right top, #215ab3, #007ec6, #0098a7, #00a967, #85b121)",
                            color: "white"
                          }}
                        >
                          <CloudDownloadOutlined />
                          <CSVLink
                            data={this.state.unverified}
                            style={{ color: "white" }}
                          >
                            Download
                          </CSVLink>
                        </Button>

                        <p style={{ color: "dodgerblue", fontWeight: "bold" }}>
                          Total {this.state.unverified.length} Unverified Items
                          Found.
                        </p>
                        <Table
                          rowKey={data => data.id}
                          columns={columns}
                          dataSource={this.state.unverified}
                          className="table"
                          style={{ marginTop: 10 }}
                          size="small"
                          pagination={{
                            showSizeChanger: true,
                            onShowSizeChange: this.onShowSizeChange,
                            defaultCurrent: 1,
                            defaultPageSize: 10,
                            showQuickJumper: true,
                            showTotal: (total, range) =>
                              `${range[0]}-${range[1]} of ${total} items`,
                            pageSizeOptions: ["10", "20", "30", "40", "50"]
                          }}
                          scroll={{ x: true }}
                          onChange={this.onChange}
                        />
                      </div>
                    ) : (
                      <div>
                        {this.state.verifiedStatus ? (
                          <div>
                            <Button
                              type="primary"
                              style={{
                                backgroundImage:
                                  "linear-gradient(to right top, #215ab3, #007ec6, #0098a7, #00a967, #85b121)"
                              }}
                            >
                              <CloudDownloadOutlined />{" "}
                              <CSVLink
                                data={this.state.verified}
                                style={{ color: "white" }}
                              >
                                Download
                              </CSVLink>
                            </Button>

                            <p
                              style={{
                                color: "dodgerblue",
                                fontWeight: "bold"
                              }}
                            >
                              Total {this.state.verified.length} Verified Items
                              Found.
                            </p>
                            <Table
                              rowKey={data => data.id}
                              columns={columns}
                              dataSource={this.state.verified}
                              className="table"
                              style={{ marginTop: 10 }}
                              size="small"
                              pagination={{
                                showSizeChanger: true,
                                onShowSizeChange: this.onShowSizeChange,
                                defaultCurrent: 1,
                                defaultPageSize: 10,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                  `${range[0]}-${range[1]} of ${total} items`,
                                pageSizeOptions: ["10", "20", "30", "40", "50"]
                              }}
                              scroll={{ x: true }}
                              onChange={this.onChange}
                            />
                          </div>
                        ) : (
                          <div>
                            {/* knkjh */}

                            {this.state.resetOverall ||this.state.verifiedStatus || this.state.unverifiedStatus? (
                              <div>
                                <Button
                                  type="primary"
                                  style={{
                                    backgroundImage:
                                      "linear-gradient(to right top, #215ab3, #007ec6, #0098a7, #00a967, #85b121)"
                                  }}
                                >
                                  <CloudDownloadOutlined />{" "}
                                  <CSVLink
                                    data={this.state.resetTableData}
                                    style={{ color: "white" }}
                                  >
                                    Download
                                  </CSVLink>
                                </Button>

                                <p
                                  style={{
                                    color: "dodgerblue",
                                    fontWeight: "bold"
                                  }}
                                ></p>
                                {}
                                <Table
                                  rowKey={data => data.id}
                                  columns={columns}
                                  dataSource={this.state.reseTabletData}
                                  className="table"
                                  style={{ marginTop: 10 }}
                                  size="small"
                                  pagination={{
                                    showSizeChanger: true,
                                    onShowSizeChange: this.onShowSizeChange,
                                    defaultCurrent: 1,
                                    defaultPageSize: 10,
                                    showQuickJumper: true,
                                    showTotal: (total, range) =>
                                      `${range[0]}-${range[1]} of ${total} items`,
                                    pageSizeOptions: [
                                      "10",
                                      "20",
                                      "30",
                                      "40",
                                      "50"
                                    ]
                                  }}
                                  scroll={{ x: true }}
                                  onChange={this.onChange}
                                />
                              </div>
                            ) : (
                              <div>
                                <div style={{}}>
                                  <Button
                                    type="primary"
                                    style={{
                                      backgroundImage:
                                        "linear-gradient(to right top, #215ab3, #007ec6, #0098a7, #00a967, #85b121)"
                                    }}
                                  >
                                    <CloudDownloadOutlined />{" "}
                                    <CSVLink
                                      data={this.state.table_data}
                                      style={{ color: "white" }}
                                    >
                                      Download
                                    </CSVLink>
                                  </Button>
                                </div>
                                <br />
                                <Table
                                  rowKey={data => data.id}
                                  columns={columns}
                                  dataSource={this.state.table_data}
                                  size="small"
                                  pagination={{
                                    showSizeChanger: true,
                                    onShowSizeChange: this.onShowSizeChange,
                                    defaultCurrent: 1,
                                    defaultPageSize: 10,
                                    showQuickJumper: true,
                                    showTotal: (total, range) =>
                                      `${range[0]}-${range[1]} of ${total} items`,
                                    pageSizeOptions: [
                                      "10",
                                      "20",
                                      "30",
                                      "40",
                                      "50"
                                    ]
                                  }}
                                  scroll={{ x: true }}
                                  onChange={this.onChange}
                                />
                              </div>
                            
                            )}
                          </div>
                      
                            )}
                            </div>
                        )}
                      </div>
                      }
                    
                  </div>
                  )}
                   </div>
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default DemoTable;
