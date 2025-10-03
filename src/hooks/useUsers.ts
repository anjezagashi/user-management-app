import { useEffect, useState } from "react";
import type { User } from "../types/UserType";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const LOCAL_KEY = "addedUsers";

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const apiUsers: User[] = await res.json();

        const storedUsers = localStorage.getItem(LOCAL_KEY);
        const addedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        setUsers([...addedUsers, ...apiUsers]);
      } catch (err) {
        console.error(err);
      }
    }
    loadUsers();
  }, []);

  const addUser = (newUser: Omit<User, "id">) => {
    const newId = Date.now();

    const userWithId = { ...newUser, id: newId as number };
    const newUsersList = [userWithId, ...users];
    setUsers(newUsersList);

    const storedUsers = localStorage.getItem(LOCAL_KEY);
    const addedUsers = storedUsers ? JSON.parse(storedUsers) : [];
    localStorage.setItem(LOCAL_KEY, JSON.stringify([userWithId, ...addedUsers]));
  };

  const getUserById = async (id: number) => {
    const found = users.find(u => u.id === id);
    if (found) return found;

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!res.ok) throw new Error("User not found");
      const data: User = await res.json();
      return data;
    } catch {
      return null;
    }
  };

  return { users, addUser, getUserById };
}
