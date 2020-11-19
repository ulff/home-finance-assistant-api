import {AccountType} from "../Contract/AccountType";
import {addAccount} from "../Db/Repository/account";

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

  if (!owner) {
    validationErrors.push("Owner is empty.");
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
