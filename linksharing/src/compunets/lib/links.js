
import { toast } from 'react-toastify';
import { Axios } from '../../config/config';

export const removeItem = (index,items,update,setIsEditing) =>{
  update((prevItems) => prevItems.filter((_, i) => i !== index));
  toast.success('succesfully removed!', {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
    });
    setIsEditing(true);
}
export const addItem = (currentType,items,update,setIsEditing) =>{
  if (items.length < 5) {
    var newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;   
     let item = null; 
    switch (currentType) {
      case 'links':
        item = {
          id: newId,
          itemType: 'links',
          font_family: "",
          font_size: 0,
          foreground: null,
          link_color: null,
          platform: 'New Platform',
          url: 'https://example.com',
        };
        break;
      case 'medias':
        item = {
          id: newId,
          itemType: 'medias',
          font_family: "",
          font_size: 0,
          foreground: "var(--light-purple)",
          link_color: "var(--background-color)",
          platform: 'Youtube',
          type: 'video',
          url: 'https://www.youtube.com/embed/2JyW4yAyTl0',
        };
        break;
      case 'notes':
        item = {
          id: newId,
          itemType: 'notes',
          font_family: "",
          font_size: 0,
          foreground: "var(--light-purple)",
          link_color: "var(--background-color)",
          content: 'this is a description'
        };

        break;
        case 'files':
          item = {
            id: newId,
            itemType: 'files',
            font_family: "",
            font_size: 0,
            foreground: "var(--light-purple)",
            link_color: "var(--background-color)",
            name: '',
            url:'',
            file:null,
          };
          break;
      default:
        break;
    }
    update((prevLinks) => [...prevLinks || [], item]);
    setIsEditing(true);
    toast.success('succesfully added!', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  } else {
    toast.error('maximum 5 links!', {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
}
export const updateLinks = async (devLinkId,settings, items,e) => {

    const promise = new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        e.preventDefault()
        let itemIds = [];
        formData.append('items', JSON.stringify(items));
        formData.append('settings',JSON.stringify(settings))
        formData.append('id',devLinkId)
     
        for (let i = 0; i < items.length; i++) {
          if (items[i].itemType === 'files' && items[i].file) {
            formData.append('files', items[i].file, `${items[i].id}_${items[i].name}`,);
           itemIds.push(items[i].id);
          }
        }
        formData.append('itemIds', JSON.stringify(itemIds));
        const response = await Axios.put('/api/updateLinks', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
           resolve();
        } else if (response.status === 500) {
          reject(new Error('bad request!'));
        }
        else {
          reject(new Error('Server error!'));
        }
      } catch (error) {
        reject(error);
      }
    });
  
    toast.promise(promise, {
      pending: 'updating links...',
      success: 'Successfully submitted!',
      error: (error) => `Error: ${error.message}`,
    });
  
    promise.then(() => {
    });
  };
  