import React, { useEffect, useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form, DatePicker, Select, Table } from 'antd';
import { connect } from 'react-redux';
import { getAccountList } from 'store/slices/creditSlice';
import { getDealsList } from 'store/slices/dealsSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { dealsTableColumns } from 'constants/constant';

const { Option } = Select;
export const DealsDashboard = props => {
const { getAccountList, loading, accountList, loadingDeals, dealsList, getDealsList } = props;
const [accountListState, setAccountListState] = useState([]);
const [dealsListState, setDealsListState] = useState([]);

const initialCredential = {
  account_id: '',
  timefrom: '',
  timeto: ''
}

const onSubmit = values => {
  let timefrom = new Date(values.timefrom)
  let timeto = new Date(values.timeto)
  let getDealsObj = {
    account_id: values.account_id,
    timefrom: timefrom.toLocaleDateString().replace("/",'-').replace("/",'-'),
    timeto: timeto.toLocaleDateString().replace("/",'-').replace("/",'-')
  }
  getDealsList(getDealsObj)
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
    if(dealsList && Object.keys(dealsList)?.length > 0){
      let dealsArr = [];
        for (let anObject in dealsList) { 
          dealsArr.push(dealsList[anObject])
      }
      setDealsListState(dealsArr)
    }else{
      setDealsListState({});
    }
  },[dealsList])


  return (
		<>
    {!loading ? <div>
    <Row gutter={16}>
        <Col xs={10} sm={24} md={25}>
          <Card title="Get Deals Info">
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
            <Form.Item name="timefrom" label="Time from" rules={[
                { 
                  required: true,
                  message: 'Please input your Time from',
                }
              ]}>
              <DatePicker className="w-100"/>
            </Form.Item>
            <Form.Item name="timeto" label="Time to" rules={[
                { 
                  required: true,
                  message: 'Please input your Time to',
                }
              ]}>
              <DatePicker className="w-100"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" className='mt-4' htmlType="submit" block loading={loadingDeals}>
                Submit
              </Button>
            </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      {Array.isArray(dealsListState) && dealsListState.length > 0 && <Row gutter={16}>
        <Col xs={10} sm={24} md={25}>
          <div className="table-responsive">
          <Table 
            columns={dealsTableColumns} 
            dataSource={dealsListState} 
            rowKey='id'
            scroll={{x:1200}}
          />
        </div>
        </Col>
      </Row>}
      {!Array.isArray(dealsListState) && <Row gutter={16}>
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
	const { loadingDeals, dealsList } = deals;
  return { loading, accountList, loadingDeals, dealsList }
}

const mapDispatchToProps = {
	getAccountList,
  getDealsList
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(DealsDashboard))
