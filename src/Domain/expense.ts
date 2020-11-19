import {ExpenseType} from "../Contract/ExpenseType";
import {addExpense} from "../Db/Repository/expense";
import {validate} from "uuid";

type expenseInputType = {
  account: string;
  member: string;
  amountUnit: number;
  amountFractional: number;
  performedOn: Date;
  maingroup: string;
  subgroup: string;
  label: string;
  tags: string;
};

export const validateExpense: (input: expenseInputType) => string[] = ({
  account,
  member,
  amountUnit,
  amountFractional,
  maingroup,
  subgroup,
}) => {
  const validationErrors = [];

  if (!account || !validate(account)) {
    validationErrors.push("Account is empty or has invalid format.");
  }
  if (!member || !validate(member)) {
    validationErrors.push("Member is empty or has invalid format.");
  }
  if (!amountUnit || !amountFractional) {
    validationErrors.push("Amount is empty or invalid.");
  }
  if (!maingroup || !subgroup) {
    validationErrors.push("Group is empty or invalid.");
  }

  return validationErrors;
};

export const saveExpense: (input: expenseInputType) => Promise<ExpenseType> = async ({
  account,
  member,
  amountUnit,
  amountFractional,
  performedOn,
  maingroup,
  subgroup,
  label,
  tags,
}) => {
  const savedOn = new Date();

  return addExpense({
    account,
    member,
    amountUnit,
    amountFractional,
    performedOn: performedOn || savedOn,
    savedOn,
    maingroup,
    subgroup,
    label: label || null,
    tags: tags || null,
  });
};
