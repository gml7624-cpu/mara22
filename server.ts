import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Hot Pot Sommelier / Sauce Advisor endpoint
  app.post("/api/ai/recommend", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: "GEMINI_API_KEY is not configured",
          message: "AI 기능 안내: API 키가 설정되지 않아 기본 추천 가이드가 활성화됩니다."
        });
      }

      const { prompt, preference, brothType, excludedIngredients } = req.body;

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });

      const systemInstruction = `당신은 훠궈(하이디라오, 충칭 훠궈 등), 샤브샤브, 마라탕 전문 1급 마스터 셰프이자 소믈리에입니다.
사용자의 취향(맵기, 단맛, 고소함, 얼얼함, 기피 식재료, 선택한 육수 종류)에 맞춰 최고의 소스 황금 배합 비율과 훠궈를 200% 맛있게 즐길 수 있는 재료 활용 꿀팁을 친절하고 전문적으로 한국어로 안내해주세요.

반드시 다음 JSON 형식으로만 응답해야 합니다:
{
  "sauceName": "소스 이름 (예: 극강의 마장 칠리 배합)",
  "sauceConcept": "한 줄 특징 설명",
  "flavorProfile": {
    "nutty": 1~5,
    "spicy": 1~5,
    "savory": 1~5,
    "mala": 1~5,
    "sweet": 1~5
  },
  "recipe": [
    {"ingredient": "즈마장(땅콩참깨소스)", "amount": "2 스푼", "tip": "기본 베이스"},
    {"ingredient": "다진 마늘", "amount": "1 스푼", "tip": "알싸한 풍미"}
  ],
  "eatingOrderTips": [
    "추천 재료 투하 순서나 팁 1",
    "팁 2"
  ],
  "secretHack": "하이디라오나 집에서 써먹을 수 있는 비장의 꿀팁 (예: 유부새우완자, 토마토탕 계란죽 등)",
  "recommendedBroth": "홍탕 / 백탕 / 토마토탕 / 샤브샤브"
}`;

      const userMessage = `사용자 요청: ${prompt || "나에게 맞는 최고의 훠궈 소스와 먹는 팁을 추천해줘"}
선호 육수: ${brothType || "홍탕/백탕"}
맛 취향: ${preference || "고소하고 적당히 매콤한 맛"}
제외/기피 재료: ${excludedIngredients || "없음"}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: userMessage,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const responseText = response.text || "{}";
      try {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      } catch (parseErr) {
        return res.json({
          sauceName: "셰프의 특제 추천 소스",
          sauceConcept: "황금 비율 즈마장 칠리 소스",
          flavorProfile: { nutty: 4, spicy: 3, savory: 4, mala: 2, sweet: 2 },
          recipe: [
            { ingredient: "즈마장", amount: "2 스푼", tip: "베이스" },
            { ingredient: "다진 마늘", amount: "1 스푼", tip: "풍미" },
            { ingredient: "다진 파", amount: "1 스푼", tip: "식감" },
            { ingredient: "칠리소스", amount: "1 스푼", tip: "단짠매콤" },
            { ingredient: "참기름", amount: "반 스푼", tip: "향 극대화" }
          ],
          eatingOrderTips: ["소고기는 10초 내외로 살짝 데쳐 소스에 푹 찍어드세요"],
          secretHack: "유부 속에 새우 완자를 짜넣고 홍탕에 2분간 끓이면 국물이 배어 환상적입니다.",
          recommendedBroth: brothType || "홍탕 & 백탕"
        });
      }
    } catch (error: any) {
      console.error("AI recommendation error:", error);
      res.status(500).json({
        error: "AI 추천 처리 중 오류가 발생했습니다.",
        details: error?.message || "Unknown error"
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Hot Pot Master Server running on port ${PORT}`);
  });
}

startServer();
