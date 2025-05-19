import { Router, Request, Response } from 'express';
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

router.post('/', async (req: Request, res: Response):Promise<void> => {
  const { message } = req.body;

  if (typeof message !== 'string') {
     res.status(400).json({ error: 'message must be a string' });
     return;
  }

  try {
    const url = `${GEMINI_URL}?key=${encodeURIComponent(API_KEY)}`;
    const resp = await axios.post(
      url,
      {
        contents: [{ role: 'user', parts: [{ text: message }] }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const candidate = resp.data.candidates?.[0];
    if (!candidate?.content?.parts?.[0]?.text) {
       res.status(500).json({ error: 'No reply from Gemini' });
       return;
    }

     res.json({ reply: candidate.content.parts[0].text });
     return;
  } catch (err: any) {
    console.error('Gemini API error:', err.response?.data || err.message);
     res.status(500).json({ error: 'Gemini fetch failed' });
     return;
  }
});

export default router;
