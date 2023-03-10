import React, { useEffect, useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form, DatePicker, Select, Table } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
import { notification } from 'antd';
import { getAccountIdList, getPosition, getAllPositions, resetPosition, refereshPositions } from 'store/slices/creditSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { positionTableColumns } from 'constants/constant';
import Loading from 'components/shared-components/Loading';
import moment from "moment";
import { useLocation } from 'react-router-dom';
const { Option } = Select;


export const Positions = props => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').pop();
  const [form] = Form.useForm();
  const { getAccountIdList, loading, accountIdList, getPosition,getAllPositions, positions, refereshPositions } = props;
  const [accountListState, setAccountListState] = useState([]);

  const initialCredential = {
    account_id: ''
  }
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetPosition());
    };
  }, [location]);


  useEffect(() => {
    getAccountIdList()
    getAllPositions()
  }, [])

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
  useEffect(() => {
    if (pathSnippets != "search") {
      const interval = setInterval(() => { 

        let account_id = form.getFieldValue('account_id')
        if(!account_id){
          
        refereshPositions()
        }
        
        }, 10000);
      return () => {
        clearInterval(interval);
      };
    } 
  
  }, []);


  useEffect(() => {
    if (accountIdList?.length > 0) {
      let accountIds = [...accountIdList]
      accountIds.sort(function (a, b) {
        return a - b;
      });
      setAccountListState(accountIds)
    }
  }, [accountIdList])

  const viewAllPositions = ()=>{
   
    form.resetFields()
    getAllPositions()
  }

  const handleChange = (value) => {
    let account_id = form.getFieldValue('account_id')
    let getDealsObj = {
      account_id: account_id,
    }
    getPosition(getDealsObj)
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

  let totalProfit = positions && positions.length ? positions.reduce((sum, item) => sum + parseInt(item.Profit), 0) : 0;
  return (
    <div>
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
              {SelectWithMemo}
            </Form.Item>

            
            { form.getFieldValue('account_id') && 
            <Button
                    type="link"
                    onClick={viewAllPositions}
                    className="ant-btn-theme text-white rounded-6px mt-40"
                >
                    View All Positions
                </Button>}
          </Form>
        </Card>
  

      {Array.isArray(positions) && positions.length > 0 && 
        <Card title="Positions">
          <div className="table-responsive">
            <Table
              columns={positionTableColumns}
              dataSource={positions}
              rowKey='SymbolIndex'
              scroll={{ x: 1200 }}
              summary={(pageData) => {
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                      <Table.Summary.Cell index={1}/>
                      <Table.Summary.Cell index={2} />
                      <Table.Summary.Cell index={3} />
                      <Table.Summary.Cell index={4} />
                      <Table.Summary.Cell index={5} />
                      <Table.Summary.Cell index={6} align="right">{totalProfit}</Table.Summary.Cell >
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </div>
        </Card>
      }
      
      {loading && <div className='text-center'><LoadingOutlined /></div>}
      {!Array.isArray(positions) && !loading && <Button type="dashed" block>No data found</Button>}
    </div>
  )
}

const mapStateToProps = ({ credit, deals }) => {
  const { loading, positions, accountIdList} = credit;
  return { loading, accountIdList, positions }
}

const mapDispatchToProps = {
  getAccountIdList,
  getPosition,
  getAllPositions,
  refereshPositions
}

// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Positions))


function WithNavigate(props) {
  let navigate = useNavigate()
  let params = useParams()
  return <Positions {...props} navigate={navigate} params={params} />
}
export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate)