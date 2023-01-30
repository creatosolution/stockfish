import React, { useEffect, useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form, InputNumber, Select } from 'antd';
import { connect } from 'react-redux';
import { 
	getAccountList
} from 'store/slices/creditSlice';

const { Option } = Select;
export const CreditDashboard = props => {
const { getAccountList, loading, accountList } = props;
const [accountListState, setAccountListState] = useState([]);

const initialCredential = {
  loginId: '',
  creditTtype: 'Credit In',
  amount: null
}

const tags = ['Credit In', 'Credir Out']

const onSubmit = values => {
  console.log(values,'values<<<')
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


  return (
		<>
      <Row gutter={16}>
        <Col xs={10} sm={24} md={25}>
          <Card title="Get Credit Info">
          <Form 
            layout="horizontal" 
            name="credit-form" 
            initialValues={initialCredential}
            onFinish={onSubmit}
          >
            <Form.Item name="loginId" label="Select Login Id" rules={[
                { 
                  required: true,
                  message: 'Please input your amount',
                }
              ]}>
              <Select className="w-100" placeholder="Select Login Id">
                {
                  accountListState && accountListState.length > 0 && accountListState.map(elm => (
                    <Option key={elm} value={elm}>{elm}</Option>
                  ))
                }
              </Select>
              <Button type="secondary" htmlType="submit" block loading={loading}></Button>
            </Form.Item>
            <Form.Item name="creditTtype" label="Credit Type" rules={[
                { 
                  required: true,
                  message: 'Please input your amount',
                }
              ]}>
              <Select className="w-70" placeholder="Credit Type">
                {
                  tags.map(elm => (
                    <Option key={elm} value={elm}>{elm}</Option>
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
              <Button type="primary" htmlType="submit" >
                Submit
              </Button>
            </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
  </>
  )
}

const mapStateToProps = ({credit}) => {
	const { loading, accountList } = credit;
  return { loading, accountList }
}

const mapDispatchToProps = {
	getAccountList
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(CreditDashboard))
