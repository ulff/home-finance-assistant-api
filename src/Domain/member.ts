import {MemberType} from "../Contract/MemberType";
import {addMember} from "../Db/Repository/member";

type registrationInputType = {
  email: string;
  firstname: string;
  lastname: string;
};

export const validateRegistration: (input: registrationInputType) => string[] = ({
  email,
  firstname,
  lastname
}) => {
  const validationErrors = [];

  if (!email) {
    validationErrors.push("Email is empty.");
  }
  if (!firstname) {
    validationErrors.push("Firstname is empty.");
  }
  if (!lastname) {
    validationErrors.push("Lastname is empty.");
  }

  return validationErrors;
};

export const registerMember: (input: registrationInputType) => Promise<MemberType> = async ({
  email,
  firstname,
  lastname
}) => {
  return addMember({
    email,
    firstname,
    lastname,
  });
};
