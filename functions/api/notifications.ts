import { v4 as uuidv4 } from 'uuid';

export async function onRequest(context) {
    const notificationsList = await context.env.NFS.get("notifications");
    return new Response(notificationsList);
}


export async function onRequestPost(context){
  const { request, env } = context;

  const newNotifications = await request.json();

  const notificationsArray = Array.isArray(newNotifications) ? newNotifications : [newNotifications];

  const validTypes = ['alert', 'info', 'success'];


  // Validate each notification
  const isValidNotification = (notification) =>
    notification &&
    validTypes.includes(notification.type) &&
    notification.content &&
    typeof notification.content.text === 'string' &&
    typeof notification.read === 'boolean';

    for (const notification of notificationsArray) {
      if (!isValidNotification(notification)) {
        return new Response(JSON.stringify({ error: 'Invalid notification format' }), {
          status: 400,
        });
      }
    }

  const notificationsWithMetadata = notificationsArray.map((notification) => ({
    ...notification,
    id: uuidv4(),           
    timestamp: Date.now(), 
  }));

  let response = await env.NFS.get("notifications");
  let existingNotifications = response ? JSON.parse(response) : null;

 if (!Array.isArray(existingNotifications)) {
        existingNotifications = [];
    }

  existingNotifications.push(...notificationsWithMetadata);

  await env.NFS.put('notifications', JSON.stringify(existingNotifications));

  return new Response(JSON.stringify(notificationsWithMetadata));
};


export async function onRequestDelete(context){
    try {
      await context.env.NFS.delete("notifications");

      return new Response(JSON.stringify({message:"Notifications deleted successfully!"}));
    }
    catch (e)
    {
      return new Response(e.message, {status: 500});
    }
  
};