export async function onRequest(context) {
  const { request, env } = context;
  const req = await request.json();
  const { text } = req;

  const stream = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
    stream: false,
    max_tokens: 512,
    messages: [
      { role: "system", content: "Classify the given notification text into one of these categories: finance, weather, health, or technology. The text will clearly belong to one of these categories. Respond with only the category name in lowercase."},
      { role: "user", content: text},
    ],
  });


  let res = {category: stream.response};

  return new Response(JSON.stringify(res), {
    headers: { "content-type": "application/json" },
  });

}