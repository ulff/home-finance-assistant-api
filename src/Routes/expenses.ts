import express from "express";
import tags from "../Data/tags.json";
import groups from "../Data/groups.json";

const router = express.Router();

router.get('/tags', (request, response) => {
  response.json(tags);
});

router.get('/groups', (request, response) => {
  response.json(groups);
});

export default router;

