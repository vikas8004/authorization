import bcryptjs from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const haspass = await bcryptjs.hash(password, salt);
//   console.log(haspass);
  return haspass;
};
