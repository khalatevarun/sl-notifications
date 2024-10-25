import { NotificationType } from "../../utility/types";

import './notificationForm.css'

const NOTIFICATION_TYPE: NotificationType[] = [
    { label: 'Alert', value: 'alert'},
    { label: 'Info', value: 'info'},
    { label: 'Success', value: 'success'}
  ]

const NotificationForm = (props:any) => {

    const {handleSubmit, onFormDataChange, formData} = props;

   return (
     <form id="notification-form"  onSubmit={handleSubmit} className='parent-left'>
        <div className='notif-form'>
            <textarea className='notif-form-textarea' placeholder='Message' id="notification-message" required value={formData.text} onChange={(e) => onFormDataChange(e, 'text') } />
            <select id="notification-type" value={formData.type} required onChange={(e) => onFormDataChange(e, 'type') }>
            {NOTIFICATION_TYPE.map((type: NotificationType)=>(
                <option value={type.value}>{type.label}</option>
            ))}
            </select>
            <button className='notif-form-button' id="send-notification-btn" type='submit'>Send</button>
        </div>
  </form>
 )
}

export default NotificationForm;