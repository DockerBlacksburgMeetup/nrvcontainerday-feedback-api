import basicAuth from "express-basic-auth";
import fs from "fs";

let users = { admin : "admin" };
let usersSecretPath = "/run/secrets/users.json";
if (fs.existsSync(usersSecretPath))
  users = JSON.parse(fs.readFileSync(usersSecretPath));

let adminUsers = { admin : "admin" };
let adminUsersSecretPath = "/run/secrets/adminUsers.json";
if (fs.existsSync(adminUsersSecretPath))
  adminUsers = JSON.parse(fs.readFileSync(adminUsersSecretPath));


export const standardBasicAuth = basicAuth({ users });

export const adminBasicAuth = basicAuth({ users : adminUsers });