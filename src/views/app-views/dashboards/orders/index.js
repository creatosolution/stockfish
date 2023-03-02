import React, { useEffect, useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form, DatePicker, Select, Table } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
import { notification } from 'antd';
import { getAccountIdList, getOrder, getAllOrders, resetOrders, refereshOrders } from 'store/slices/creditSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { ordersTableColumns } from 'constants/constant';
import Loading from 'components/shared-components/Loading';
import moment from "moment";
import { useLocation } from 'react-router-dom';
const { Option } = Select;


export const Orders = props => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').pop();
  const [form] = Form.useForm();
  const { getAccountIdList, loading, accountIdList, getOrder,getAllOrders, orders, refereshOrders } = props;
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
    if (pathSnippets == "search") {
      getAccountIdList()
    } else {

      
      getAllOrders()
    }
  }, [])


  useEffect(() => {
    if (pathSnippets != "search") {
      const interval = setInterval(() => { refereshOrders()}, 7000);
      return () => {
        clearInterval(interval);
      };
    } 
  
  }, []);


  useEffect(() => {
    if (pathSnippets == "search" && accountIdList?.length > 0) {
      let accountIds = [...accountIdList]
      accountIds.sort(function (a, b) {
        return a - b;
      });
      setAccountListState(accountIds)
    }
  }, [accountIdList])

  const viewAllOrders = ()=>{
    let path = `/app/dashboards/orders/`;
    props.navigate(path)
  }

  const handleChange = (value) => {
    let account_id = form.getFieldValue('account_id')
    let getDealsObj = {
      account_id: account_id,
    }
    getOrder(getDealsObj)
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

  let totalProfit = orders && orders.length ? orders.reduce((sum, item) => sum + parseInt(item.Profit), 0) : 0;
  return (
    <div>

      {pathSnippets == "search" &&
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

            
            <Button
                    type="link"
                    onClick={viewAllOrders}
                    className="ant-btn-theme text-white rounded-6px mt-40 ml-auto"
                >
                    View All Orders
                </Button>
          </Form>
        </Card>
      }

  

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
      {!Array.isArray(orders) && !loading && <Button type="dashed" block>No data found</Button>}
    </div>
  )
}

const mapStateToProps = ({ credit, deals }) => {
  const { loading, orders, accountIdList} = credit;
  return { loading, accountIdList, orders }
}

const mapDispatchToProps = {
  getAccountIdList,
  getOrder,
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