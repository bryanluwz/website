export interface Env {
	TOGETHER_API_KEY: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const allowedOrigins = ['https://your-site.com', 'http://localhost:8080'];

		const origin = request.headers.get('Origin');
		if (!origin || !allowedOrigins.includes(origin)) {
			return new Response('Forbidden', { status: 403 });
		}

		const reqData = await request.json();

		const apiKey = env.TOGETHER_API_KEY; // 👈 Clean and safe

		const res = await fetch('https://api.together.xyz/inference', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reqData),
		});

		const data = await res.json();

		return new Response(JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': origin,
			},
		});
	},
};
