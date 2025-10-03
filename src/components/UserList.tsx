import { useState } from "react"
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import { useUsers } from "../hooks/useUsers";

export default function UserList() {
  const { users, addUser } = useUsers();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  const filtered = users.filter((u) => {
    const res = search.trim().toLowerCase();
    if (!res) return true;
      return (
        u.name.toLowerCase().includes(res) || u.email.toLowerCase().includes(res)
      );
  });

  const handleSort = () => {
    setSortOrder((prev) =>
      prev === "none" ? "asc" : prev === "asc" ? "desc" : "none"
    );
  };

  const sorted = sortOrder === "none" ? filtered : [...filtered].sort((a, b) =>
        sortOrder === "asc" ? a.name.localeCompare(b.name): b.name.localeCompare(a.name));


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <button
          onClick={() => setShowForm(true)}
          className="ml-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Add User
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative z-10">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <UserForm onAdd={(u) => { addUser(u); setShowForm(false); }} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th
                onClick={handleSort}
                className="text-center px-4 py-2 cursor-pointer hover:bg-gray-200 select-none"
              >
                Name{" "}
                {sortOrder === "none" && "↑↓"}
                {sortOrder === "asc" && "↑"}
                {sortOrder === "desc" && "↓"}
              </th>
              <th className="text-center px-4 py-2">Email</th>
              <th className="text-center px-4 py-2">Company</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 border-b border-gray-200">
                <td colSpan={3} className="p-0">
                  <Link
                    to={`/users/${user.id}`}
                    state={user}
                    className="block px-4 py-2 w-full"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <span>{user.name}</span>
                      <span>{user.email}</span>
                      <span>{user.company?.name}</span>
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center px-4 py-2">
                  No users match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}