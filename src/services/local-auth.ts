import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "../helpers/local.storage";

import { STORAGE_KEYS } from "../constants/storage-keys";
import { User } from "../types/users";

const { currentUserKey, usersKey, signedIn } = STORAGE_KEYS;

export function registerUser(newUser: Omit<User, "id">) {
  const users = getStorageItem<User[]>(usersKey) ?? [];

  const exists = users.some((user) => user.email === newUser.email);
  if (exists) throw new Error("E-mail já cadastrado");

  const user: User = { id: crypto.randomUUID(), ...newUser };
  const updated = [...users, user];

  setStorageItem(usersKey, updated);
}

export function loginUser(email: string, password: string): User {
  const users = getStorageItem<User[]>(usersKey) ?? [];

  const currentUser = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!currentUser) throw new Error("Credenciais inválidas");

  setStorageItem(currentUserKey, currentUser);
  return currentUser;
}

export function logoutUser() {
  removeStorageItem(currentUserKey);
  removeStorageItem(signedIn);
}
