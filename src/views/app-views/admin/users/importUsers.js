
import { Form, Modal, Upload, Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import {importManagers, getAllUsers} from "store/slices/usersSlice";


const ImportManagers = props => {
    const {isVisible, onHide, importManagers, getAllUsers} =  props



    const [defaultFileList, setDefaultFileList] = useState([]);
    const [progress, setProgress] = useState(0);
  
    
    const uploadImage = async options => {
      const { onSuccess, onError, file, onProgress } = options;
  
      const fmData = new FormData();
    
      fmData.append("csv_file", file);
      try { 

        importManagers(fmData).then((res)=>{
          getAllUsers()
        })
        
        onSuccess("Ok");
      } catch (err) {
        console.log("Eroor: ", err);
        const error = new Error("Some error");
        onError({ err });
      }
    };
    
    const handleOnChange = ({ file, fileList, event }) => {
      // console.log(file, fileList, event);
      //Using Hooks to update the state to the current filelist
      setDefaultFileList(fileList);
      //filelist - [{uid: "-1",url:'Some url to image'}]
    };
  

  return (
    <>
      <Modal
        title={"Upload Managers"}
        open={isVisible}
        width={600}
        onCancel={(e) => {
          onHide(false);
        }}
        footer={[]}
        forceRender
      >
          <Upload
            accept=".csv"
            customRequest={uploadImage}
            onChange={handleOnChange}
            defaultFileList={defaultFileList}
            className="image-upload-grid"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
      </Modal>
    </>
  );
};
const mapStateToProps = ({users}) => {
  const {importManagers} =  users
    return {importManagers, getAllUsers}
}
const mapDispatchToProps = {
  importManagers,
  getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportManagers) 