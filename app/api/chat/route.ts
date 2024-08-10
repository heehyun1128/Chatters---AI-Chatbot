import { NextResponse } from 'next/server';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

// Ensure you have the AWS region in your environment variables
const REGION = process.env.AWS_REGION || 'us-west-2';

const bedrockRuntime = new BedrockRuntimeClient({
  region: REGION,
  credentials: fromNodeProviderChain(),
});

export async function POST(req: Request) {
  try {
    const { userPrompt } = await req.json();

    const params = {
      modelId: "meta.llama3-8b-instruct-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: userPrompt || "What country is San Francisco located?",
        max_gen_len: 512,
        temperature: 0.5,
        top_p: 0.9
      })
    };

    const command = new InvokeModelCommand(params);
    const response = await bedrockRuntime.send(command);

    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    return NextResponse.json(responseBody);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}