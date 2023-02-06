import React, { useEffect, useMemo, useState,  } from 'react'

import { notification } from 'antd';
import utils from 'utils'
import { Button, Row, Col, Card, Form, Input,InputNumber, Select, Table } from 'antd';
import {AntTableSearch} from '../../../../components/shared-components/AntTableSearch'
import { connect, useDispatch } from 'react-redux';
import { getUserBalanceAndEquity } from 'store/slices/dealsSlice';
import { 
	getAccountList,
  depositWithdrawal,
  updateAccountList
} from 'store/slices/creditSlice';
import { LoadingOutlined } from '@ant-design/icons';

import { userEquityTableColumns, accountColumns } from 'constants/constant';

import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";

let allAccountList = []
export const UserBalanceAndEquity = props => {
  const dispatch = useDispatch();
const { getAccountList, loading, accountList, getUserBalanceAndEquity, loadingEquity, userBalanceAndEquity, depositWithdrawal} = props;
const [accountListState, setAccountListState] = useState([]);
const [balanceAndEquity, setBalanceAndEquity] = useState([]);
const [submitAmountMap, setSubmitAmountMap] = useState({});


// const initialCredential = {
//   account_id: ''
// }



const handleSearch = searchText => {
  if(!allAccountList || !allAccountList.length){
      return;
  }
  const filteredEvents = allAccountList.filter(({ clientName, clientId }) => {
    clientName = clientName.toLowerCase();
    clientId = clientId.toString();
    return  clientId.includes(searchText) ||  clientName.includes(searchText);
  });


  setAccountListState(filteredEvents);
  
};


let accountTableColumns = [
  {
      title: 'Client id',
      dataIndex: 'clientId',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'clientId')
  },
  {
      title: 'Client Name',
      dataIndex: 'clientName',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'clientName')
  },
  {
      title: 'Group Name',
      dataIndex: 'groupName',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'groupName')
  },
  {
      title: 'Balance',
      dataIndex: 'balance',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'balance')
  },
  {
      title: 'Credit',
      dataIndex: 'credit',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'credit')
  },
  {
      title: 'Equity',
      dataIndex: 'equity',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'equity')
  },
  {
      title: 'M2M',
      dataIndex: 'm2m',
      className: "bg-gray-lighter",
      render: (_, elm) => (
        <div className="table-padding-cover">
          {getM2m(elm)}
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'm2m')
  },{
    title: 'Credit In / Credit Out',
    dataIndex: 'clientIdd',
    render: (_, elm) => (
      <div className="d-flex">
         <input
          placeholder="Amount"
          type="number"
          className='ant-input css-ixblex'
          id={elm.clientId.toString()+"_id"}
          onChange={(e)=>handleChangeAmount(e, elm.clientId)}
          style={{ width: 90 }}
         />
  
  <Button default className="ant-btn-theme text-white rounded-6px ml-3" icon={<PlusCircleOutlined />} size="small" onClick={() => {
                submitCreditData(elm.clientId)
              }} >Submit</Button>
      </div>
    )
  }
]

const refresh=()=>{
  getAccountList()
}

const handleChangeAmount =(e, accountId)=>{
  console.log(e, accountId);
  submitAmountMap[accountId] = e.target.value;
  setSubmitAmountMap(submitAmountMap)
}


const getM2m=(info)=>{

  let equity = info.equity.replaceAll(",", "")
  let credit = info.credit.replaceAll(",", "")

  let m2m = (parseInt(equity) - parseInt(credit)).toLocaleString('en-IN', { 
		style: 'currency', 
		currency: 'INR' ,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
	}); 

  m2m = m2m.replace("₹", "");
  return m2m
}

