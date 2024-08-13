import { NextResponse } from 'next/server';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

const REGION = process.env.AWS_REGION || 'us-west-2';

const bedrockRuntime = new BedrockRuntimeClient({
  region: REGION,
  credentials: fromNodeProviderChain(),
}); 

process.env.AWS_PROFILE = "Yiuser";

export async function POST(req: Request) {
  try {
    const { message, language = 'English' } = await req.json();

    const systemPrompt = `You are a helpful assistant. Please translate the text in ${language} and only return the translation and no other content.`;
    const userMessage = { role: "user", content: message };

    const params = {
      modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [userMessage],
        system: systemPrompt,
        temperature: 0.7,
      })
    };

    const command = new InvokeModelCommand(params);
    const response = await bedrockRuntime.send(command);

    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    return NextResponse.json({ 
      message: responseBody.content[0].text,
      language: language
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}