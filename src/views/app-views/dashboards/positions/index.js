import React, { useEffect, useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form, DatePicker, Select, Table } from 'antd';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { getAccountList, getPosition } from 'store/slices/creditSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { positionTableColumns } from 'constants/constant';
import Loading from 'components/shared-components/Loading';
import moment from "moment";
const { Option } = Select;


export const Positions = props => {
  
 const [form] = Form.useForm();
const { getAccountList, loading, accountList, loadingDeals, dealsList, getPosition,positions } = props;
const [accountListState, setAccountListState] = useState([]);
const [position, setPosition] = useState([]);



const initialCredential = {
  account_id: ''
}


  useEffect(()=>{
    if(accountList?.length === 0){
      getAccountList()
    }
  },[])

  useEffect(()=>{
    if(accountList?.length > 0){
      let accounts = [...accountList]
      let accountIds =  accounts.map((e)=>e.clientId)
      accountIds.sort(function(a, b) {
        return a - b;
      });
      setAccountListState(accountIds)
    }
  },[accountList])

 


  const handleChange=(value)=>{
    console.log('value', form);
    let account_id  =  form.getFieldValue('account_id')

    let getDealsObj = {
      account_id: account_id,
    }

    
    getPosition(getDealsObj)
  }

  return (
    <>
    {!loading ? <div>
      
 
          <Card title="Positions" className='abcccc'>
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
              <Select name="account_id" className="w-250" placeholder="Select Login Id" showSearch
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
    
      
      {loadingDeals &&  <Loading/>}

      {Array.isArray(positions) && positions.length > 0 && !loadingDeals &&
      <Card title="Positions">
          <div className="table-responsive">
          <Table 
            columns={positionTableColumns} 
            dataSource={positions} 
            rowKey='id'
            scroll={{x:1200}}
          />
        </div>
        </Card>
      }
      {!Array.isArray(positions) && !loadingDeals &&   <Button type="dashed" block>No data found</Button>}


    </div> : <LoadingOutlined />}
     
  </>
  )
}

const mapStateToProps = ({credit, deals}) => {
	const { loading, accountList, positions } = credit;
	const { loadingDeals, dealsList } = deals;
  return { loading, accountList, loadingDeals, dealsList, positions }
}

const mapDispatchToProps = {
	getAccountList,
  getPosition
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Positions))
