import { v4 } from "uuid";
import {execute, fetchMany, fetchOne} from "..";
import {ExpenseType} from "../../Contract/ExpenseType";

export const listExpenses: (id: string) => Promise<ExpenseType[]> = async (id) => {
  const sql: string = "SELECT * FROM expenses WHERE member = $1;";
  const params: any[] = [id];

  return await fetchMany(sql, params) as ExpenseType[];
};

const getExpense: (id: string) => Promise<ExpenseType | null> = async (id) => {
  const sql: string = "SELECT * FROM expenses WHERE id = $1;";
  const params: any[] = [id];

  const result = await fetchOne(sql, params);
  if (result.length === 0) {
    return null;
  }
  return result as ExpenseType;
};

type addExpenseInputType = {
  account: string;
  member: string;
  amountUnit: number;
  amountFractional: number;
  performedOn: Date;
  savedOn: Date;
  maingroup: string;
  subgroup: string;
  label: string;
  tags: string;
};

export const addExpense: (o: addExpenseInputType) => Promise<ExpenseType> = async ({
  account,
  member,
  amountUnit,
  amountFractional,
  performedOn,
  savedOn,
  maingroup,
  subgroup,
  label,
  tags,
}) => {
  const id = v4();

  const sql: string = "INSERT INTO " +
    "expenses(id, account, member, amount_unit, amount_fractional, performed_on, saved_on, maingroup, subgroup, label, tags) " +
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);";
  const params: any[] = [
    id,
    account,
    member,
    amountUnit,
    amountFractional,
    performedOn,
    savedOn,
    maingroup,
    subgroup,
    label,
    tags,
  ];

  await execute(sql, params);

  return getExpense(id);
};
