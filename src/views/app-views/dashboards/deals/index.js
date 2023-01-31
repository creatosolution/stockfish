import React, { useEffect, useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form, DatePicker, Select, Table } from 'antd';
import { connect } from 'react-redux';
import { getAccountList } from 'store/slices/creditSlice';
import { getDealsList } from 'store/slices/dealsSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { dealsTableColumns } from 'constants/constant';
import Loading from 'components/shared-components/Loading';
import moment from "moment";
const { Option } = Select;
export const DealsDashboard = props => {
  
 const [form] = Form.useForm();
const { getAccountList, loading, accountList, loadingDeals, dealsList, getDealsList } = props;
const [accountListState, setAccountListState] = useState([]);
const [dealsListState, setDealsListState] = useState([]);

const initialCredential = {
  account_id: '',
  timefrom: moment(),
  timeto: moment().add(1, 'd')
}

const onSubmit = values => {
  console.log(values);
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
          // console.log('dealsList[anObject]', dealsList[anObject].Time);
          let dealObj = {... dealsList[anObject]}
          let time = moment(new Date(dealObj.Time), 'YYYYMMDD').toString()

          let getOffset = moment(time).utcOffset();
       
          time = `${moment(time).utcOffset(getOffset).format("MMMM") }, ${moment(time).utcOffset(getOffset).format( "DD") }, ${moment(time).utcOffset(getOffset).format("(hh.mm a)") }`;
          dealObj.Time = time
        
          dealsArr.push(dealObj)
      }
      setDealsListState(dealsArr)
    }else{
      setDealsListState({});
    }
  },[dealsList])


  const handleChange=(value)=>{
    console.log('value', form);
    let timefrom = new Date(form.getFieldValue('timefrom'))
    let timeto = new Date(form.getFieldValue('timeto'))
    let account_id  =  form.getFieldValue('account_id')
    let getDealsObj = {
      account_id: account_id,
      timefrom: timefrom.toLocaleDateString().replace("/",'-').replace("/",'-'),
      timeto: timeto.toLocaleDateString().replace("/",'-').replace("/",'-')
    }
    getDealsList(getDealsObj)
  }

  return (
		<>
    {!loading ? <div>
    <Row gutter={16}>
        <Col xs={10} sm={24} md={25}>
          <Card title="Get Deals Info">
          <Form 
            layout="inline" 
            name="deals-form" 
            form={form}
            initialValues={initialCredential}
            onFinish={onSubmit}
          >
            
            <Form.Item name="timefrom" label="Start Date" rules={[
                { 
                  required: true,
                  message: 'Please input your Time from',
                }
              ]}>
              <DatePicker className="w-100"  onChange={handleChange}/>
            </Form.Item>
          
            <Form.Item name="timeto" label="End Date" rules={[
                { 
                  required: true,
                  message: 'Please input your Time to',
                }
              ]}>
              <DatePicker className="w-100"  onChange={handleChange}/>
            </Form.Item>
            
            <Form.Item name="account_id" label="Select Login Id" rules={[
                { 
                  required: true,
                  message: 'Please input your Login Id',
                }
              ]}>
              <Select name="account_id" className="w-250" placeholder="Select Login Id"
              onChange={handleChange}
              >
                {
                  accountListState && accountListState.length > 0 && accountListState.map(elm => (
                    <Option key={elm} value={elm}>{elm}</Option>
                  ))
                }
              </Select>
            </Form.Item>  
            
                {/* <LoadingOutlined/> */}

              
            {/* <Form.Item>
              <Button type="primary" className='mt-4' htmlType="submit" block loading={loadingDeals}>
                Submit
              </Button>
            </Form.Item> */}
            </Form>
          </Card>
        </Col>
      </Row>
      
      {loadingDeals &&  <Loading/>}

      {Array.isArray(dealsListState) && dealsListState.length > 0 && !loadingDeals && <Row gutter={16}>
        <Col xs={10} sm={24} md={25}>
        <Card title="Get Deals Info">
          <div className="table-responsive">
          <Table 
            columns={dealsTableColumns} 
            dataSource={dealsListState} 
            rowKey='id'
            scroll={{x:1200}}
          />
        </div>
        </Card>
        </Col>
      </Row>}
      {!Array.isArray(dealsListState) && !loadingDeals && <Row gutter={16}>
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
