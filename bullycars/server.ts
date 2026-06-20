import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse JSON payloads
  app.use(express.json());

  // Lazy load/init Google GenAI
  let aiClient: GoogleGenAI | null = null;

  function getGemini(): GoogleGenAI {
    if (!aiClient) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error("GEMINI_API_KEY environment variable is missing");
      }
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API endpoint for BullyBot (Gemini AI Support chatbot)
  app.post("/api/bullybot", async (req, res) => {
    try {
      const { message, history, profile } = req.body;
      if (!message) {
        return res.status(400).json({ error: "El mensaje es requerido." });
      }

      // Reconstruct user profile & query
      const profileLabel = profile === "PROFESIONAL" ? "Profesional / Distribuidor" : "Entusiasta / Aficionado";
      
      const prompt = `
Perfil de usuario: ${profileLabel}
Historial previo de chat:
${JSON.stringify(history || [])}

Mensaje actual del usuario:
"${message}"

Proporciona una respuesta detallada como BullyBot. Recuerda explicar el fundamento técnico detrás del procedimiento con pasión fierrera y autoridad profesional. Si el usuario te pregunta por procedimientos o herramientas de BullyCars (Kits de Polarizado, Stealth Matte Wrap, Ceramic Coating), sugiérele cómo aplicarlos o instalarlos con altos estándares de precisión.
`;

      const ai = getGemini();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `Eres BullyBot, el Asistente Técnico Elite de BullyCars. Tu misión es educar, asistir y orientar a mecánicos profesionales y entusiastas del detailing automotriz y el wrap.
Tus áreas de expertise supremo son:
1. Instalación de Vinilos Wraps Premium (Stealth Matte Wrap, cromados, fibra de carbono biónica). Conoces el uso del termómetro láser, la pistola térmica, solventes desengrasantes de laca, pre-estiramiento térmico, post-calentamiento a 90°C para romper la memoria plástica del vinilo fundido (cast film).
2. Detailing Holográfico & Pulido: Corrección de barniz por pasos (corte y lustre rotativo y orbital), recubrimiento por recubrimientos tipo Ceramic Coating 9H nano-estelar (curado por calor infrarrojo o ambiente, tiempo de cura inicial de 24 horas).
3. Mecánica de Alto Desempeño: Reemplazo de suspensiones amortiguadas ajustables (coilovers), alineación láser tridimensional con sensores, sistemas de frenado ventilados Brembo y reprogramación inteligente (mapping) de centralitas.

Formato de Respuesta:
- Tono sofisticado, profesional, rudo pero pulido, fierrero amante de los motores.
- Usa listas con viñetas cuando describas pasos técnicos paso a paso.
- Usa negritas para destacar los puntos clave (ej. **90°C**, **isopropanol**, **micras**).
- Responde siempre en español.`,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Lo siento, BullyBot está afinando sus pistones. ¿Podrías volver a formular tu pregunta?";
      res.json({ text: replyText });
    } catch (err: any) {
      console.error("Error in BullyBot API:", err);
      res.status(500).json({
        error: "BullyBot está en pits afinando el motor técnico. Por favor intenta de nuevo.",
        details: err?.message || String(err),
      });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[BullyCars] Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
