import express from "express";
import tagsDictionary from "../Data/tags.json";
import groupsDictionary from "../Data/groups.json";
import {validate} from "uuid";
import {listExpenses} from "../Db/Repository/expense";
import {saveExpense, validateExpense} from "../Domain/expense";

const router = express.Router();

router.get('/tags', (request, response) => {
  response.json(tagsDictionary);
});

router.get('/groups', (request, response) => {
  response.json(groupsDictionary);
});

router.get('/', async (request, response) => {
  const member = request.query.memberId as string;

  if (!member || !validate(member)) {
    response.status(400).json({ errors: ['Member context is obligatory.']});
    return;
  }

  const expenses = await listExpenses(member);
  response.json(expenses);
});

router.post('/', async (request, response) => {
  const member = request.query.memberId as string;

  const account = request.body.account as string;
  const amountUnit = request.body.amountUnit as number;
  const amountFractional = request.body.amountFractional as number;
  const performedOn = request.body.performedOn as Date;
  const maingroup = request.body.maingroup as string;
  const subgroup = request.body.subgroup as string;
  const label = request.body.label as string;
  const tags = request.body.tags as string;

  const validationErrors = validateExpense({
    account,
    member,
    amountUnit,
    amountFractional,
    performedOn,
    maingroup,
    subgroup,
    label,
    tags,
  });
  if (validationErrors.length > 0) {
    response.status(400).json({ errors: validationErrors });
    return;
  }

  try {
    const expense = await saveExpense({
      account,
      member,
      amountUnit,
      amountFractional,
      performedOn,
      maingroup,
      subgroup,
      label,
      tags
    });
    response.status(201).json(expense);
  } catch (e) {
    response.status(500).end();
  }
});

export default router;

