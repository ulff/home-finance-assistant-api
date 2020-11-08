import {fetchMany, fetchOne} from "../Db";
import {MemberType} from "../Contract/MemberType";

export const listMembers: () => Promise<MemberType[]> = async () => {
  const sql: string = "SELECT * FROM users;";
  const params: any[] = [];

  return await fetchMany(sql, params) as MemberType[];
};

export const getMember: (id: string) => Promise<MemberType | null> = async (id) => {
  const sql: string = "SELECT * FROM users WHERE id = $1;";
  const params: any[] = [id];

  const result = await fetchOne(sql, params);
  if (result.length === 0) {
    return null;
  }
  return result as MemberType;
};