const submitCreditData=(accountId)=>{

  let selectedAccountValue = submitAmountMap[accountId].toString();

  let req = {
    account_id: accountId,
    type: submitAmountMap[accountId].toString().indexOf('-') > -1 ? "withdrawal" : 'deposit',
    amount: submitAmountMap[accountId].toString().indexOf('-') > -1 ? submitAmountMap[accountId] * -1 : submitAmountMap[accountId]
  }
  

  depositWithdrawal(req).then((res)=>{
    let accountListData = JSON.parse(JSON.stringify(accountListState));
    let accountDetailsIndex = accountListState.findIndex((e)=> e.clientId == accountId);
    if(accountDetailsIndex > -1){
    
      
      const val = submitAmountMap[accountId]
      const currentVal = accountListData[accountDetailsIndex].credit ? accountListData[accountDetailsIndex].credit.toString() : "0"

      console.log(currentVal);
      // accountListData[accountDetailsIndex].credit =  accountListData[accountDetailsIndex].credit ?  parseInt(accountListData[accountDetailsIndex].credit) : "0"
      accountListData[accountDetailsIndex].credit = (parseInt(currentVal.split(",").join("")) + parseInt(val)).toString();
   
      let updatedAccount  = JSON.parse(JSON.stringify(submitAmountMap))
    
      delete updatedAccount[accountId]
      
      const idx = `${accountId}_id`
      document.getElementById(idx).value = null

      setSubmitAmountMap(updatedAccount) 
      var s = document.getElementById(idx);
            s.value = "";

            
            setAccountListState(accountListData) 


        dispatch(updateAccountList(accountListData))
    }

    
  })
}

  useEffect(()=>{
    getAccountList()
  },[])

  useEffect(()=>{
    allAccountList = accountList;
    setAccountListState(accountList)
  },[accountList])

  useEffect(()=>{

    if(userBalanceAndEquity?.status && userBalanceAndEquity?.status === "success")
      setBalanceAndEquity([userBalanceAndEquity])
    else
      setBalanceAndEquity({})

  },[userBalanceAndEquity])



  return (
    <>
  
        <div>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Card title="Accounts">
                <div className='text-right' >
                {loading && 
                 <LoadingOutlined /> }
                </div>
                {/* <Form 
            layout="inline" 
            name="deals-form" 
            initialValues={initialCredential}
            onFinish={onSubmit}
          >
            <Form.Item name="account_id" label="Select Login Id" rules={[
                { 
                  required: true,
                  message: 'Please input your Login Id',
                }
              ]}>
              <Select name="account_id" className="w-250" placeholder="Select Login Id">
                {
                  accountListState && accountListState.length > 0 && accountListState.map(elm => (
                    <Option key={elm} value={elm}>{elm}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" className='mt-4' htmlType="submit" block loading={loadingEquity}>
                Submit
              </Button>
            </Form.Item>
            </Form> */}

            <div className='text-right my-3'>

            <Button default className="ant-btn-theme text-white rounded-6px ml-3" onClick={() => {
              refresh()
            }} >Refresh</Button>
            </div>
                {Array.isArray(accountListState) &&
                  accountListState.length > 0 && (
                    <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} className="justify-content-end d-flex mb-3">
                      <AntTableSearch onSearch={handleSearch}/>
                      </Col>
                      <Col xs={24} sm={24} md={25}>

       
                        <div className="table-responsive">
                          <Table
                            columns={accountTableColumns}
                            dataSource={accountListState}
                            rowKey="clientId"
                            scroll={{ x: 1200 }}
                          />
                        </div>
                      </Col>
                    </Row>
                  )}
              </Card>
            </Col>
          </Row>

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
}

const mapStateToProps = ({credit, deals}) => {
	const { loading, accountList } = credit;
	const { getUserBalanceAndEquity, loadingEquity, userBalanceAndEquity } = deals;
  return { loading, accountList, getUserBalanceAndEquity, loadingEquity, userBalanceAndEquity }
}

const mapDispatchToProps = {
	getAccountList,
  getUserBalanceAndEquity,
  depositWithdrawal
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(UserBalanceAndEquity))
