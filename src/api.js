import express from "express";
import db from "./db";
import { adminBasicAuth, standardBasicAuth } from "./basicAuthMW";
import expressJoi from "express-joi-validator";
import Joi from "joi";
const router = express.Router();

router.get("/login", standardBasicAuth, (req, res) => {
  res.json({ success : true });
});

router.get("/feedback", adminBasicAuth, (req, res) => {
  res.json(db.getFeedback());
});

const feedbackSchema = {
  body : {
    sessionId: Joi.number().integer().required(),
    presenterPresenting: Joi.number().integer().min(0).max(5).required(),
    materialEasyToUnderstand: Joi.number().integer().min(0).max(5).required(),
    moreExcited: Joi.number().integer().min(0).max(5).required(),
    howToBeBetter: Joi.string().optional(),
    comments: Joi.string().optional(),
  },
};

router.post("/feedback", standardBasicAuth, expressJoi(feedbackSchema), (req, res) => {
  const feedback = req.body;
  db.saveFeedback(req.auth.user, feedback);
  res.json({ success : true });
});

export default router;