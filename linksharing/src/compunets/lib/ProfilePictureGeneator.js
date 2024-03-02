import React, { useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import { Radio, Row, Col,Button } from 'antd';

function ProfilePictureGeneator({user,onSelect }){
    const [selectedIcon, setSelectedIcon] = useState(null);
    const handleIconChange = (e,avatar) => {
        setSelectedIcon(avatar);
        onSelect(avatar,'avatar');
      };
      const renderIcons = () => {
        const icons = [];
    
        for (let i = 1; i <= 12; i++) {
          const iconName = `identicon-${i}`;
          const avatar = createAvatar(identicon, {
            seed: iconName,
          });
    
          icons.unshift(
           avatar.toString(),
          );
        }
    
        return icons;
      };
      return (
        <div className='profile-picture-generator-container'>
          <Row gutter={[16, 16]}>
            {renderIcons().map((avatar, index) => (
              <Col key={index} span={4}>
                <Button
                  type="default"
                  onClick={(e) => handleIconChange(e,avatar)}
                  style={{
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: selectedIcon === `identicon-${index + 1}` ? '2px solid #1890ff' : 'none',
                    borderRadius: '50%',
                  }}
                >
                  <svg style={{ width: '50px', height: '50px' }} dangerouslySetInnerHTML={{ __html: avatar.toString() }} />
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      );
    };

export default ProfilePictureGeneator;
