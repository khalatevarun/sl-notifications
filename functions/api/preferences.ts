export async function onRequest() {
    const preferenceData = JSON.stringify({
        "displayDuration": 5000,
        "preferredTypes": ["alert", "info"],
    });

    const response = new Response();
    const newCookie = `preferences=${preferenceData}; Path=/; HttpOnly`;

    response.headers.set("Set-Cookie",newCookie);
    response.headers.set("Content-Type","application/json");
    
  
    return response;
}