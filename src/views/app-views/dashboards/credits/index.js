import React, { useEffect, useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form, InputNumber, Select } from 'antd';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { 
	getAccountList,
  depositWithdrawal
} from 'store/slices/creditSlice';
import { creditTypes } from 'constants/constant';

const { Option } = Select;
export const CreditDashboard = props => {
const { getAccountList, loading, accountList, depositWithdrawal, creditLoading } = props;
const [accountListState, setAccountListState] = useState([]);

const initialCredential = {
  account_id: '',
  type: 'Credit In',
  amount: null
}

const onSubmit = values => {
  console.log(values,'values<<<');
  depositWithdrawal(values)
};

  useEffect(()=>{
    if(accountList?.length === 0){
      getAccountList()
    }
  },[])

  useEffect(()=>{
    if(accountList?.length > 0){
      console.log('accountLit', accountList)
      let accountIds =  accountList.map((e)=>e.clientId)
      accountIds.sort(function(a, b) {
        return a - b;
      });
      
      setAccountListState(accountIds)
    }
  },[accountList])


  return (
		<>
      {!loading ? <div>
        <Row gutter={16}>
        <Col xs={10} sm={24} md={25}>
          <Card title="Get Credit Info">
          <Form 
            layout="horizontal" 
            name="credit-form" 
            initialValues={initialCredential}
            onFinish={onSubmit}
          >
            <Form.Item name="account_id" label="Select Login Id" rules={[
                { 
                  required: true,
                  message: 'Please input your amount',
                }
              ]}>
              <Select className="w-100" placeholder="Select Login Id" showSearch
              >
                {
                  accountListState && accountListState.length > 0 && accountListState.map(elm => (
                    <Option key={elm} value={elm}>{elm}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item name="type" label="Credit Type" rules={[
                { 
                  required: true,
                  message: 'Please input your amount',
                }
              ]}>
              <Select className="w-70" placeholder="Credit Type">
                {
                  creditTypes.map(elm => (
                    <Option key={elm.value} value={elm.value}>{elm.label}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item name="amount" label="Amount" rules={[
                { 
                  required: true,
                  message: 'Please input your amount',
                }
              ]}>
              <InputNumber className="w-100" placeholder="Enter Amount"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={creditLoading}>
                Submit
              </Button>
            </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      </div> : <LoadingOutlined />}
  </>
  )
}

const mapStateToProps = ({credit}) => {
	const { loading, accountList, creditLoading } = credit;
  return { loading, accountList, creditLoading }
}

const mapDispatchToProps = {
	getAccountList,
  depositWithdrawal
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(CreditDashboard))
