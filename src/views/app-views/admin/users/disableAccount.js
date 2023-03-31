import { Form, Modal, Input, TreeSelect, Checkbox, Row, Col } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Radio, Button, DatePicker, Tooltip, Select, AutoComplete } from "antd";

import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

const DisableAccountModal = (props) => {
  const [form] = Form.useForm();
  const { isVisible, editableItem, onHide, disableAccount } = props;

  const handleOk = () => {
    form.submit();
  };
  const onClientUpdate = (fieldsValue) => {
    console.log("fieldsValue", fieldsValue);

    const req = { account_id: editableItem.clientId };

    for (var key in fieldsValue) {
      if (!!fieldsValue[key]) {
        req[key] = fieldsValue[key];
      }
    }

    console.log("fieldsValue", req);
    disableAccount(req)
  };
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
        title={`Disable Account: ${editableItem ? editableItem.clientId : ""}`}
        open={isVisible}
        width={600}
        onCancel={(e) => {
          onHide(false, null);
        }}
        okText="Save Client"
        footer={[]}
        forceRender
      >
        <Form
          form={form}
          name="edit_client_account"
          okText="Update Client"
          layout="vertical"
          onFinish={onClientUpdate}
        >
          <Form.Item
            name="status"
            className="mt-3 mb-3"
            id="status"
            label={<span>Select Status</span>}
            rules={[
              {
                required: true,
                message: "Please Select account status!",
                whitespace: true,
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "0",
                  label: "Disable",
                },
                {
                  value: "1",
                  label: "Enable",
                }
              ]}
            />
          </Form.Item>



          <Form.Item
            name="color"
            className="mt-3 mb-3"
            id="color"
            label={<span>Select Color</span>}
            rules={[
              {
                required: true,
                message: "Please selet color!",
                whitespace: true,
              },
            ]}
          >
            <Select
              showSearch
              
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
               
                {
                  value: "255",
                  label: "Red",
                },
                {
                  value: "32768",
                  label: "Green",
                },
                {
                  value: "65280",
                  label: "Lime",
                },
                {
                  value: "16711935",
                  label: "Magenta",
                },
                {
                  value: "65535",
                  label: "Yellow",
                },
                {
                  value: "0",
                  label: "Black",
                }
              ]}
            />
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
  return {};
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisableAccountModal);
