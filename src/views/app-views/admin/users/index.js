import React, { useEffect, useMemo, useState } from "react";
import utils from "utils";
import { PlusCircleOutlined, EditOutlined , StopOutlined } from "@ant-design/icons";
import AccountEditModal from "./editAccount";
import DisableAccountModal from "./disableAccount";
import ImportUsers from "./importUsers";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Row,
  Col,
  Card,
  Form,
  Select,
  Table,
  Typography,Tooltip, Switch, 
  Badge
} from "antd";

import { AntTableSearch } from "../../../../components/shared-components/AntTableSearch";
import { connect, useDispatch } from "react-redux";
import { getUserBalanceAndEquity } from "store/slices/dealsSlice";
import { 
  getAccountIdList,  
} from "store/slices/creditSlice";
import {getAllUsers,
  accountUpdate,
  accountCreate,
  updateUserInState,
  accountDisable} from "store/slices/usersSlice";

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

export const Users = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const nameValue = Form.useWatch('account_id', form);
  const {
    getAccountList, 
    getAccountIdList,
    loading,
    accountList,
    accountIdList,  
    usersList,
    accountCreate, 
    accountUpdate,
    accountDisable,
    getAllUsers
  } = props;

 console.log("nameValue", nameValue)
 
  const [accountListState, setAccountListState] = useState([]);
  const [accountListIds, setaccountListIds] = useState([]);
 
  const [editableItem, setEditableItem] = useState(null);
  const [accountsEditModal, setAccountEditModal] = useState(false);
  const [importUserModal, setImportUserModal] = useState(false);
  
  const [accountsDisableModal, setAccountDisableModal] = useState(false);
  let accountTableColumns = [
    {
      title: "Login",
      dataIndex: "meta_id",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => utils.antdTableSorter(a, b, "meta_id"),
      render: (_, elm) => {
        return {
          props: {
           //// style: { background: elm.color, color: elm.color && elm.color == 'white' ? '#000' : elm.color ? '#fff' : "#000"},
          },
          children:  <div className="table-padding-cover">{elm.meta_id}</div>

        }
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
      render: (_, elm) => {
        return {
          props: {
           //// style: { background: elm.color, color: elm.color && elm.color == 'white' ? '#000' : elm.color ? '#fff' : "#000"},
          },
          children:  <div className="table-padding-cover">{elm.name}</div>

        }
      }
    },
    {
      title: "Clients",
      dataIndex: "client_list",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => utils.antdTableSorter(a, b, "client_list"),
      render: (_, elm) => {
        return {
          props: {
           //// style: { background: elm.color, color: elm.color && elm.color == 'white' ? '#000' : elm.color ? '#fff' : "#000"},
          },
          children:  <div className="table-padding-cover">
              {elm.client_list.split(",").map(function(item, i){
                  return  <span className="custom-badge border px-2 py-1  rounded-pill mr-1"> {item} </span>  
                })}
            </div>

        }
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => utils.antdTableSorter(a, b, "email"),
      render: (_, elm) => {
        return {
          props: {
            //////// style: { background: elm.color, color: elm.color && elm.color == 'white' ? '#000' : elm.color ? '#fff' : "#000"},
          },
          children:  <div className="table-padding-cover">{elm.email}</div>

        }
      }
    },
    {
      title: "Group",
      dataIndex: "user_group",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => utils.antdTableSorter(a, b, "user_group"),
      render: (_, elm) => {
        return {
          props: {
           //// style: { background: elm.color, color: elm.color && elm.color == 'white' ? '#000' : elm.color ? '#fff' : "#000"},
          },
          children:  <div className="table-padding-cover">{elm.user_group}</div>

        }
      }
    },
    {
      key: 'edit',
      title: "Action",
      render: (_, elm) => {
        return {
          props: {
           //// style: { background: elm.color, color: elm.color && elm.color == 'white' ? '#000' : elm.color ? '#fff' : "#000"},
          },
          children:   <>
        
          <Button
            type=""
            onClick={(e) => {
              handleEditModalVisiblity(true, elm);
            }}
            className="ant-btn-theme text-white rounded-6px rounded-pill mr-3" icon={<EditOutlined />}
          >
          </Button>
  
  
          {/* <Button
            size="small"
            onClick={(e) => {
              handleAccountsDisableModal(true, elm);
            }}
            icon={<StopOutlined />}
            className="ant-btn-theme text-white rounded-6px rounded-pill ml-2" >
            
          </Button> */}

<Tooltip title="Status">
            <Switch checkedChildren="Active" unCheckedChildren="DeActive" checked={elm.status == 1} onClick={() => {
             handleAccountsDisableModal(true, elm)
            }} />
          </Tooltip>
          </> 
        }
      }
    }
  ];

  const getClientArray=(string)=>{

  }

  useEffect(() => {
    if (accountIdList?.length > 0) {
      let accountIds = [...accountIdList]
      accountIds.sort(function (a, b) {
        return a - b;
      });
      setaccountListIds(accountIds)
    }
  }, [accountIdList])

  useEffect(() => {
    const interval = setInterval(() => { 
      let account_id = form.getFieldValue('account_id')
      
      if(!account_id) {

        // referesAccountList()
      }
    
    }, 7000);
    return () => {
      clearInterval(interval);
    };
  
  }, []);

   
 
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

 
  const onHide = () => {
    setAccountEditModal(false);
    setEditableItem(null)
}


const handleEditModalVisiblity = (value, item) => {
  setEditableItem(item)
  setAccountEditModal(value) 
};


const handleImportUser = (value) => {
  console.log("value", value)
  setImportUserModal(value) 
};

  
  const handleAccountsDisableModal = (value, item) => {
    setEditableItem(item)

    if(window.confirm("do you really want to disable the account")){
      console.log('disableAccount', item);
      const req = {
        "user_id": item.meta_id,
        "status": item.status == 1? 0: 1
    }
       accountDisable(req).then((res)=>{
               
        let usersListToUpdate = JSON.parse(JSON.stringify(usersList))
      
        for(let i=0; i < usersListToUpdate.length;i++){
            if(usersListToUpdate[i].email == item.email){
              usersListToUpdate[i].status = req.status
            }
        }

        dispatch(updateUserInState(usersListToUpdate))


    })
    }
  
 
    // setAccountDisableModal(value) 
  };
  
  const onAccountUpdate=(req, editEmail)=>{

   
    let data = new FormData();
    data.append('email', req.email);
    data.append('meta_id', req.meta_id);
    data.append('role_id', 2);
    data.append('name', req.name);
    data.append('group', req.group);
    data.append('color', req.color);
    data.append('pwd', req.password);
    data.append('conf_pwd', req.password);
    data.append('client_list', req.assignedAccount.toString());
    
    if(editEmail){

      let editEmailClientId = usersList.find((e)=> e.email == editEmail)
      data.append("client_id", editEmailClientId.id)
      accountUpdate(data).then((response)=>{
      
        let usersListToUpdate = JSON.parse(JSON.stringify(usersList))
      
        for(let i=0; i < usersListToUpdate.length;i++){
            if(usersListToUpdate[i].email == req.email){
              usersListToUpdate[i].color = req.color
              usersListToUpdate[i].name = req.name
              usersListToUpdate[i].group = req.group
              usersListToUpdate[i].client_list = req.assignedAccount.toString()
            }
        }

        dispatch(updateUserInState(usersListToUpdate))
        onHide(); 
        // getAllUsers()
      })
    }else {
      
    accountCreate(data).then((response)=>{
      onHide();
      let usersListToUpdate = JSON.parse(JSON.stringify(usersList))
      // getAllUsers()
    })
    }
  }

  
  const onDisableAccount=(accountInfo)=>{
    console.log('disableAccount', accountInfo);

    accountDisable(accountInfo).then((res)=>{
      handleAccountsDisableModal()
    })
  }
 
 

  useEffect(() => {
    getAccountIdList()
    getAllUsers()
  }, []);

 

  useEffect(() => {
    allAccountList = accountList;
    setAccountListState(accountList);
  }, [accountList]);

 
  return (
    <>
      <div>
      <div className="text-right px-3 py-3">
                <Button
                    type=""
                    onClick={(e) => {
                      handleEditModalVisiblity(true);
                    }}
                    className="ant-btn-theme text-white rounded-6px"
                >
                    <PlusCircleOutlined /> Add Manager
                </Button>
                <Button
                    type=""
                    onClick={(e) => {
                      handleImportUser(true);
                    }}
                    className="ant-btn-theme text-white rounded-6px"
                >
                    <PlusCircleOutlined /> Import Managers
                </Button>
                
            </div>
      <div className="text-right">
                  {loading && <LoadingOutlined />}
                </div>
             
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24}>
            {Array.isArray(accountListState) && accountListState.length > 0 && (
              <Card title="Accounts">
               
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
                   
                    </div>
                  </Col>
                </Row>
              </Card>
            )}

            
      {Array.isArray(usersList) && usersList.length > 0 && 
        <Card title="Users">
          <div className="table-responsive">
            <Table
              columns={accountTableColumns}
              dataSource={usersList}
              rowKey='id'
              scroll={{ x: 1200 }}
        
            />
          </div>
        </Card>
      }
      
          </Col>
        </Row>
        {accountsEditModal && <AccountEditModal  isVisible={accountsEditModal}
                        onHide={onHide} editableItem={editableItem} updateAccount={onAccountUpdate}  accountListIds={accountIdList}></AccountEditModal>}
        {accountsDisableModal && <DisableAccountModal isVisible={accountsDisableModal}
                                        onHide={handleAccountsDisableModal} editableItem={editableItem} disableAccount={onDisableAccount} ></DisableAccountModal>}
       
       {importUserModal && <ImportUsers isVisible={importUserModal}
                                        onHide={handleImportUser}></ImportUsers>}
       
       
       
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

const mapStateToProps = ({ credit, deals, users }) => {
  const { loading, accountList, accountIdList } = credit;
  const { getUserBalanceAndEquity, loadingEquity, userBalanceAndEquity } =
    deals;
    const { usersList } = users;
  return {
    loading,
    accountList,
    usersList,
    accountIdList, 
    getUserBalanceAndEquity,
    loadingEquity,
    userBalanceAndEquity,
  };
};

const mapDispatchToProps = {
  getAccountIdList, 
  getAllUsers, 
  getUserBalanceAndEquity, 
  accountUpdate,
  accountCreate,
  accountDisable
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(React.memo(UserBalanceAndEquity));




function WithNavigate(props) {
  let navigate = useNavigate()
  let params = useParams()
  return <Users {...props} navigate={navigate} params={params} />
}
export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate)