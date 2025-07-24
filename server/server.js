import express from "express";
import cors from "cors";
import { ChatAnthropic } from "@langchain/anthropic";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";

// Middleware global de CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/empathical", async (req, res) => {
  const { message } = req.body;

  const llm = new ChatAnthropic({
    anthropicApiKey: ANTHROPIC_API_KEY,
    model: "claude-4-sonnet-20250514",
    temperature: 0.5,
    maxTokens: 1000,
    maxRetries: 2,
  });

  const aiMsg = await llm.invoke([
    [
      "system",
      "Você é um assistente de IA que ajuda a transformar o texto que o usuário fornece para uma forma mais empática, clara e técnica, além de sempre traduzir para o inglês.",
    ],
    [
      "human",
      `Me ajude com a melhorar essa mensagem para uma forma mais empática e clara. Responda apenas com a frase final traduzida: ${message}`,
    ],
  ]);

  return res.json({
    text: aiMsg.content,
  });
});

app.post("/technical", async (req, res) => {
  const { message } = req.body;

  const llm = new ChatAnthropic({
    anthropicApiKey: ANTHROPIC_API_KEY,
    model: "claude-4-sonnet-20250514",
    temperature: 0.5,
    maxTokens: 1000,
    maxRetries: 2,
  });

  const aiMsg = await llm.invoke([
    [
      "system",
      "Você é um assistente de IA que ajuda a transformar o texto que o usuário fornece para uma forma extremamente técnica (voltada a desenvolvimento de software), além de sempre traduzir para o inglês.",
    ],
    [
      "human",
      `Me ajude com a melhorar essa mensagem para uma forma bem mais técnica. Responda apenas com a frase final traduzida: ${message}`,
    ],
  ]);

  return res.json({
    text: aiMsg.content,
  });
});

app.post("/summary", async (req, res) => {
  const { message } = req.body;

  const llm = new ChatAnthropic({
    anthropicApiKey: ANTHROPIC_API_KEY,
    model: "claude-4-sonnet-20250514",
    temperature: 0.5,
    maxTokens: 1000,
    maxRetries: 2,
  });

  const aiMsg = await llm.invoke([
    [
      "system",
      "Você é um assistente de IA que ajuda a entender o contexto e sobre o que a pessoa esta falando, tentando explicar de forma mais clara, objetiva e técnica.",
    ],
    [
      "human",
      `Me ajude a entender o que essa pessoa quis dizer, responda para mim em português: ${message}`,
    ],
  ]);

  return res.json({
    text: aiMsg.content,
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
