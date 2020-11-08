import {fetchMany} from "../Db";
import {AccountType} from "../Contract/AccountType";

export const getAccounts: (owner: string) => Promise<AccountType[]> = async (owner) => {
  const sql: string = "SELECT * FROM accounts WHERE owner = $1;";
  const params: any[] = [owner];

  return await fetchMany(sql, params) as AccountType[];
};
