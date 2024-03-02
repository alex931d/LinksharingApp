import { CloseOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Input, ColorPicker, Space,Alert, Select,Switch, InputNumber } from 'antd';
import { generateBackgroundColor } from '../../compunets/lib/color';
function ColorPickerInput({ onChange, name }) {
  return <ColorPicker onChange={onChange} name={name} />;
}

function TextInput({ onChange, name }) {
  return <Input onChange={onChange} name={name} />;
}

function NumberInput({ onChange, name }) {
  return <InputNumber onChange={onChange} maxLength={30} name={name} />;
}

function Settings({ itemsList,profileInfo, settings, updateItem,updateSetting,updateEditing }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleOnInputChange = (index, type, value) => {
    const updatedItem = { ...itemsList[index] };
    updatedItem[type] = value;
    updateEditing(true)
    updateItem(index, updatedItem);
  };
  const handleOnSettingChange = (type, value) => {
    const updatedSettings = { ...settings };
    updatedSettings[type] = value;
    updateEditing(true)
    updateSetting(updatedSettings);
    console.log(updatedSettings);
  };
  useEffect(() => {
  }, [itemsList, form]);

  const renderInputElement = (entry,item, index,value) => {

    switch (entry) {
      case 'link_color':
    
        return (
          <ColorPicker
            defaultValue={value || generateBackgroundColor(itemsList[index].platform.toUpperCase())}
            onChange={(color) => handleOnInputChange(index, entry, `rgb(${color.metaColor.r}, ${color.metaColor.g}, ${color.metaColor.b})`)}
            name={entry}
          />
        );
      case 'foreground':
          return (
            <ColorPicker
              defaultValue={value || generateBackgroundColor(itemsList[index].platform.toUpperCase())}
              onChange={(color) => handleOnInputChange(index, entry, `rgb(${color.metaColor.r}, ${color.metaColor.g}, ${color.metaColor.b})`)}
              name={entry}
            />
          );
      case 'font_family':
        return (
          <Select
          defaultValue={value || 'Rethink Sans'}
          onChange={(value) => handleOnInputChange(index, entry, value)}
          options={[
            { value: 'Arial', label: 'Arial' },
            { value: 'Courier New', label: 'Courier New' },
            { value: 'Trebuchet MS', label: 'Trebuchet MS' },
            { value: 'Rethink Sans', label: 'Rethink Sans (default)', },
          ]}
        />
        );
      case 'font_size':
      
        return (
          <InputNumber
            defaultValue={value || 20}
            min={10}
            max={30}
            onChange={(value) => handleOnInputChange(index, entry, value)}
            name={entry}
          />
        );
      default:
        return (
          <Alert message="Error display setting" type="error" />
        );
    }
  
  };
  return (
    <>
   <Form>
      <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
      <Card size='small' title="global settings">
      {Object.entries(settings).map(([key, value], index) => (
        <Space key={key}>
        <Form.Item noStyle name={[index, 'setting']} initialValue={key}>
            <Input placeholder={key} value={key} style={{ width: 200 }} disabled />
          </Form.Item>
        <Form.Item noStyle name={[index,'setting']}>
           <Switch checked={value} onChange={(value) => handleOnSettingChange(key, value)} />
        </Form.Item>
        </Space>
            ))}
      </Card>
        {itemsList.map((item, index) => (
          <Card size="small" title={`link ${item.id}`} key={index}>
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
              {['link_color', 'foreground', 'font_family', 'font_size'].map((type, subIndex) => (
                <Space key={subIndex}>
                  <Form.Item noStyle name={[index, 'list', subIndex, 'type']} initialValue={type}>
                    <Input placeholder={type} value={type} style={{ width: 120 }} disabled />
                  </Form.Item>
                  <Form.Item noStyle name={[index, 'list', subIndex, 'value']} shouldUpdate>
                    {renderInputElement(type, item[index], index,item[type])}
                  </Form.Item>
                </Space>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Form>

      {isEditing && (
        <div className="editor-bottom">
          <div className="editor-bottom-inner">
            <button
              className="btn"
              onClick={(e) => {
                console.log(form.getFieldsValue());
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Settings;