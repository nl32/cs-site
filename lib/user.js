import argon2 from "argon2";
export async function createUser(username, password, email) {
  const hash = await argon2.hash(password);
  return {
    username: username,
    hashedPassword: hash,
    email: email,
  };
}
