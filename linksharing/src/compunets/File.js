import { useState } from "react";
import { Button, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { generateFileTypeIcon } from "./fileTypeIcon";
import { toast } from 'react-toastify';

import './File.css'
function File({file,onRemove,onUpdate}){
  const { Dragger } = Upload;

const handleFileNameChange = (event) =>{
  onUpdate({
    name: event.target.value,
  });
}

const customRequest = ({ file, onSuccess, onError }) => {
    try {
      const reader = new FileReader();

      reader.onload = (function (file) {
        return function (e) {
          const arrayBuffer = reader.result;
          const blob = new Blob([arrayBuffer], { type: file.type });
      
          onUpdate({
            url: null,
            name: file.name,
            fileTempUrl: URL.createObjectURL(blob),
            fileType: file.type,
            file: blob,
          });

        };
      })(file);
      

      reader.readAsArrayBuffer(file);

      onSuccess();
    } catch (error) {
      message.error(`Failed to add ${file.name} to the list`);
      onError();
    }
  };
    return (
        <>
            <div className="file-container">
                 <div className="file-header">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none" viewBox="0 0 12 6"><path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z"></path></svg>
                    <span># link {file.id}</span>
                    </div>
                    <button onClick={(onRemove)} className='btn remove-btn'>remove</button>
                 </div>
                 <form>
                    <div className="form-field">
                        <label>File</label>
                    
                             <Dragger 
                             name="file"
                             customRequest={customRequest}
                             maxCount='1'
                             showUploadList={false}
                             beforeUpload={(file) => {
                             const allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.google-apps.document'];
                           if (!allowedFileTypes.includes(file.type)) {
                          message.error(`${file.name} is not a valid file type. Please upload a .pdf, .docx, or Google Doc file.`);
                         return Upload.LIST_IGNORE;
                        }

                         return true; 
                        }}
                        onChange={(info) => {
                      if (info.file.status !== 'uploading') {
                   
                       }
                    if (info.file.status === 'done') {
                      toast.success(`${info.file.name} file uploaded successfully`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
                      } else if (info.file.status === 'error') {
                      message.error(`${info.file.name} file upload failed.`);
                       }
                         }}
                             >
                            <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                           </p>
                           <p className="ant-upload-text">Click or drag file to this area to upload</p>
                           <p className="ant-upload-hint">
                           upload your Resume here please limit your self to .pdf .docx .doc
                            </p>
                        </Dragger>
                        </div>
                        <div className="file-container">
                        <div className="form-field">
                        <div className="input-field">
                             <div className="input-icon">
                             {generateFileTypeIcon(file.fileType, true)}
                                </div>
                                          <input type="text" onChange={handleFileNameChange} placeholder={file.name} value={file.name} />
                                    </div>
                                    </div>
                             </div>
                 </form>
            </div>
        </>
    )
}
export default File;