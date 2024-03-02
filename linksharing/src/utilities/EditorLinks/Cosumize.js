import Link from "../../compunets/Link";
import './Cosumize.css'
import { useEffect, useRef,useState } from 'react';
import gsap from 'gsap';
import Settings from "./Settings";
import axios from 'axios';
import { toast } from 'react-toastify';
import {Select,Alert,Empty,Tabs  } from 'antd'; 
import Media from "../../compunets/Media";
import { addItem,removeItem,updateLinks,removeMedia } from '../../compunets/lib/links';
import File from "../../compunets/File";

import  { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
function Cosumize({ref2,ref3,ref4,user,itemsList, update,updateSetting,profileInfo,settings,devLinkId}){
  const [currentType,setCurrentType] = useState('links');
  const [isEditing, setIsEditing] = useState(false);
  const elementRef = useRef(null);
  const animateNewItem = () => {
    const newElement = document.querySelector('.link-container:last-child');

    gsap.from(newElement, {
      autoAlpha: 0,
      y: 50,
      ease: 'power2.out',
      duration: 0.5,
    });
  };

  function hasInvalidUrls(array) {
    console.log(array.some(item => item.isValidUrl === false))
    return array.some(item => item.isValidUrl === false);
  }
  
  const moveLink = (items, fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setIsEditing(true);
    update(updatedItems)
    return updatedItems;
  };

      const updateItem = (index,updatedList) =>{

        update((prevLinks) => {
          const updatedLinks = [...prevLinks];
          updatedLinks[index] = { ...updatedLinks[index], ...updatedList };
          return updatedLinks;
        });
        setIsEditing(true);
      }
    return(
            <div className="editor-container">
              <div className="editor" ref={ref2}>
    
                <div className="editor-header">
                  <h2 className="editor-title">Customize your links</h2>
                  <span className="editor-about">add/edit/remove links below and then share all your profiles with the world!</span>
                </div>
                <Tabs defaultActiveKey="1" items={[
                {
                key: '1',
                label: 'links',
               children: <>
                 <div className="dropdown-select" ref={ref3}>
                <Select
                defaultValue="link"
                onChange={(data)=>setCurrentType(data)}
                options={[
                  {value: 'links',label:'link'},
                  {value: 'files',label:'file'},
                ]}>

                </Select>
                </div>
                <button ref={ref4} onClick={()=>addItem(currentType,itemsList,update,setIsEditing)} className="btn look-btn main-btn">+ add new</button>
                   {itemsList.length === 0 ? (
                    <Empty />
                  ):(
                  <DragDropContext onDragEnd={(result) => {
                     if (!result.destination) return;
                     const { source, destination } = result;
                     moveLink(itemsList,result.source.index, result.destination.index);  
                    }}>
             
                <Droppable droppableId="itemsList" direction="vertical" type="LINK">
                  {(provided,snapshot) => (
                    <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                  className={`links-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}>
                   
                     {itemsList.map((item, index) => (  
                        <div key={index}>
                        <Draggable key={item.id} draggableId={item.id.toString()} index={index} type={item.itemType} >
                          {(provided) => (
                            <div ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}type={item.itemType}  >
                            {item.itemType === 'links' && (
                             <Link link={item} onRemove={() => removeItem(index, item, update, setIsEditing)} onUpdate={(data) => updateItem(index, data)} />
                            )}
                          
                           {item.itemType === 'files' && (
                              <File file={item} onRemove={()=> removeItem(index,item,update,setIsEditing)} onUpdate={(data)=> updateItem(index,data)} />
                            )}
                    
                            </div>
                          )}
                        </Draggable>
                          
                          </div>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                </DragDropContext>
              )}
            

               </>,
             },
             {
              key: '2',
             label: 'settings',
             children: <>
                  <Settings itemsList={itemsList} profileInfo={profileInfo} settings={settings} updateItem={updateItem} updateSetting={updateSetting} updateEditing={(boolean)=>{setIsEditing(boolean)}} />
              </>,
             }
              ]} />
               {isEditing && (
        <div className="editor-bottom">
          <div className="editor-bottom-inner">
   
            <button className="btn" onClick={(e)=>{
              if(!hasInvalidUrls(itemsList)){
                updateLinks(devLinkId,settings,itemsList,e)
                setIsEditing(false)
                }else{
                  toast.error('check invaid urls ', {
                  position: "bottom-center",
                   autoClose: 2000,
                   hideProgressBar: false,
                  closeOnClick: true,
                pauseOnHover: true,
              draggable: true,
               progress: undefined,
              theme: "light"
              });
                }
                } 
              }>
                  Save
            </button>
          </div>
        </div>
      )}
              </div>
             

            </div>
         
    )
}
export default Cosumize;