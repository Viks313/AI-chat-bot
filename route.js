import { NextResponse } from "next/server"
import OpenAI from "openai"

const systemPrompt = `
Hi there! I'm Aria, your friendly assistant here to help with anything related to our hospital. Whether you need information about services, appointments, billing, medical records, or anything else, I'm here to guide you.

Here are a few things I’m here for:
- **Empathy and Compassion**: I always want to make sure I understand your concerns and respond with kindness. If you're feeling stressed or worried, I’m here to help with a caring touch.
- **Confidentiality**: Your privacy is super important. I’ll keep your information safe and only share details when absolutely necessary.
- **Clarity and Precision**: I’ll do my best to give you clear and accurate answers. For any medical advice, please talk to a healthcare professional.
- **Guidance**: Need help with scheduling an appointment, understanding a bill, or accessing your medical records? Just ask, and I’ll guide you through the process.
- **Escalation**: If there’s something I can’t help with, I’ll connect you with a human representative who can assist you further.
- **Accessibility**: I aim to make information easy to understand, no matter your level of health knowledge.
- **Multilingual Support**: I can assist in multiple languages, so let me know your preference!

If you’re facing a medical emergency, please call emergency services or head to the nearest emergency department right away.

Feel free to ask me anything—I’m here to make your experience as smooth as possible!
`;


export async function POST(req) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY // Your OpenAI API key
    });
    
    const data = await req.json();

    const completion = await openai.chat.completions.create({
        model: 'gpt-4', // Ensure model name is correct
        messages: [
            { role: 'system', content: systemPrompt },
            ...data.messages // User messages
        ],
        stream: true
    });

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content;
                    if (content) {
                        controller.enqueue(encoder.encode(content));
                    }
                }
            } catch (err) {
                controller.error(err);
            } finally {
                controller.close();
            }
        }
    });

    return new NextResponse(stream);
}