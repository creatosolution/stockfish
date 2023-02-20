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
  getAccountIdList,
  getAccountListByClient,
  depositWithdrawal,
  updateAccountList,
  resetAccountList,
  accountUpdate,
  accountDisable
} from "store/slices/creditSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
const { Text } = Typography;
const { Option } = Select;

let allAccountList = [];

export const UserBalanceAndEquity = (props) => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((i) => i);
  const pathSnippets = paths[paths.length - 1];
  const dispatch = useDispatch();
  const {
    getAccountList,
    getAccountListByClient,
    getAccountIdList,
    loading,
    accountList,
    accountIdList,
    getUserBalanceAndEquity,
    loadingEquity,
    userBalanceAndEquity,
    depositWithdrawal,
    accountUpdate,
    accountDisable
  } = props;
 
 
  const [accountListState, setAccountListState] = useState([]);
  const [accountListIds, setaccountListIds] = useState([]);
  const [balanceAndEquity, setBalanceAndEquity] = useState([]);
  const [submitAmountMap, setSubmitAmountMap] = useState({});
  const [editableItem, setEditableItem] = useState(null);
  const [accountsEditModal, setAccountEditModal] = useState(false);
  const [accountsDisableModal, setAccountDisableModal] = useState(false);
  const totalCredit = utils.transFormCurrency(accountListState && accountListState.length ? accountListState.reduce((sum, item) => sum + parseInt(item.credit ? item.credit.replaceAll(",", "") : "0"), 0) : 0);
  const totalBalance = utils.transFormCurrency(accountListState && accountListState.length ? accountListState.reduce((sum, item) => sum + parseInt(item.balance ? item.balance.replaceAll(",", "") : "0"), 0) : 0);
  const totalEquity = utils.transFormCurrency(accountListState && accountListState.length ? accountListState.reduce((sum, item) => sum + parseInt(item.equity ? item.equity.replaceAll(",", "") : "0"), 0) : 0);
  const totalM2m = utils.transFormCurrency(accountListState && accountListState.length ? accountListState.reduce((sum, item) => sum + parseInt(item.m2m ? item.m2m.replaceAll(",", "") : "0"), 0) : 0)
 

  console.log("pathSnippets", pathSnippets);

  const initialCredential = {
    account_id: ''
  }

  useEffect(() => {
    if (pathSnippets == "search" && accountIdList?.length > 0) {
      let accountIds = [...accountIdList]
      accountIds.sort(function (a, b) {
        return a - b;
      });
      setaccountListIds(accountIds)
    }
  }, [accountIdList])


  const viewAllAccount = ()=>{
    let path = `/app/dashboards/equityAndBalance/`;
    props.navigate(path)
  }
  const handleTableSearch = (searchText) => {
    if (!allAccountList || !allAccountList.length) {
      return;
    }
    const filteredEvents = allAccountList.filter(({ clientName, clientId }) => {
      clientName = clientName.toLowerCase();
      clientId = clientId.toString();
      return clientId.includes(searchText) || clientName.includes(searchText);
    });

    setAccountListState(filteredEvents);
  };

  let accountTableColumns = [
    {
      title: "Client id",
      dataIndex: "clientId",
      sorter: (a, b) => utils.antdTableSorter(a, b, "clientId"),
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      sorter: (a, b) => utils.antdTableSorter(a, b, "clientName"),
    },
    // {
    //     title: 'Group Name',
    //     dataIndex: 'groupName',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'groupName')
    // },
    {
      title: "Balance",
      dataIndex: "balance",
      sorter: (a, b) => utils.antdTableSorter(a, b, "balance"),
    },
    {
      title: "Credit",
      dataIndex: "credit",
      sorter: (a, b) => utils.antdTableSorter(a, b, "credit"),
    },
    {
      title: "Equity",
      dataIndex: "equity",
      sorter: (a, b) => utils.antdTableSorter(a, b, "equity"),
    },
    {
      title: "M2M",
      dataIndex: "m2m",
      className: "bg-gray-lighter",
      render: (_, elm) => (
        <div className="table-padding-cover">{getM2m(elm)}</div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "m2m"),
    },
    {
      title: "Credit In / Credit Out",
      dataIndex: "clientIdd",
      render: (_, elm) => (
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
      ),
    }
    // {
    //   key: 'edit',
    //   title: "Action",
    //   render: (_, elm) => (
    //     <>
        
    //     <Button
    //       type=""
    //       onClick={(e) => {
    //         handleEditModalVisiblity(true, elm);
    //       }}
    //       className="ant-btn-theme text-white rounded-6px rounded-pill" icon={<EditOutlined />}
    //     >
    //     </Button>


    //     <Button
    //       size="small"
    //       onClick={(e) => {
    //         handleAccountsDisableModal(true, elm);
    //       }}
    //       icon={<StopOutlined />}
    //       className="ant-btn-theme text-white rounded-6px rounded-pill ml-2" >
          
    //     </Button>
    //     </>
    //   ),
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
    getAccountList();
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
        getAccountList();
  
      }
    })
  }

  
  const onDisableAccount=(accountInfo)=>{
    console.log('disableAccount', accountInfo);
    accountDisable(accountInfo).then((res)=>{
      console.log("accountDisable", res);
    })
  }

  const getM2m = (info) => {
    let equity = info.equity ? info.equity.replaceAll(",", "") : 0;
    let credit = info.credit ? info.credit.replaceAll(",", "") :0;

    let m2m =  utils.transFormCurrency((parseInt(equity) - parseInt(credit)),   "INR")

    // m2m = m2m.replace("₹", "");
    return m2m;
  };

  const submitCreditData = (accountId) => {
    let selectedAccountValue = submitAmountMap[accountId].toString();

    let req = {
      account_id: accountId,
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
    if (pathSnippets && pathSnippets == "search") {
      getAccountIdList()
    }  else {
      getAccountList();

    }
  }, []);


  useEffect(() => {
    // runs on location, i.e. route, change
    // console.log('handle route change here', location)\
    dispatch(resetAccountList());
  }, [location])

  const onSubmit = values => {
   
    getAccountListByClient({
      "account_id":values
    })
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
  ), [accountIdList]);

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
        {pathSnippets && pathSnippets == "search" && (
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Card title="Accounts">
             
                <Form layout="inline" name="deals-form"
                  initialValues={initialCredential}
               
                >
              <Form.Item name="account_id" label="Select Account" rules={[
              {
                required: true,
                message: 'Please input your Login Id',
              }
            ]}>
              {SelectWithMemo}
            </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      className="mt-4"
                      htmlType="submit"
                      
                      loading={loadingEquity}
                    >
                      Search
                    </Button>
                    
                    <Button
                    type="link"
                    onClick={viewAllAccount}
                    className="ant-btn-theme text-white rounded-6px ml-4 ml-auto"
                >
                    View All Accounts
                </Button>


                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24}>
            {Array.isArray(accountListState) && accountListState.length > 0 && (
              <Card title="Accounts">
                {pathSnippets && pathSnippets != "search" && (
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
                )}
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
        {accountsDisableModal && <DisableAccountModal  isVisible={accountsDisableModal}
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

const mapStateToProps = ({ credit, deals }) => {
  const { loading, accountList, accountIdList } = credit;
  const { getUserBalanceAndEquity, loadingEquity, userBalanceAndEquity } =
    deals;
  return {
    loading,
    accountList,
    accountIdList,
    getAccountListByClient,
    getUserBalanceAndEquity,
    loadingEquity,
    userBalanceAndEquity,
  };
};

const mapDispatchToProps = {
  getAccountList,
  getAccountIdList,
  getAccountListByClient,
  getUserBalanceAndEquity,
  depositWithdrawal,
  accountUpdate,
  accountDisable
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