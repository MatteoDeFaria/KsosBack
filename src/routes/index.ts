import express from "express";

export default async () => {
  const router = express.Router();


  router.get("/health", (req, res) => {
    res.status(200).send("Server up");
  });

  return router;
};
