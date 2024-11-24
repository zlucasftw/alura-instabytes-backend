import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function geminiDescriptionGeneration(imageBuffer) {
    const prompt = "Generate one description, in brazilian portuguese, for the specified image";

    try {

        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png",
            },
        };

        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Descrição não disponível.";

    } catch (error) {
        console.error("Erro ao obter a descrição", error.message, error);
        throw new Error("Erro ao obter a descrição da imagem a partir do Gemini");
    }

}
