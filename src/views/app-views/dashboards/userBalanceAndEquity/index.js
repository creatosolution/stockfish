import React, { useEffect, useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form, Input, Select, Table } from 'antd';
import { connect } from 'react-redux';
import { getUserBalanceAndEquity } from 'store/slices/dealsSlice';
import { 
	getAccountList,
  depositWithdrawal
} from 'store/slices/creditSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { userEquityTableColumns, accountColumns } from 'constants/constant';

import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";

export const UserBalanceAndEquity = props => {
const { getAccountList, loading, accountList, getUserBalanceAndEquity, loadingEquity, userBalanceAndEquity, depositWithdrawal} = props;
const [accountListState, setAccountListState] = useState([]);
const [balanceAndEquity, setBalanceAndEquity] = useState([]);
const [submitAmountMap, setSubmitAmountMap] = useState({});
let accountTableColumns = [...accountColumns]

// const initialCredential = {
//   account_id: ''
// }

accountTableColumns.push({
  title: 'Credit In / Credit Out',
  dataIndex: 'clientId',
  render: (_, elm) => (
    <div className="d-flex">
       <Input
        placeholder="Amount"
        onChange={(e)=>handleChangeAmount(e, elm.clientId)}
        maxLength={16}
        value={submitAmountMap[elm.clientId]}
        style={{ width: 90 }}
      />

<Button default className="ant-btn-theme text-white rounded-6px ml-3" icon={<PlusCircleOutlined />} size="small" onClick={() => {
              submitCreditData(elm.clientId)
            }} >Save</Button>
    </div>
  )
})

const handleChangeAmount =(e, accountId)=>{
  console.log(e.target.value, accountId);
  submitAmountMap[accountId] = e.target.value;

  setSubmitAmountMap(submitAmountMap)
  

}

const submitCreditData=(accountId)=>{
  let req = {
    account_id: accountId,
    type: submitAmountMap[accountId].toString().indexOf('-') > -1 ? "withdrawal" : 'deposit',
    amount: submitAmountMap[accountId]
  }
  depositWithdrawal(req).then((res)=>{
    delete submitAmountMap[accountId]
    getAccountList()
  })

  console.log('req', submitAmountMap[accountId].toString().indexOf('-'), req);
}
const onSubmit = values => {
  
  getUserBalanceAndEquity(values)
};



  useEffect(()=>{
    if(accountList?.length === 0){
      getAccountList()
    }
  },[])

  useEffect(()=>{
    if(accountList?.length > 0){
      setAccountListState(accountList)
    }
  },[accountList])

  useEffect(()=>{

    if(userBalanceAndEquity?.status && userBalanceAndEquity?.status === "success")
      setBalanceAndEquity([userBalanceAndEquity])
    else
      setBalanceAndEquity({})

  },[userBalanceAndEquity])



  return (
    <>
      {!loading ? (
        <div>
          <Row gutter={16}>
            <Col xs={10} sm={24} md={25}>
              <Card title="Accounts">
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
                {Array.isArray(accountListState) &&
                  accountListState.length > 0 && (
                    <Row gutter={16}>
                      <Col xs={10} sm={24} md={25}>
                        <div className="table-responsive">
                          <Table
                            columns={accountTableColumns}
                            dataSource={accountListState}
                            rowKey="id"
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
      ) : (
        <LoadingOutlined />
      )}
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
