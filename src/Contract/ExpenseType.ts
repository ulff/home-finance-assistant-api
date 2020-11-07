import {AccountType} from "./AccountType";
import {MemberType} from "./MemberType";

export type AmountType = {
  unit: number;
  fractional: number;
}

export type GroupType = {
  type: string;
  label: string;
}
export type GroupNodeType = GroupType & { children: GroupLeafType[] }
export type GroupLeafType = GroupType

export type TagType = string;

export type ExpenseType = {
  amount: AmountType;
  date: Date;
  label: string | null;
  group: GroupNodeType;
  subgroup: GroupLeafType;
  tags: TagType[];
  account: AccountType;
  executor: MemberType;
}
