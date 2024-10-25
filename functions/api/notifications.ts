export async function onRequest(context) {
    const task = await context.env.nfs.get("notifications");
    return new Response(task);
  }