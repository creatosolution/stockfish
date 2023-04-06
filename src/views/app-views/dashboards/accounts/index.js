import React, { useEffect, useMemo, useState } from "react";
import utils from "utils";
import { PlusCircleOutlined, EditOutlined , StopOutlined } from "@ant-design/icons";
import AccountEditModal from "./editAccount";
import DisableAccountModal from "./disableAccount"
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Row,
  Col,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Table,
  Typography,
} from "antd";
import { AntTableSearch } from "../../../../components/shared-components/AntTableSearch";
import { connect, useDispatch } from "react-redux";
import { getUserBalanceAndEquity } from "store/slices/dealsSlice";
import {
  getAccountList,
  referesAccountList,
  getAccountListByClient,
  depositWithdrawal,
  creditActivity,
  updateAccountList,
  resetAccountList,
} from "store/slices/creditSlice";

import { getAccountListByUserId } from 'store/slices/usersSlice';


import {
  accountUpdate,
  accountDisable
} from "store/slices/usersSlice";


import { LoadingOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
const { Text } = Typography;
const { Option } = Select;

let allAccountList = [];
const colorMap = {
  "255": {bg:"red", color:"#ffff"}, // red
  "32768":{bg:"#008000", color:"#ffff"}, // Green
  "65280": {bg: "#00FF00", color: "#fff"},
  "16711935":{bg: "#FF00FF", color: "#fff"} ,
  "65535": {bg: "Yellow", color: "#000"},
  "4278190080": {bg: "#fff", color: "#000"},
  "2763429": {bg: "brown", color: "#fff"},
  "42495": {bg: "orange", color: "#fff"},
  "dda0dd": {bg: "orange", color: "#fff"}  
}
// {
//   value: "255",
//   label: "Red",
// },
// {
//   value: "32768",
//   label: "Green",
// },
// {
//   value: "65280",
//   label: "Lime",
// },
// {
//   value: "16711935",
//   label: "Magenta",
// },
// {
//   value: "65535",
//   label: "Yellow",
// },
// {
//   value: "0",
//   label: "Black",
// }

export const UserBalanceAndEquity = (props) => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((i) => i);
  const pathSnippets = paths[paths.length - 1];
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const nameValue = Form.useWatch('account_id', form);
  const {
    getAccountList,
    getAccountListByClient,
    getAccountListByUserId,
    loading,
    accountList,
    usersClientList,
    getUserBalanceAndEquity,
    loadingEquity,
    userBalanceAndEquity,
    depositWithdrawal,
    creditActivity,
    accountUpdate,
    referesAccountList,
    accountDisable
  } = props;

 console.log("nameValue", nameValue)
 
  const [accountListState, setAccountListState] = useState([]);
  const [accountListIds, setaccountListIds] = useState([]);
  const [balanceAndEquity, setBalanceAndEquity] = useState([]);
  const [submitAmountMap, setSubmitAmountMap] = useState({});
  const [editableItem, setEditableItem] = useState(null);
  const [accountsEditModal, setAccountEditModal] = useState(false);
  const [accountsDisableModal, setAccountDisableModal] = useState(false);
  const totalCredit = utils.transFormCurrency(accountListState && accountListState.length ? accountListState.reduce((sum, item) => sum + parseInt(item.Credit), 0) : 0);
  const totalBalance = utils.transFormCurrency(accountListState && accountListState.length ? accountListState.reduce((sum, item) => sum + parseInt(item.Balance), 0) : 0);
  const totalEquity = utils.transFormCurrency(accountListState && accountListState.length ? accountListState.reduce((sum, item) => sum + parseInt(item.Equity), 0) : 0);
  const totalM2m = utils.transFormCurrency(accountListState && accountListState.length ? accountListState.reduce((sum, item) => sum + (parseInt(item.Equity) - parseInt(item.Credit)), 0) : 0)
 

  const initialCredential = {
    account_id: ''
  }

  useEffect(() => {
    if (usersClientList?.length > 0) {
      let accountIds = [...usersClientList]
      accountIds.sort(function (a, b) {
        return a - b;
      });
      setaccountListIds(accountIds)
    }
  }, [usersClientList])

  useEffect(() => {
    const interval = setInterval(() => { 
      let account_id = form.getFieldValue('account_id')
      
      if(!account_id) {
        
        referesAccountList({user_id: localStorage.getItem("userId")})
      }
    
    }, 7000);
    return () => {
      clearInterval(interval);
    };
  
  }, []);

  const viewAllAccount = ()=>{
    getAccountList({user_id: localStorage.getItem("userId")});
    form.resetFields();
  }

  const getAccountBg=(color)=>{
    return  colorMap[color] ? colorMap[color] : {bg:'#ffff', color:'#000'}
  }
  const handleTableSearch = (searchText) => {
    if (!allAccountList || !allAccountList.length) {
      return;
    }
    const filteredEvents = allAccountList.filter(({ FirstName, clientId }) => {
      FirstName = FirstName.toLowerCase();
      clientId = clientId.toString();
      return clientId.includes(searchText) || FirstName.includes(searchText);
    });

    setAccountListState(filteredEvents);
  };

  let accountTableColumns = [
    {
      title: "Client id",
      dataIndex: "clientId",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => utils.antdTableSorter(a, b, "clientId"),
      render: (_, elm) => {
        return {
          props: {
            style: { background: getAccountBg(elm.Color).bg },
          },
          children:  <div className="table-padding-cover" style={{"color": getAccountBg(elm.Color).color}}>{elm.clientId}</div>

        }
      }
    },
    {
      title: "Client Name",
      dataIndex: "FirstName",
      sorter: (a, b) => utils.antdTableSorter(a, b, "clientName"),
      render: (_, elm) => {
        return {
          props: {
            style: { background: getAccountBg(elm.Color).bg },
          },
          children:  <div className="table-padding-cover" style={{"color": getAccountBg(elm.Color).color}}>{elm.FirstName}</div>

        }
      }
    },
    // {
    //     title: 'Group Name',
    //     dataIndex: 'groupName',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'groupName')
    // },
    {
      title: "Balance",
      dataIndex: "Balance",
      align:'right',
      sorter: (a, b) => utils.antdTableSorter(a, b, "balance"), 
       render: (_, elm) => {
        return {
          props: {
            style: { background: getAccountBg(elm.Color).bg },
          },
          children:  <div className="table-padding-cover" style={{"color": getAccountBg(elm.Color).color}}>{elm.Balance}</div>

        }
      }
    },
    {
      title: "Credit",
      dataIndex: "Credit",
      align:'right',
      sorter: (a, b) => utils.antdTableSorter(a, b, "credit"),
      render: (_, elm) => {
        return {
          props: {
            style: { background: getAccountBg(elm.Color).bg },
          },
          children:  <div className="table-padding-cover" style={{"color": getAccountBg(elm.Color).color}}>{elm.Credit}</div>

        }
      }
    },
    {
      title: "Equity",
      dataIndex: "Equity",
      align:'right',
      sorter: (a, b) => utils.antdTableSorter(a, b, "equity"),
      render: (_, elm) => {
        return {
          props: {
            style: { background: getAccountBg(elm.Color).bg },
          },
          children:  <div className="table-padding-cover" style={{"color": getAccountBg(elm.Color).color}}>{elm.Equity}</div>

        }
      }
    },
    {
      title: "M2M",
      dataIndex: "m2m",
      align:'right',
      render: (_, elm) => {
        return {
          props: {
            style: { background: getAccountBg(elm.Color).bg },
          },
          children:  <div className="table-padding-cover" style={{"color": getAccountBg(elm.Color).color}}>{getM2m(elm)}</div>

        }
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, "m2m"),
    },
    {
      title: "Credit In / Credit Out",
      dataIndex: "clientId",

      render: (_, elm) => {
        return {
          props: {
            style: { background: getAccountBg(elm.Color).bg },
          },
          children:  <div className="table-padding-cover" style={{"color": getAccountBg(elm.Color).color}}>
               <div className="d-flex">
          <input
            placeholder="Amount"
            type="number"
            className="ant-input css-ixblex"
            id={elm.clientId ? elm.clientId.toString() : elm.Login.toString() + "_id"}
            onChange={(e) => handleChangeAmount(e, elm.clientId ? elm.clientId : elm.Login)}
            style={{ width: 90 }}
          />

          <Button
            default
            className="ant-btn-theme text-white rounded-6px ml-3"
            icon={<PlusCircleOutlined />}
            size="small"
            onClick={() => {
              submitCreditData(elm.clientId);
            }}
          >
            Submit
          </Button>
        </div>
            
            </div>

        }
      }

    },
    // {
    //   key: 'edit',
    //   title: "Action",
    //   render: (_, elm) => {
    //     return {
    //       props: {
    //         style: { background: getAccountBg(elm.Color).bg },
    //       },
    //       children:   <>
        
    //       <Button
    //         type=""
    //         onClick={(e) => {
    //           handleEditModalVisiblity(true, elm);
    //         }}
    //         className="ant-btn-theme text-white rounded-6px rounded-pill" icon={<EditOutlined />}
    //       >
    //       </Button>
  
  
    //       <Button
    //         size="small"
    //         onClick={(e) => {
    //           handleAccountsDisableModal(true, elm);
    //         }}
    //         icon={<StopOutlined />}
    //         className="ant-btn-theme text-white rounded-6px rounded-pill ml-2" >
            
    //       </Button>
    //       </> 
    //     }
    //   }
    // }
  ];

  const onHide = () => {
    setAccountEditModal(false);
    setEditableItem(null)
}


  const handleEditModalVisiblity = (value, item) => {
    setEditableItem(item)
    setAccountEditModal(value) 
  };


  const handleAccountsDisableModal = (value, item) => {
    setEditableItem(item)
    setAccountDisableModal(value) 
  };


  
  const refresh = () => {
    getAccountList({user_id: localStorage.getItem("userId")});
  };

  const handleChangeAmount = (e, accountId) => {
    console.log(e, accountId);
    submitAmountMap[accountId] = e.target.value;
    setSubmitAmountMap(submitAmountMap);
  };

  const onAccountUpdate=(accountInfo)=>{
    accountUpdate(accountInfo).then((response)=>{

      console.log("accountUpdate------<", response);
      onHide();
      if (pathSnippets && pathSnippets == "search") {
        onSubmit()
      }  else {
        getAccountList({user_id: localStorage.getItem("userId")});
  
      }
    })
  }

  
  const onDisableAccount=(accountInfo)=>{
    console.log('disableAccount', accountInfo);
    accountDisable(accountInfo).then((res)=>{
      handleAccountsDisableModal()
    })
  }

  const getM2m = (info) => {
    let equity = info.Equity ? info.Equity: 0;
    let credit = info.Credit ? info.Credit :0;
    let m2m =  utils.transFormCurrency((equity - credit))

    // console.log(equity, credit, m2m);
    // m2m = m2m.replace("₹", "");
    return m2m;
  };

  
  const setLogs=(req)=>{
    function text(url) {
      return fetch(url).then(res => res.json());
    }
    
    text('https://api.ipify.org/?format=json').then(data => {
       
      let browser =  navigator.userAgent;
      const logsReq = {
        "amount":req.amount,
        "user_id":localStorage.getItem("userId"),
        "type": req.type,
        "ip":data.ip,
        "account_id":req.account_id
    }

      
      creditActivity(logsReq)

    });
  }

  const submitCreditData = (accountId) => {
    let selectedAccountValue = submitAmountMap[accountId].toString();

    let req = {
      account_id: accountId,
      user_id: localStorage.getItem("userId"),
      type:
        submitAmountMap[accountId].toString().indexOf("-") > -1
          ? "withdrawal"
          : "deposit",
      amount:
        submitAmountMap[accountId].toString().indexOf("-") > -1
          ? submitAmountMap[accountId] * -1
          : submitAmountMap[accountId],
    };



    depositWithdrawal(req).then((res) => {
      let accountListData = JSON.parse(JSON.stringify(accountListState));
      let accountDetailsIndex = accountListState.findIndex(
        (e) => e.clientId == accountId
      );
      const role = localStorage.getItem("userRole");
			if(role == 2){

				setLogs(req)
			}

      if (accountDetailsIndex > -1) {
        const val = submitAmountMap[accountId];
        const currentVal = accountListData[accountDetailsIndex].credit
          ? accountListData[accountDetailsIndex].credit.toString()
          : "0";

        console.log(currentVal);
        // accountListData[accountDetailsIndex].credit =  accountListData[accountDetailsIndex].credit ?  parseInt(accountListData[accountDetailsIndex].credit) : "0"
        accountListData[accountDetailsIndex].credit = (
          parseInt(currentVal.split(",").join("")) + parseInt(val)
        ).toString();

        let updatedAccount = JSON.parse(JSON.stringify(submitAmountMap));

        delete updatedAccount[accountId];

        const idx = `${accountId}_id`;
        document.getElementById(idx).value = null;

        setSubmitAmountMap(updatedAccount);
        var s = document.getElementById(idx);
        s.value = "";

        setAccountListState(accountListData);

        dispatch(updateAccountList(accountListData));
        
      }
    });
  };

  useEffect(() => {
   getAccountListByUserId({user_id: localStorage.getItem("userId")})
    getAccountList({user_id: localStorage.getItem("userId")});
  }, []);


  useEffect(() => {
    // runs on location, i.e. route, change
    // console.log('handle route change here', location)\
    dispatch(resetAccountList());
  }, [location])



  const onSubmit = values => {
    getAccountList({ "account_id":values, user_id: localStorage.getItem("userId")});
  };


  const SelectWithMemo = React.useMemo(() => (
    <Select name="account_id" className="w-250" placeholder="Select Login Id" showSearch
      onChange={onSubmit}
    >
      {
        accountListIds && accountListIds.length > 0 && accountListIds.map(elm => (
          <Option key={elm} value={elm}>{elm}</Option>
        ))
      }
    </Select>
  ), [accountListIds]);


  useEffect(() => {
    allAccountList = accountList;
    setAccountListState(accountList);
  }, [accountList]);

  useEffect(() => {
    if (
      userBalanceAndEquity?.status &&
      userBalanceAndEquity?.status === "success"
    )
      setBalanceAndEquity([userBalanceAndEquity]);
    else setBalanceAndEquity({});
  }, [userBalanceAndEquity]);

  return (
    <>
      <div>
      <div className="text-right">
                  {loading && <LoadingOutlined />}
                </div>
                <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Card title="Accounts">
             
                <Form 
                  layout="inline"
                  name="deals-form"
                  form={form}
                  initialValues={initialCredential}
                >
              <Form.Item name="account_id" label="Select Account" rules={[
              {
                required: true,
                message: 'Please input your Login Id',
              }
            ]}>
              {SelectWithMemo}
              {/* <Select name="account_id" className="w-250" placeholder="Select Login Id" showSearch
                onChange={onSubmit}
              >
                {
                  accountListIds && accountListIds.length > 0 && accountListIds.map(elm => (
                    <Option key={elm} value={elm}>{elm}</Option>
                  ))
                }
              </Select> */}
            </Form.Item>
                  <Form.Item>
                    {/* <Button
                      type="primary"
                      className="mt-4"
                      htmlType="submit"
                      
                      loading={loadingEquity}
                    >
                      Search
                    </Button> */}
                       { form.getFieldValue('account_id') && 
                    <Button
                    type="link"
                    onClick={viewAllAccount}
                    className="ant-btn-theme text-white rounded-6px mt-40"
                >
                    View All Accounts
                </Button>
}

                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24}>
            {Array.isArray(accountListState) && accountListState.length > 0 && (
              <Card title="Accounts">
                {/* {pathSnippets && pathSnippets != "search" && (
                  <div className="text-right my-3">
                    <Button
                      default
                      className="ant-btn-theme text-white rounded-6px ml-3"
                      onClick={() => {
                        refresh();
                      }}
                    >
                      Refresh
                    </Button>
                  </div>
                )} */}
                <Row gutter={16}>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    className="justify-content-end d-flex mb-3"
                  >
                    <AntTableSearch onSearch={handleTableSearch} />
                  </Col>
                  <Col xs={24} sm={24} md={25}>
                    <div className="table-responsive">
                      <Table
                        columns={accountTableColumns}
                        dataSource={accountListState}
                        rowKey="clientId"
                        scroll={{ x: 1200 }}
                        summary={(pageData) => {
                          return (
                            <>
                               {pathSnippets && pathSnippets != "search" &&
                              <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>
                                  Total
                                </Table.Summary.Cell>
                                <Table.Summary.Cell
                                  index={1}
                                ></Table.Summary.Cell>
                                <Table.Summary.Cell index={2}>
                                  <Text type="#000000">{totalBalance}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                  <Text type="#000000">{totalCredit}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={4}>
                                  <Text type="#000000">{totalEquity}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={5}>
                                  <Text type="#000000">{totalM2m}</Text>
                                </Table.Summary.Cell>
                              </Table.Summary.Row>}
                            </>
                          );
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </Card>
            )}
          </Col>
        </Row>
        {accountsEditModal && <AccountEditModal  isVisible={accountsEditModal}
                        onHide={onHide} editableItem={editableItem} updateAccount={onAccountUpdate} ></AccountEditModal>}
        {accountsDisableModal && <DisableAccountModal isVisible={accountsDisableModal}
                                        onHide={handleAccountsDisableModal} editableItem={editableItem} disableAccount={onDisableAccount} ></DisableAccountModal>}
        {/* {!Array.isArray(accountListState) && (
            <Row gutter={16}>
              <Col xs={10} sm={24} md={25}>
                <Button type="dashed" block>
                  No data found
                </Button>
              </Col>
            </Row>
          )} */}
      </div>
    </>
  );
};

const mapStateToProps = ({ credit, deals,  users}) => {
  const { loading, accountList } = credit;
  const { usersClientList} = users;
  const { getUserBalanceAndEquity, loadingEquity, userBalanceAndEquity } =
    deals;
  return {
    loading,
    accountList,
    usersClientList,
    getAccountListByClient,
    getUserBalanceAndEquity,
    loadingEquity,
    userBalanceAndEquity,
  };
};

const mapDispatchToProps = {
  getAccountList,
  getAccountListByUserId,
  getAccountListByClient,
  getUserBalanceAndEquity,
  depositWithdrawal,
  creditActivity,
  accountUpdate,
  accountDisable,
  referesAccountList
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(React.memo(UserBalanceAndEquity));




function WithNavigate(props) {
  let navigate = useNavigate()
  let params = useParams()
  return <UserBalanceAndEquity {...props} navigate={navigate} params={params} />
}
export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate)