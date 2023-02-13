import React, { useEffect, useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form, DatePicker, Select, Table } from 'antd';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { getAccountList } from 'store/slices/creditSlice';
import { getDealsList,getDealsListWithSearch } from 'store/slices/dealsSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { dealsTableColumns } from 'constants/constant';
import Loading from 'components/shared-components/Loading';
import moment from "moment";
import { useLocation } from 'react-router-dom';
const { Option } = Select;


export const DealsDashboard = props => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').pop();  
  console.log("pathSnippets", pathSnippets);
 const [form] = Form.useForm();
const { getAccountList, loading, accountList, loadingDeals, dealsList,dealsListWithSearch, getDealsList, getDealsListWithSearch } = props;
const [accountListState, setAccountListState] = useState([]);
const [dealsListState, setDealsListState] = useState([]);
  const [dealsListWitchSearch, setDealsListWitchSearch] = useState(false);

  
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
    if(pathSnippets != "search"){
      getDealsListWithSearch()
    } else {
      getAccountList()
    }
  },[dealsListWitchSearch])

  useEffect(()=>{
    if(pathSnippets != "search" && accountList?.length > 0){
      let accounts = [...accountList]
      let accountIds =  accounts.map((e)=>e.clientId)
      accountIds.sort(function(a, b) {
        return a - b;
      });
      setAccountListState(accountIds)
    } 
  },[accountList])

  useEffect(()=>{
    if(dealsList && Object.keys(dealsList)?.length > 0){
      let dealsArr = [];
        for (let anObject in dealsList) { 
          // console.log('dealsList[anObject]', dealsList[anObject].Time);
          let dealObj = {... dealsList[anObject]}
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
          dealObj.Time =  moment.unix(timestamp).utc().format("MM/DD/YYYY hh:mm:ss");
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

    if(!timefrom || !timeto  || !account_id){
      notification.error({
        message: 'Please select all fields'
      })
      return;
    }


    console.log("timefrom",timefrom, form.getFieldValue('timefrom'));
    console.log("timefrom", timeto, form.getFieldValue('timeto'));


    let getDealsObj = {
      account_id: account_id,
      timefrom:  moment(timefrom, 'DD/MM/YYYY').format("DD-MM-YYYY"),
      timeto:  moment(timeto, 'DD/MM/YYYY').format("DD-MM-YYYY"),
    }

    
    getDealsList(getDealsObj)
  }

  return (
    <>
    {!loading ? <div>
      
        {dealsListWitchSearch &&
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


              {/* <Form.Item>
              <Button type="primary" className='mt-4' htmlType="submit" block loading={loadingDeals}>
                Submit
              </Button>
            </Form.Item> */}
            </Form>
          </Card>
        }

        {loadingDeals && <Loading />}

      {((Array.isArray(dealsListState) && dealsListState.length > 0) || (Array.isArray(dealsList) && dealsList.length > 0)) && !loadingDeals &&
          <Card title="Deals">
              <div className="table-responsive">
              <Table 
                columns={dealsTableColumns} 
                dataSource={dealsListWitchSearch ? dealsListState : dealsList} 
                rowKey='id'
                scroll={{x:1200}}
              />
            </div>
            </Card>
      }
      {!Array.isArray(dealsListState) && !loadingDeals &&   <Button type="dashed" block>No data found</Button>}


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
  getDealsList,
  getDealsListWithSearch
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(DealsDashboard))
