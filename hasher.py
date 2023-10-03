# Run in terminal: "pip install bcrypt"
import bcrypt
password = b"password"
salt = bcrypt.gensalt(rounds=15)
hashed_password = bcrypt.hashpw(password, salt)
# print(hashed_password)
