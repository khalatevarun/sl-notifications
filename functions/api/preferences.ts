export async function onRequest() {
    const preferenceData = {
        "displayDuration": 5000,
        "preferredTypes": ["alert", "info"],
    };

    const response = new Response(JSON.stringify(preferenceData), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Set-Cookie": `preferences=${JSON.stringify(preferenceData)}; Path=/`
        }
    });

    return response;
}