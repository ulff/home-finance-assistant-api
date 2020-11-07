import express from "express";
import {getMembers} from "../Domain/member";

const router = express.Router();

router.get('/', async (request, response) => {
  const members = await getMembers();
  response.json(members);
});

export default router;

