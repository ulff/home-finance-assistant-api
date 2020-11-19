import {execute, fetchMany, fetchOne} from "..";
import {AccountType} from "../../Contract/AccountType";
import {v4} from "uuid";

export const getAccounts: (owner: string) => Promise<AccountType[]> = async (owner) => {
  const sql: string = "SELECT * FROM accounts WHERE owner = $1;";
  const params: any[] = [owner];

  return await fetchMany(sql, params) as AccountType[];
};

const getAccount: (id: string) => Promise<AccountType | null> = async (id) => {
  const sql: string = "SELECT * FROM accounts WHERE id = $1;";
  const params: any[] = [id];

  const result = await fetchOne(sql, params);
  if (result.length === 0) {
    return null;
  }
  return result as AccountType;
};

type addAccountInputType = {
  owner: string;
  number?: string ;
  label: string;
};

export const addAccount: (o: addAccountInputType) => Promise<AccountType> = async ({
  owner,
  number: accountNumber,
  label,
}) => {
  const id = v4();

  const sql: string = "INSERT INTO " +
    "accounts(id, owner, number, label) " +
    "VALUES ($1, $2, $3, $4);";
  const params: any[] = [
    id,
    owner,
    accountNumber || null,
    label,
  ];

  await execute(sql, params);

  return getAccount(id);
};
