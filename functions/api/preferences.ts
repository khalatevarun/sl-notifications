export async function onRequest() {
    const preferenceData = {
        "displayDuration": 5000,
        "preferredTypes": ["alert", "info"],
    };

    const response = new Response();
    const newCookie = `preferences=${JSON.stringify(preferenceData)}; Path=/`;

    response.headers.set("Content-Type","application/json");
    response.headers.set("Set-Cookie",newCookie);
    
  
    return response;
}