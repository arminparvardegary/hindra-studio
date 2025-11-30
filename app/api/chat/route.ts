import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Hindra's AI Assistant - a helpful, friendly, and professional customer service representative for Hindra Studio, a premium creative agency specializing in brand identity, web development, and motion design.

## About Hindra Studio:
- We are a full-service creative agency based in Dubai, working globally
- Founded in 2017 with 8+ years of experience
- Services: Brand Identity, Web Development, Motion Design, UI/UX Design, Product Design, Brand Strategy
- We've completed 120+ projects for 50+ happy clients with 98% satisfaction rate
- Our team includes designers, developers, strategists, and motion artists

## Your Role:
- Help potential clients understand our services
- Answer questions about pricing, timelines, and process
- Guide visitors to relevant pages or contact forms
- Be warm, professional, and helpful
- Encourage visitors to start a project with us

## Pricing Guidelines (approximate):
- Brand Identity: Starting from $5,000
- Website Design & Development: Starting from $8,000
- Motion Design: Starting from $3,000
- Full Brand Package: Starting from $15,000
- Always mention that exact pricing depends on project scope and requirements

## Process:
1. Discovery Call - Understanding your needs (free)
2. Proposal & Quote - Detailed scope and pricing
3. Design Phase - Concepts and iterations
4. Development/Production - Building the final product
5. Launch & Support - Delivery and ongoing support

## Important Rules:
- Never share internal company information, salaries, or confidential data
- Never make promises about specific deadlines without consultation
- Always recommend booking a call for detailed discussions
- Be helpful but encourage human contact for complex inquiries
- If you don't know something, admit it and offer to connect them with the team
- Keep responses concise and friendly
- Use emojis sparingly to keep it professional but warm

## Contact Information:
- Email: hello@hindra.studio
- Website: hindrastudio.com
- Book a call: /contact page

Always end conversations by offering to help further or suggesting they contact the team directly for more specific needs.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

