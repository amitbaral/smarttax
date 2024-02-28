import OpenAI from "openai";

export default async function handler(req, res) {
  

  //check if the request is a POST request
  // if (req.method !== "POST") {
  //   res.status(405).json({ error: "Method not allowed, please use POST request" });
  //   return;
  // }

  // //check if the request body is empty
  // if (!req.body) {
  //   res.status(400).json({ error: "Request body is empty, please provide a question" });
  //   return;
  // }

  // //check if the question is empty
  // if (!req.body.question) {
  //   res.status(400).json({ error: "Question is empty, please provide a question" });
  //   return;
  // }

  // if (req.headers.authorization !== process.env.SECRET_TOKEN) {
  //   res.status(401).json({ error: "Unauthorized" })
  //   return;
  // }


  //get the question from the request body
  let { question } = req.body;
  if (!question) {
    question = "What is WP Pro?";
  }


    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "assistant", content: "WP Pro is company name. WP Pro provides WordPress website development and Maintenance." },
            { role: "user", content: `As an experienced copywriter and Web Developer, generate a comprehensive, SEO-optimized blog post on ${question}. It should also outline for the keywords wordpress, web design, website maintenance, web developer. Tone should be conversational, spartan, use less corporate jargon. . Blog post should be in HTML format and give me excerpt as well. Html should contain h1, h2, h3, lists and paragraphs. Add a quote related to the post if available somewhere in between the content.` },
        ],
        max_tokens: 3000,
        n: 1,
        stop: null,
        temperature: 1,
    });
    res.status(200).json({ answer: response });
}