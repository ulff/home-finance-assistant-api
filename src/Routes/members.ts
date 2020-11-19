import express from "express";
import { validate } from "uuid";
import {listMembers, getMember} from "../Db/Repository/member";
import {getAccounts} from "../Db/Repository/account";
import {registerMember, validateRegistration} from "../Domain/member";
import DuplicateKeyError from "../Db/Error/DuplicateKeyError";
import {createAccount, validateAccount} from "../Domain/account";

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

router.post('/', async (request, response) => {
  const email = request.body.email as string;
  const firstname = request.body.firstname as string;
  const lastname = request.body.lastname as string;

  const validationErrors = validateRegistration({ email, firstname, lastname });
  if (validationErrors.length > 0) {
    response.status(400).json({ errors: validationErrors });
    return;
  }

  try {
    const member = await registerMember({ email, firstname, lastname });
    response.status(201).json(member);
  } catch (e) {
    if (e instanceof DuplicateKeyError) {
      response.status(409).json({ errors: ['Member with given email already exists.']});
      return;
    }
    response.status(500).end();
  }
});

router.get('/:memberId/accounts', async (request, response) => {
  if (!request.params.memberId || !validate(request.params.memberId)) {
    response.status(400).end();
    return;
  }

  const accounts = await getAccounts(request.params.memberId);
  response.json(accounts);
});

router.post('/:memberId/accounts', async (request, response) => {
  const owner = request.params.memberId;
  const accountNumber = request.body.number as string;
  const label = request.body.label as string;

  const validationErrors = validateAccount({ owner, number: accountNumber, label });
  if (validationErrors.length > 0) {
    response.status(400).json({ errors: validationErrors });
    return;
  }

  try {
    const account = await createAccount({ owner, number: accountNumber, label });
    response.status(201).json(account);
  } catch (e) {
    response.status(500).end();
  }
});

export default router;

