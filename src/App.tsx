import './App.css'
import { useEffect, useState } from 'react';
import List from 'rc-virtual-list';

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

  const getPreferences = async() => {
    await fetch('/api/preferences',{
      method:'GET',
    }).then(()=>{});
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

  useEffect(() => {
    const intervalId = setInterval(getNotifications, 4000);
    getPreferences();

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

  const getFormatNotifications = (notifications:any) => {
    const sortedNotifications = notifications.sort((a:any, b:any) => a.timestamp - b.timestamp);

    return sortedNotifications.map((notification: any)=>{

        const { timestamp } = notification;

        return {
          ...notification,
          timestamp: formatTimestamp(timestamp)
        }
    })
  }

  function formatTimestamp(timestamp:any) {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Array of month abbreviations
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[date.getMonth()];

    // Extract day, year, hours, and minutes
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Determine am/pm and adjust 12-hour format
    const period = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;

    // Construct the formatted date string
    return `${day} ${monthName} ${year}, ${hours}:${minutes}${period}`;
}

// Example usage
const timestamp = 1729839906874;
console.log(formatTimestamp(timestamp)); // Output: "22 Jun 2024, 4:30pm" (for example)




  return (
    <>
      <div className='parent-container'>
        <div id="notification-form" className='parent-left'>
          <form  onSubmit={handleSubmit} className='notif-form'>
          <div className='notif-form-title'>Create Notification</div>
            <textarea className='notif-form-textarea' placeholder='Message' id="notification-message" required value={formData.text} onChange={(e) => onFormDataChange(e, 'text') } />
            <select id="notification-type" value={formData.type} required onChange={(e) => onFormDataChange(e, 'type') }>
              <option value="alert">Alert</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
            </select>
            <button className='notif-form-button' id="send-notification-btn" type='submit'>Send</button>
          </form>
        </div>

        <div id='notification-feed' className='parent-right'> 
          <div className='notif-feed'>
         {notifications.length > 0 && <List data={notifications} height={380} itemHeight={70} itemKey="id">
            {notification => <div 
                className={`notification-card ${notification.type}-bg`}
                >
              <p className='notification-message'>
                {notification.content.text}
              </p>
              <div className="notification-timestamp">
                {notification.timestamp}
              </div>
              </div>}
          </List>}
          </div>
        </div>
        <div>

        </div>
      </div>
    </>
  )
}

export default App
