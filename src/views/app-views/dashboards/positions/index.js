import React, { useEffect, useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form, DatePicker, Select, Table } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { notification } from 'antd';
import { getAccountIdList, getPosition, getAllPositions, resetPosition } from 'store/slices/creditSlice';
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
  const { getAccountIdList, loading, accountIdList, loadingDeals, dealsList, getPosition,getAllPositions, positions } = props;
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
    if (pathSnippets == "search") {
      getAccountIdList()
    } else {
      getAllPositions()
    }
  }, [])

  useEffect(() => {
    if (pathSnippets == "search" && accountIdList?.length > 0) {
      let accountIds = [...accountIdList]
      accountIds.sort(function (a, b) {
        return a - b;
      });
      setAccountListState(accountIds)
    }
  }, [accountIdList])


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

      {pathSnippets == "search" &&
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
          </Form>
        </Card>
      }

      {loadingDeals && <LoadingOutlined />}

      {Array.isArray(positions) && positions.length > 0 && !loadingDeals &&
        <Card title="Positions">
          <div className="table-responsive">
            <Table
              columns={positionTableColumns}
              dataSource={positions}
              rowKey='id'
              scroll={{ x: 1200 }}
              summary={(pageData) => {
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                      <Table.Summary.Cell index={1}></Table.Summary.Cell>
                      <Table.Summary.Cell index={2} />
                      <Table.Summary.Cell index={3} />
                      <Table.Summary.Cell index={4} />
                      <Table.Summary.Cell index={5} />
                      <Table.Summary.Cell index={6} />
                      <Table.Summary.Cell index={7}>{totalProfit}</Table.Summary.Cell >
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </div>
        </Card>
      }
      {!Array.isArray(positions) && !loadingDeals && <Button type="dashed" block>No data found</Button>}
    </div>
  )
}

const mapStateToProps = ({ credit, deals }) => {
  const { loading, positions, accountIdList} = credit;
  const { loadingDeals, dealsList } = deals;
  return { loading, accountIdList, loadingDeals, dealsList, positions }
}

const mapDispatchToProps = {
  getAccountIdList,
  getPosition,
  getAllPositions
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Positions))
