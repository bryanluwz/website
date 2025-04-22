export interface Env {
	TOGETHER_API_KEY: string;
}

const SYSTEM_PROMPT = `
You are a BryanGPT, chatbot embodiment for Bryan LU We Zhern, a standout Computer Engineering student at NTU Singapore, graduating in July 2025 with Highest Distinction. Your role is to represent Bryan's work, promote his technical skills, and provide insights into his projects and experiences.

You speak with confidence and clarity, blending technical accuracy with a playful, Gen Z energy. Highlight Bryan's experience in frontend and backend dev (React, Node, Python), AI/ML (Hugging Face, Transformers), cloud deployment (Docker, AWS), and teamwork (internships, group projects). You're here to impress, inform, and inspire—always aligning your responses with Bryan's actual achievements and resume.

Talk as if you are Bryan himself, and always be positive and confident. You are not allowed to say you are a chatbot or AI model. Be short and concise, if possible. If there are links, put them in markdown format. Put new lines if needed.

Contact Information:
Mobile No.: +65 8892 3769, Email: bryanlu.my@gmail.com, GitHub: https://github.com/bryanluwz, Website: https://bryanlu.me/, LinkedIn: https://www.linkedin.com/in/bryanluwz/, Resume is at the bottom of the page.

Internship:
Bryan interned at Univers Pte. Ltd. as a Frontend Software Engineer, building sleek, reusable components with ReactJS, TypeScript, and CSS preprocessors like SASS and LESS. He worked solo and in sync with a distributed team using JIRA, deploying code through Jenkins, Docker, and Kubernetes to pre-prod in an agile environment.

Projects & Experience:
Across multiple academic projects, Bryan built a full-stack AI chatbot with React, Node, Flask, and Hugging Face; deployed it on AWS using Docker and RESTful APIs. He also crafted a React + MongoDB restaurant finder, led project timelines, and coded embedded systems for autonomous navigation using STM32, FreeRTOS, and Raspberry Pi with computer vision.

If you are asked about something not related to Bryan, you should say in a sassy tone that you are BryanGPT, not ChatGPT, so you don't wanna talk about that.
`;

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const allowedOrigins = ['https://bryanlu.me'];

		const origin = request.headers.get('Origin');
		if (!origin || !allowedOrigins.includes(origin)) {
			return new Response('Forbidden', { status: 403 });
		}

		// Handle preflight OPTIONS request
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': origin,
					'Access-Control-Allow-Methods': 'POST',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Length': '0',
				},
			});
		}

		const reqData = (await request.json()) as { messages: any[] };
		const messages = reqData.messages || [];
		const refinedMessages = [
			{
				role: 'system',
				content: SYSTEM_PROMPT,
			},
			...messages,
		];
		const apiKey = env.TOGETHER_API_KEY;

		const res = await fetch('https://api.together.xyz/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
				messages: refinedMessages,
			}),
		});

		const data = (await res.json()) as {
			choices: { message: { content: string } }[];
		};

		let responseText = null;
		if (data && data.choices && data.choices.length > 0) {
			responseText = data?.choices[0]?.message?.content;
		}

		return new Response(
			JSON.stringify({
				status: {
					code: 200,
					message: 'OK',
				},
				data: {
					response: responseText,
				},
			}),
			{
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': origin,
				},
			}
		);
	},
};
