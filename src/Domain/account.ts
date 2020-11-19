import {AccountType} from "../Contract/AccountType";
import {addAccount} from "../Db/Repository/account";
import {validate} from "uuid";

type addAccountInputType = {
  owner: string;
  number: string;
  label: string;
};

export const validateAccount: (input: addAccountInputType) => string[] = ({
  owner,
  number: accountNumber,
  label
}) => {
  const validationErrors = [];

  if (!owner || !validate(owner)) {
    validationErrors.push("Owner is empty or has invalid format.");
  }
  if (!label) {
    validationErrors.push("Label is empty.");
  }

  return validationErrors;
};

export const createAccount: (input: addAccountInputType) => Promise<AccountType> = async ({
  owner,
  number: accountNumber,
  label
}) => {
  return addAccount({
    owner,
    number: accountNumber,
    label
  });
};
