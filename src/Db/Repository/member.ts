import { v4 } from "uuid";
import {execute, fetchMany, fetchOne} from "..";
import {MemberType} from "../../Contract/MemberType";

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

type addMemberInputType = {
  email: string;
  firstname: string;
  lastname: string;
};

export const addMember: (o: addMemberInputType) => Promise<MemberType> = async ({
  email,
  firstname,
  lastname,
}) => {
  const id = v4();

  const sql: string = "INSERT INTO " +
    "users(id, email, firstname, lastname) " +
    "VALUES ($1, $2, $3, $4);";
  const params: any[] = [
    id,
    email,
    firstname,
    lastname,
  ];

  await execute(sql, params);

  return getMember(id);
};
