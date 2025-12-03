import axios from "axios";

export async function POST(req: Request) {
    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ message: "Only POST requests allowed" }),
            { status: 405 },
        );
    }

    const data = await req.json();
    const { gReCaptchaToken } = data;
    const secretKey: string | undefined = process.env.RECAPTCHA_SECRET_KEY;

    if (!gReCaptchaToken) {
        return new Response(JSON.stringify({ message: "Token not found" }), {
            status: 405,
        });
    }

    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${gReCaptchaToken}`,
        );

        if (response.data.success) {
            return new Response(JSON.stringify({ status: "success" }), {
                status: 200,
            });
        } else {
            return new Response(JSON.stringify({ message: "Failed to verify" }), {
                status: 405,
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
        });
    }
}