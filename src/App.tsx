import { useEffect, useState } from 'react';
import './App.css'

type Notification = {
  type: 'alert'|'info'|'success';
  content: {
    text: string;
  };
  timestamp: number;
  read: boolean;
}

type NotificationType = {
  label: string;
  value: string;
}

const NOTIFICATION_TYPE: NotificationType[] = [
  { label: 'Alert', value: 'label'},
  { label: 'Info', value: 'info'},
  { label: 'Success', value: 'success'}
]

function App() {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [formData, setFormData] = useState({
    text: '',
    type: ''
  });

  const getNotifications = async() =>{
   await fetch('/api/notifications',{
      method:'GET',
    })
    .then((response)=> response.json())
    .then((res)=> {
      const formattedNotifications = getFormatNotifications(res);
      setNotifications(formattedNotifications);
    })
    .catch((err)=>{
      console.error(err);
    });
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
    })
    .then(()=>{
      setFormData({
        text:'',
        type: ''
      });
    })
    .catch((err)=> console.error(err));
  }

  useEffect(() => {
    const intervalId = setInterval(getNotifications, 4000);

    return () => clearInterval(intervalId);
}, []); 


  const onFormDataChange = (e: React.ChangeEvent<HTMLTextAreaElement|HTMLSelectElement>, key:string) => {
    const value = e.target.value;

    setFormData({...formData, [key]: value});
  }

  const handleSubmit = (e:any) => {
      e.preventDefault();
      addNotifications(formData);
      
  }

  const getFormatNotifications = (notifications:Notification[]) => {
    const unreadNotifications = notifications.filter((notification:Notification)=> !notification.read);
    const sortedNotifications = unreadNotifications.sort((a: Notification, b: Notification) => b.timestamp - a.timestamp);

    return sortedNotifications.map((notification: any)=>{
        const { timestamp } = notification;

        return {
          ...notification,
          timestamp: formatTimestamp(timestamp)
        }
    })
  }

function formatTimestamp(timestamp:number) {
    const date = new Date(timestamp);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[date.getMonth()];

    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const period = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;

    return `${day} ${monthName} ${year}, ${hours}:${minutes}${period}`;
  }



  return (
    <>
      <div className='parent-container'>
          <form id="notification-form"  onSubmit={handleSubmit} className='parent-left '>
            <div className='notif-form'>
              <div className='notif-form-title'>Create Notification</div>
            <textarea className='notif-form-textarea' placeholder='Message' id="notification-message" required value={formData.text} onChange={(e) => onFormDataChange(e, 'text') } />
            <select id="notification-type" value={formData.type} required onChange={(e) => onFormDataChange(e, 'type') }>
            {/* <option value="" disabled selected>
              Choose type
             </option> */}
              {NOTIFICATION_TYPE.map((type: NotificationType)=>(
                <option value={type.value}>{type.label}</option>
              ))}
            </select>
            <button className='notif-form-button' id="send-notification-btn" type='submit'>Send</button>
            </div>
          </form>
        <div id='notification-feed' className='parent-right'> 
            {notifications.map((notification:Notification)=>(
              <div 
                className={`notification-card ${notification?.type}-bg`}
                >
              <p className='notification-message'>
                {notification?.content?.text}
              </p>
              <div className="notification-timestamp">  
                {notification?.timestamp}
              </div>
              </div>
            ))}
        </div>
        <div>

        </div>
      </div>
    </>
  )
}

export default App
