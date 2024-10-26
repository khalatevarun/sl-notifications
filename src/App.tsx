import { useEffect, useState } from 'react';

import NotificationFeed from './components/NotificationFeed';
import NotificationForm from './components/NotificationForm';

import { Notification } from './utility/types';
import { formatTimestamp } from './utility/helper';

import './App.css'

function App() {

  const [notifications, setNotifications] = useState<Notification[]>([{
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  },
  {
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  },
  {
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  },
  {
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  },
  {
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  },
  {
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  },
  {
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  },
  {
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  }
  ,
  {
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  },
  {
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  },
  {
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  },
  {
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  },
  {
    type: 'alert',
    content: {
      text: "Abra ka dabraaaaasdasdasdasldkjaldkajdalsdkjasdlkj",
    },
    timestamp: 12123123123,
    read: false,
  }
]);
  const [formData, setFormData] = useState({
    text: '',
    type: ''
  });


  // fetch notifications
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


  // add a new notification
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
      // reset form once api returns 200 status code
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

  // on form submit
  const handleSubmit = (e:any) => {
      e.preventDefault();
      addNotifications(formData);
  }

  // to filter, sort and modify the notifications data before rendering
  const getFormatNotifications = (notifis:Notification[]) => {
    const unreadNotifications = notifis.filter((notification:Notification)=> !notification.read);
     unreadNotifications.sort((a: Notification, b: Notification) => b.timestamp - a.timestamp);

    return unreadNotifications.map((notification: any)=>{
        const { timestamp } = notification;

        return {
          ...notification,
          timestamp: formatTimestamp(timestamp)
        }
    })
  }


  return (
    <>
      <div className='parent-container'>
         <NotificationForm
            handleSubmit={handleSubmit}
            onFormDataChange={onFormDataChange}
            formData={formData}
         />
         <NotificationFeed
            notifications={notifications}
         />
          <img className='cloudflare-logo' src="src/assets/cf-logo.png"/>
      </div>
    </>
  )
}

export default App
