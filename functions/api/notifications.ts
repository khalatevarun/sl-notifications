import { v4 as uuidv4 } from 'uuid';

export async function onRequest(context) {
    const notificationsList = await context.env.NFS.get("notifications");
    return new Response(notificationsList);
  
}


export async function onRequestPost(context){
  const { request, env } = context;

  const newNotifications = await request.json();

  const notificationsArray = Array.isArray(newNotifications) ? newNotifications : [newNotifications];

  const notificationsWithMetadata = notificationsArray.map((notification) => ({
    ...notification,
    id: uuidv4(),           
    timestamp: Date.now(), 
  }));

  let response = await env.NFS.get("notifications");
  let existingNotifications = JSON.parse(response);

 if (!Array.isArray(existingNotifications)) {
        existingNotifications = [];
    }

  existingNotifications.push(...notificationsWithMetadata);

  await env.NFS.put('notifications', JSON.stringify(existingNotifications));

  return new Response(JSON.stringify(notificationsWithMetadata));
};
