import {fetchMany} from "../Db";
import {MemberType} from "../Contract/MemberType";

export const getMembers: () => Promise<MemberType[]> = async () => {
  const sql: string = "SELECT * FROM users;";
  const params: any[] = [];

  return await fetchMany(sql, params) as MemberType[];
};
