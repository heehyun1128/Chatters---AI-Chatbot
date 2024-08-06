import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const systemPrompt = `Account Setup:
"Welcome! How can I assist you with setting up your new travel account?"
"To get started with a new account, please follow these steps: [Provide detailed steps]."
"Verify your new account by clicking the link sent to your email. Didn't receive it? Let me help you."
Password Reset:
"It looks like you need to reset your password. Let's get started by sending a reset link to your registered email."
"To create a strong password, use a mix of letters, numbers, and special characters. Need help? I'm here."
"Forgot your username or email? Let me guide you through the recovery process."
Trip Planning:
"Planning a trip? Let's start with choosing your destination. Where would you like to go?"
"Customize your travel itinerary by selecting from our range of tours and activities. How can I help you today?"
"Need help booking your flights and accommodations? I'm here to guide you through each step."
`;

export async function POST(req: Request) {
  try {
    const  question  = await req.text();

    if (!openai.apiKey) {
      console.error("OpenAI API key is missing");
      return NextResponse.json({
        error: "OpenAI API key is missing",
        success: false,
      });
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    const assistantMessage = response.choices[0]?.message?.content || "No response from AI";

    const messages = [
    
      { role: "Chatters", content: assistantMessage },
    ];

    return NextResponse.json(messages, { status: 200 });
  } catch (err) {
    console.error("Error processing request:", err);

    return NextResponse.json({ error: `System Error: ${err}`, success: false });
  }
}
