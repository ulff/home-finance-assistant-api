import express from "express";
import { validate } from "uuid";
import {listMembers, getMember} from "../Db/Repository/member";
import {getAccounts} from "../Db/Repository/account";

const router = express.Router();

router.get('/', async (request, response) => {
  const members = await listMembers();
  response.json(members);
});

router.get('/:memberId', async (request, response) => {
  if (!request.params.memberId || !validate(request.params.memberId)) {
    response.status(400).end();
    return;
  }

  const member = await getMember(request.params.memberId);

  if (!member) {
    response.status(404).end();
    return;
  }
  response.json(member);
});

router.get('/:memberId/accounts', async (request, response) => {
  if (!request.params.memberId || !validate(request.params.memberId)) {
    response.status(400).end();
    return;
  }

  const accounts = await getAccounts(request.params.memberId);
  response.json(accounts);
});

export default router;

