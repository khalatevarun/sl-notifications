import './App.css'
import { useEffect, useState } from 'react';

function App() {

  const [formData, setFormData] = useState({
    text: '',
    type: ''
  });


  const [notifications, setNotifications] = useState<any>([]);

  


  const getNotifications = async() =>{
   await fetch('/api/notifications',{
      method:'GET',
    }).then((response)=> response.json()).then((res)=> setNotifications(getFormatNotifications(res)));

  }



  const addNotifications = async(data:any) => {

    const {type, text} = data;

    const notification = {
      type,
      content: {
        text,
      },
      read: false
    }
   await fetch('/api/notifications',{
      method:'POST',
      body: JSON.stringify(notification),
    }).then((response)=> response.json()).then((res)=>console.log(res));
    
    setFormData({
      text:'',
      type: ''
    })
  }

  const deleteNotifications = async() => {
    await fetch('/api/notifications',{
      method:'DELETE',
    }).then((response)=> response.json()).then((res)=>console.log(res));


  }

  const addInvalidNotification = async() => {
    await fetch('/api/notifications',{
      method:'POST',
      body: JSON.stringify({
        "type": "alert",
        "content": {
          "text": "New notification alerts!"
        },
        "read": "not read"
      }),
    }).then((response)=> response.json()).then((res)=>console.log(res));

    console.log("REACHED HERE");

   
    
  }

  useEffect(()=>{
    getNotifications();
  },[])


  const onFormDataChange = (e: React.ChangeEvent<HTMLTextAreaElement|HTMLSelectElement>, key:string) => {
    const value = e.target.value;

    setFormData({...formData, [key]: value});
  }

  const handleSubmit = (e:any) => {
      e.preventDefault();
      addNotifications(formData);
      
  }

  const getFormatNotifications = (notifications:any) => {
    const sortedNotifications = notifications.sort((a:any, b:any) => a.timestamp - b.timestamp);

    return sortedNotifications.map((notification: any)=>{

        const { timestamp } = notification;

        const formattedTimeStamp = (new Date(timestamp)).toLocaleString();

        return {
          ...notification,
          timestamp: formattedTimeStamp
        }
    })
  }



  return (
    <>
      <div className='parent-container'>
        <div className='parent-left'>
          <div>Create Notification</div>
          <form id="notification-form" onSubmit={handleSubmit} className='create-notification-form'>
            <textarea id="notification-message" required value={formData.text} onChange={(e) => onFormDataChange(e, 'text') } />
            <select id="notification-type" value={formData.type} required onChange={(e) => onFormDataChange(e, 'type') }>
            <option value="" disabled selected>
              Select type
             </option>
              <option value="alert">Alert</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
            </select>
            <button id="send-notification-btn" type='submit'>Send</button>
          </form>
        </div>

        <div className='parent-right'> 
          <div>
            {notifications.map((notification:any)=>(
              <div 
                id="notification-card" 
                className={`notif-card ${notification.type}-bg`}
                >
              <div>
                {notification.content.text}
              </div>
              <div>
                {notification.timestamp}
              </div>
              </div>
            ))}
          </div>
        </div>
        <div>

        </div>
      </div>
      
      <div className="card">
        <button onClick={getNotifications}>
          Get Notifications
        </button>
        <button onClick={addNotifications}>
          Post Notifications
        </button>
        <button onClick={addInvalidNotification}>
          Post Invalid Notifications
        </button>
        <button onClick={deleteNotifications}>
          Delete Notifications
        </button>
      
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
