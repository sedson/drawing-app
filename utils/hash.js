// basic util for hashing and verfiying a password

const crypto = require('crypto')
const salt = process.env.SALT || "de9a20a535aa5afe5474b12306a1a26f";

const hash = (password) => {
  const hashedBuffer = crypto.pbkdf2Sync(password, salt, 100, 64, 'sha512');
  return hashedBuffer.toString('hex');
}

const verify = (hashedPassword, attempt) => {
  return hash(attempt) === hashedPassword;
}

module.exports = {
  hash: hash,
  verify: verify
}
