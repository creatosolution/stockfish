
import { Form, Modal, Input, Button, DatePicker, Tooltip, Select, AutoComplete } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

const { Option } = Select;
const colorMap = {
    "255": {bg:"red", color:"#ffff"}, // red
    "32768":{bg:"#008000", color:"#ffff"}, // Green
    "65280": {bg: "#00FF00", color: "#fff"},
    "16711935":{bg: "#FF00FF", color: "#fff"} ,
    "65535": {bg: "Yellow", color: "#000"},
    "4278190080": {bg: "#fff", color: "#000"},
    "2763429": {bg: "brown", color: "#fff"},
    "42495": {bg: "orange", color: "#fff"},
    "dda0dd": {bg: "orange", color: "#fff"}  
  }
  const colorMapArr = ['Red' ,'Green' ,'Brown' ,'Orange' , 'white'
     
  ]


const AccountEditModal = props => {
    const [form] = Form.useForm();
    const {isVisible, editableItem, onHide, updateAccount, accountListIds } =  props
    const rules = {

      password: [
        { 
          required: editableItem ? false : true,
          message: 'Please enter your password'
        }
      ],
      confirm: [
        { 
          required: editableItem ? false : true,
          message: 'Please confirm your password!'
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject('Passwords do not match!');
          },
        })
      ]
    }
    const handleOk = () => {
        form.submit();
      };
    const onClientUpdate =(fieldsValue)=>{
        console.log("fieldsValue", fieldsValue);
       

        const req = {}

        for(var key in fieldsValue){
            if(!!fieldsValue[key]){
                req[key] = fieldsValue[key]
            } 
            else {
                req[key] =""
            }
        }
      
        updateAccount(req, editableItem?.email)
    }
 
    useEffect(() => {
        if (editableItem) {
            console.log(editableItem);
          form.setFieldsValue({
            name: editableItem["name"],
            group: editableItem["user_group"],
            meta_id: editableItem["meta_id"],
            phone: editableItem["phone"],
            email: editableItem["email"],
            assignedAccount:  editableItem["client_list"].split(","),
            color:  editableItem["color"]
          });
        }
      }, [editableItem]);
      
  return (
    <>
      <Modal
        title={`${editableItem ? `Edit ${editableItem.meta_id }`: "Create Client"}`}
        open={isVisible}
        width={600}
        onCancel={onHide}
        footer={[]}
        forceRender
      >
        <Form
          form={form}
          name="edit_client_account"
          layout="vertical"
          onFinish={onClientUpdate}
        >
          <Form.Item
            name="name"
            className="mt-3 mb-3"
            id="name"
            label={<span>Client name</span>}
            rules={[
              {
                required: true,
                message: "Please enter client name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="meta_id"
            className="mt-3 mb-3"
            id="group"
            label={<span>Meta Id</span>}
            rules={[
              {
                required: true,
                message: "Please enter Meta ID!",
                whitespace: true,
              },
            ]}
          >
            <Input 
            placeholder={"Meta id"}/>
          </Form.Item>
          <Form.Item
            name="group"
            className="mt-3 mb-3"
            id="group"
            label={<span>Group name</span>}
            rules={[
              {
                required: true,
                message: "Please enter group name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            id="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
         
          <Form.Item
            name="assignedAccount"
            label="Select Account"
            rules={[
              {
                required: true,
                message: "Select account",
              },
            ]}
          >
            <Select
              name="account_id"
              mode="multiple"
              className="w-250"
              placeholder="Select Login Id"
              showSearch
            >
              {accountListIds &&
                accountListIds.length > 0 &&
                accountListIds.map((elm) => (
                  <Option key={elm} value={elm}>
                    {elm}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="color"
            label="Select Color"
          >
            <Select
              name="color" 
              className="w-250"
              placeholder="Select Color"
              showSearch
            >
              {colorMapArr &&
                colorMapArr.length > 0 &&
                colorMapArr.map((elm) => (
                  <Option key={elm} value={elm}>
                    {elm}
                  </Option>
                ))}
            </Select>
          </Form.Item>

     
        <Form.Item 
					name="password" 
					label="Password" 
					rules={rules.password}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>
      
        <Form.Item 
					name="confirm" 
					label="ConfirmPassword" 
					rules={rules.confirm}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

			    <Button
            className="ant-btn-theme text-white mt-2"
            htmlType="button"
            onClick={handleOk}
          >
            Save Client
          </Button>
        </Form>
      </Modal>
    </>
  );
};
const mapStateToProps = () => {
    return {}
}
const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountEditModal) 