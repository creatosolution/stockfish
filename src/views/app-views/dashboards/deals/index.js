import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button, Row, Col, Card, Form, DatePicker, Select, Table } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { notification } from 'antd';
import { getAccountIdList } from 'store/slices/creditSlice';
import { getDealsList, getAllDeals, resetdealsListState,refereshDeals } from 'store/slices/dealsSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { dealsTableColumns } from 'constants/constant';
import Loading from 'components/shared-components/Loading';
import moment from "moment";
import { useLocation } from 'react-router-dom';
const { Option } = Select;


export const DealsDashboard = props => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').pop();
  const [form] = Form.useForm();
  const { getAccountIdList, loading, accountIdList, loadingDeals, dealsList, getDealsList, getAllDeals, refereshDeals } = props;
  const [accountListState, setAccountListState] = useState([]);
  const [dealsListState, setDealsListState] = useState([]);
  const dispatch = useDispatch();

  const initialCredential = {
    account_id: '',
    timefrom: moment(),
    timeto: moment().add(1, 'd')
  }

  // useEffect(() => {
  //   // runs on location, i.e. route, change
  //   // console.log('handle route change here', location)\
  //   dispatch(resetdealsListState());
  // }, [location])
  const onSubmit = values => {
    console.log(values);
    let timefrom = new Date(values.timefrom)
    let timeto = new Date(values.timeto)
    let getDealsObj = {
      account_id: values.account_id,
      timefrom: timefrom.toLocaleDateString().replace("/", '-').replace("/", '-'),
      timeto: timeto.toLocaleDateString().replace("/", '-').replace("/", '-')
    }
    getDealsList(getDealsObj)
  };


  const viewAllDeals = ()=>{
    // let path = `/app/dashboards/deals/`;
    // props.navigate(path)
    form.resetFields();
    console.log("moment.......", moment().add(1, 'd').format('DD-MM-YYYY'));
     const allDealsObj = {
      timefrom: moment().format('DD-MM-YYYY'),
      timeto:  moment().add(1, 'd').format('DD-MM-YYYY')
    }
    getAllDeals(allDealsObj)
  }

  useEffect(() => {
    getAccountIdList()
    console.log("moment.......", moment().add(1, 'd').format('DD-MM-YYYY'));
     const allDealsObj = {
      timefrom: moment().format('DD-MM-YYYY'),
      timeto:  moment().add(1, 'd').format('DD-MM-YYYY')
    }
    getAllDeals(allDealsObj)
  }, [])

  useEffect(() => {
    if (pathSnippets != "search") {

       
      const interval = setInterval(() => { 
        
        let account_id = form.getFieldValue('account_id')
        if(!account_id || !account_id.length){
          console.log("moment.......", moment().add(1, 'd').format('DD-MM-YYYY'));
          const allDealsObj = {
           timefrom: moment().format('DD-MM-YYYY'),
           timeto:  moment().add(1, 'd').format('DD-MM-YYYY')
         }
             
             
        refereshDeals(allDealsObj)
        }
   }, 7000);
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

  useEffect(() => {
    if(!dealsList){
      return;
    }
    if(Array.isArray(dealsList)){
      console.log('arrayyyyyy');
      let dealsArr = [];
      for(var i=0; i< dealsList.length; i++){
        let dealObj = {...dealsList[i]};
        // if (pathSnippets == "search") { 
        //   const timestamp = dealObj.Time;
        //   const date = new Date(timestamp * 1000);
        //   const year = date.getFullYear();
        //   const month = `0${date.getMonth() + 1}`.slice(-2);
        //   const day = `0${date.getDate()}`.slice(-2);
        //   const hours = `0${date.getHours()}`.slice(-2);
        //   const minutes = `0${date.getMinutes()}`.slice(-2);
        //   const seconds = `0${date.getSeconds()}`.slice(-2);
        //   const result = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  
        //   // const result = date;
        //   console.log(result);
        //   dealObj.Time = moment.unix(timestamp).utc().format("MM/DD/YYYY hh:mm:ss");
        // }
      
        dealsArr.push(dealObj)
      }
      setDealsListState(dealsArr)

    } else
    if (dealsList && Object.keys(dealsList)?.length > 0) {
      console.log('ibhectttttt');
      let dealsArr = [];
      for (let anObject in dealsList) {
        // console.log('dealsList[anObject]', dealsList[anObject].Time);
        let dealObj = { ...dealsList[anObject] }
        // let time = moment(new Date(dealObj.Time), 'YYYYMMDD').toString()

        // let getOffset = moment(time).utcOffset();

        // time = `${moment(time).utcOffset(getOffset).format("MMMM") }, ${moment(time).utcOffset(getOffset).format( "DD") }, ${moment(time).utcOffset(getOffset).format("(hh.mm a)") }`;
        // dealObj.Time = time


        const timestamp = dealObj.Time;
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);
        const hours = `0${date.getHours()}`.slice(-2);
        const minutes = `0${date.getMinutes()}`.slice(-2);
        const seconds = `0${date.getSeconds()}`.slice(-2);
        const result = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;

        // const result = date;
        console.log(result);
        dealObj.Time = moment.unix(timestamp).utc().format("MM/DD/YYYY hh:mm:ss");
        dealsArr.push(dealObj)
      }
      setDealsListState(dealsArr)
    } else {
      setDealsListState({});
    }
  }, [dealsList])


  const handleChange = (value) => {
    console.log('value', form);
    let timefrom = new Date(form.getFieldValue('timefrom'))
    let timeto = new Date(form.getFieldValue('timeto'))
    let account_id = form.getFieldValue('account_id')

    if (!timefrom || !timeto || !account_id) {
      notification.error({
        message: 'Please select all fields'
      })
      return;
    }

    let getDealsObj = {
      account_id: account_id,
      timefrom: moment(timefrom, 'DD/MM/YYYY').format("DD-MM-YYYY"),
      timeto: moment(timeto, 'DD/MM/YYYY').format("DD-MM-YYYY"),
    }


    getDealsList(getDealsObj)
    
  }

  return (
    <>
      {!loading ? <div>

        <Card title="Search Deals">
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
                <DatePicker className="w-100" onChange={handleChange} />
              </Form.Item>

              <Form.Item name="timeto" label="End Date" rules={[
                {
                  required: true,
                  message: 'Please input your Time to',
                }
              ]}>
                <DatePicker className="w-100" onChange={handleChange} />
              </Form.Item>

              <Form.Item name="account_id" label="Select Login Id" rules={[
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

              <Button
                    type="link"
                    onClick={viewAllDeals}
                    className="ant-btn-theme text-white rounded-6px mt-40"
                >
                    View All Deals
                </Button>


            </Form>
          </Card>

        {loadingDeals && <Loading />}
        
        {dealsListState && dealsListState.length > 0 && !loadingDeals &&
          <Card title="Deals">
            <div className="table-responsive">
              <Table
                columns={dealsTableColumns}
                dataSource={dealsListState}
                rowKey='id'
                scroll={{ x: 1200 }}
              />
            </div>
          </Card>
        }
        
        {(!dealsListState || !dealsListState.length ) && !loadingDeals && <Button type="dashed" block>No data found</Button>}


      </div> : <LoadingOutlined />}

    </>
  )
}

const mapStateToProps = ({ credit, deals }) => {
  const { loading, accountIdList } = credit;
  const { loadingDeals, dealsList } = deals;
  return { loading, accountIdList, loadingDeals, dealsList }
}

const mapDispatchToProps = {
  getAccountIdList,
  getDealsList,
  getAllDeals,
  refereshDeals
}

// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(DealsDashboard))



function WithNavigate(props) {
  let navigate = useNavigate()
  let params = useParams()
  return <DealsDashboard {...props} navigate={navigate} params={params} />
}
export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate)