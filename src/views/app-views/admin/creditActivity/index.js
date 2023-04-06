import React, { useEffect, useState } from "react";
import utils from "utils";
import moment from "moment";
import {  useNavigate, useParams } from "react-router-dom";

import { 
  Row,
  Col,
  Card,
  Form, 
  Table 
} from "antd";

import { AntTableSearch } from "../../../../components/shared-components/AntTableSearch";
import { connect, useDispatch } from "react-redux";


import {getCreditActivity} from "store/slices/usersSlice";

import { LoadingOutlined } from "@ant-design/icons";

 

export const CreditActivity = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const nameValue = Form.useWatch('account_id', form);
  const {
    getCreditActivity,
    credit_activity_logs,
    loading,
  } = props;

 console.log("nameValue", nameValue)
  
 
  let logsColumns = [
    {
      title: "Login",
      dataIndex: "account_id",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => utils.antdTableSorter(a, b, "account_id") 
    }, 
    {
      title: "From",
      dataIndex: "user",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => utils.antdTableSorter(a, b, "user ") 
    }, 
    {
      title: "Type",
      dataIndex: "type",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => utils.antdTableSorter(a, b, "type") 
    }, 
    {
      title: "Amount",
      dataIndex: "amount",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => utils.antdTableSorter(a, b, "amount") 
    }, 
    
    {
      title: "IP Address",
      dataIndex: "ip",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => utils.antdTableSorter(a, b, "ip") 
    }, 
    {
      title: "Date",
      dataIndex: "created",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => utils.antdTableSorter(a, b, "created") ,
      render: (_, elm) => (
        <div className="d-flex">
          {moment.unix(elm.created).format()}  
        </div>
      )
    }
    
  ];

 
 
  // useEffect(() => {
  //   const interval = setInterval(() => { 
  //     let account_id = form.getFieldValue('account_id')
      
  //     if(!account_id) {

  //       // referesAccountList()
  //     }
    
  //   }, 7000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  
  // }, []);

 


  useEffect(() => {
    getCreditActivity() 
  }, []);
 
 
  return (
    <>
      <div>
    
      <div className="text-right">
                  {loading && <LoadingOutlined />}
                </div>
             
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24}>
         

            
      {Array.isArray(credit_activity_logs) && credit_activity_logs.length > 0 && 
        <Card title="Users">
          <div className="table-responsive">
            <Table
              columns={logsColumns}
              dataSource={credit_activity_logs}
              rowKey='id'
              scroll={{ x: 1200 }}
        
            />
          </div>
        </Card>
      }
      
          </Col>
        </Row>
       
        
      </div>
    </>
  );
};

const mapStateToProps = ({users }) => {
 
    const {loading, credit_activity_logs} = users;
  return {
    loading,
    credit_activity_logs
  };
};

const mapDispatchToProps = {
  getCreditActivity,
};




function WithNavigate(props) {
  let navigate = useNavigate()
  let params = useParams()
  return <CreditActivity {...props} navigate={navigate} params={params} />
}
export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate)