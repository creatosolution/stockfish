import { Form, Modal, Input,TreeSelect, Checkbox, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Radio, Button, DatePicker, Tooltip, Select, AutoComplete } from 'antd';

import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

const AccountEditModal = props => {
    const [form] = Form.useForm();
    const {isVisible, editableItem, onHide, updateAccount } =  props
  
    const handleOk = () => {
        form.submit();
      };
    const onClientUpdate =(fieldsValue)=>{
        console.log("fieldsValue", fieldsValue);
       

        const req = {account_id: editableItem.clientId}

        for(var key in fieldsValue){
            if(!!fieldsValue[key]){
                req[key] = fieldsValue[key]
            } 
            // else {
            //     req[key] =""
            // }
        }

        console.log("fieldsValue", req);
        updateAccount(req)
    }
    useEffect(() => {
        if (editableItem) {
            console.log(editableItem);
          form.setFieldsValue({
            name: editableItem["clientName"],
            group: editableItem["groupName"],
          });
        }
      }, [editableItem]);
      
  return (
    <>
      <Modal
        title={`Edit ${editableItem ? editableItem.clientId : ''}`}
        open={isVisible}
        width={600}
        onCancel={onHide}
        footer={[]}
        forceRender
      >
         <Form form={form} name="edit_client_account"  layout="vertical" onFinish={onClientUpdate}>
                    <Form.Item
                        name="name"
                        className='mt-3 mb-3'
                        id="name"
                        
                        label={
                        <span>
                            Client name
                        </span>
                        }
                        rules={[{ required: true, message: 'Please enter client name!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="group"
                        className='mt-3 mb-3'
                        id="group"
                        
                        label={
                        <span>
                            Group name
                        </span>
                        }
                        rules={[{ required: true, message: 'Please enter group name!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        id="email"
                        label="E-mail"
                        rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        name="phone"
                        className='mt-3 mb-3'
                        id="phone"
                        
                        label={
                        <span>
                            Contact number
                        </span>
                        }
                    >
                        <Input />
                    </Form.Item>


                    <Button
          className="ant-btn-theme text-white mt-2"
          htmlType="button" onClick={handleOk}
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