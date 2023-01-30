import React, { useEffect, useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form, DatePicker, Select, Table } from 'antd';
import { connect } from 'react-redux';
import { getAccountList } from 'store/slices/creditSlice';
import { getUserBalanceAndEquity } from 'store/slices/dealsSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { userEquityTableColumns } from 'constants/constant';

const { Option } = Select;
export const UserBalanceAndEquity = props => {
const { getAccountList, loading, accountList, getUserBalanceAndEquity, loadingEquity, userBalanceAndEquity} = props;
const [accountListState, setAccountListState] = useState([]);
const [balanceAndEquity, setBalanceAndEquity] = useState([]);

const initialCredential = {
  account_id: ''
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
    {!loading ? <div>
    <Row gutter={16}>
        <Col xs={10} sm={24} md={25}>
          <Card title="Get user Equity and Balance">
          <Form 
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
            </Form>
          </Card>
        </Col>
      </Row>
      {Array.isArray(balanceAndEquity) && balanceAndEquity.length > 0 && <Row gutter={16}>
        <Col xs={10} sm={24} md={25}>
          <div className="table-responsive">
          <Table 
            columns={userEquityTableColumns} 
            dataSource={balanceAndEquity} 
            rowKey='id'
            scroll={{x:1200}}
          />
        </div>
        </Col>
      </Row>}
      {!Array.isArray(balanceAndEquity) && <Row gutter={16}>
        <Col xs={10} sm={24} md={25}>
          <Button type="dashed" block>No data found</Button>
        </Col>
      </Row>}
    </div> : <LoadingOutlined />}
     
  </>
  )
}

const mapStateToProps = ({credit, deals}) => {
	const { loading, accountList } = credit;
	const { getUserBalanceAndEquity, loadingEquity, userBalanceAndEquity } = deals;
  return { loading, accountList, getUserBalanceAndEquity, loadingEquity, userBalanceAndEquity }
}

const mapDispatchToProps = {
	getAccountList,
  getUserBalanceAndEquity
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(UserBalanceAndEquity))
