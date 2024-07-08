import express, { Request, Response } from "express";
import { auth } from "@/middleware";
import { RecommendationService } from "@/services";

const service = new RecommendationService();

const router = express.Router();

router.get("/recommendation", auth, async (req: Request, res: Response) => {
  const { city } = req.query;

  const data = await service.get(city as string);

  res.status(200)?.send({ data: data });
});

export default router;
