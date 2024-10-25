export interface Env {
    AI: any;
  }
  
  export default {
    async fetch(request, env): Promise<Response> {
  
      const messages = [
        { role: "system", content: "You are a friendly assistant" },
        {
          role: "user",
          content: "What is the origin of the phrase Hello, World",
        },
      ];
      const response = await env.AI.run("@cf/meta/llama-3-8b-instruct", { messages });
  
      return Response.json(response);
    },
  } ;