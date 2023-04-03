import React, { useEffect, useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form, DatePicker, Select, Table } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
import {getAllOrders, resetOrders, refereshOrders } from 'store/slices/creditSlice';
import { getAccountListByUserId } from 'store/slices/usersSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { ordersTableColumns } from 'constants/constant';
import { useLocation } from 'react-router-dom';
const { Option } = Select;


export const Orders = props => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').pop();
  const [form] = Form.useForm();
  const { getAccountListByUserId, loading, usersClientList, getAllOrders, orders, refereshOrders } = props;
  const [accountListState, setAccountListState] = useState([]);

  const initialCredential = {
    account_id: ''
  }
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetOrders());
    };
  }, [location]);


  useEffect(() => {
    getAccountListByUserId({user_id: localStorage.getItem("userId")})
    getAllOrders({user_id: localStorage.getItem("userId")})
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
         let account_id = form.getFieldValue('account_id')
      
         if(!account_id || !account_id.length){
          refereshOrders({user_id: localStorage.getItem("userId")})
         } else {
          
        
         }
        
        }, 7000);
      return () => {
        clearInterval(interval);
      };
  }, []);


  useEffect(() => {
    if (usersClientList?.length > 0) {
      let accountIds = [...usersClientList]
      accountIds.sort(function (a, b) {
        return a - b;
      });
      setAccountListState(accountIds)
    }
  }, [usersClientList])

  const viewAllOrders = ()=>{
    getAllOrders({user_id: localStorage.getItem("userId")})
    // let path = `/app/dashboards/orders/`;
    // props.navigate(path)
    form.resetFields();
  }

  const handleChange = (value) => {
    let account_id = form.getFieldValue('account_id')
    let getOrderreq ={user_id: localStorage.getItem("userId"), account_id: account_id}
    getAllOrders(getOrderreq)
  }

  const SelectWithMemo = React.useMemo(() => (
    <Select name="account_id" className="w-250" placeholder="Select Login Id" showSearch
      onChange={handleChange}
    >
      {
        accountListState && accountListState.length > 0 && accountListState.map(elm => (
          <Option key={elm} value={elm}>{elm}</Option>
        ))
      }
    </Select>
  ), [accountListState]);

  // let totalProfit = orders && orders.length ? orders.reduce((sum, item) => sum + parseInt(item.Profit), 0) : 0;
  
  return (
    <div>
      
        <Card title="Orders" className='abcccc'>
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
              {SelectWithMemo}
            </Form.Item>

            { form.getFieldValue('account_id') && 
            <Button
                    type="link"
                    onClick={viewAllOrders}
                    className="ant-btn-theme text-white rounded-6px mt-40"
                >
                    View All
                </Button>}
          </Form>
        </Card>
   
  

      {Array.isArray(orders) && orders.length > 0 && 
        <Card title="Orders">
          <div className="table-responsive">
            <Table
              columns={ordersTableColumns}
              dataSource={orders}
              rowKey='id'
              scroll={{ x: 1200 }}
        
            />
          </div>
        </Card>
      }
      
      {loading && <div className='text-center'><LoadingOutlined /></div>}
      { (!orders || !orders.length) && !loading && <Button type="dashed" block>No data found</Button>}
    </div>
  )
}

const mapStateToProps = ({ credit, deals, users }) => {
  const { loading, orders} = credit;
  const { usersClientList} = users;
  return { loading, usersClientList, orders }
}

const mapDispatchToProps = {
  getAccountListByUserId,
  getAllOrders,
  refereshOrders
}

// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Positions))


function WithNavigate(props) {
  let navigate = useNavigate()
  let params = useParams()
  return <Orders {...props} navigate={navigate} params={params} />
}
export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate)