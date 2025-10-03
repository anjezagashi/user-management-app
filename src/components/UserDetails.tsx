import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "../types/UserType";
import { useUsers } from "../hooks/useUsers";

export default function UserDetails() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { getUserById } = useUsers();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (location.state) {
      setUser(location.state as User);
      return;
    }
    if (id) {
      getUserById(Number(id)).then(setUser);
    }
  }, [id, location.state, getUserById]);

  if (!user) return <p className="text-center mt-10">User not found</p>;


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow rounded p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{user.name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="mb-2"><strong className="text-gray-700">Email:</strong> {user.email}</p>
            <p className="mb-2"><strong className="text-gray-700">Username:</strong> {user.username}</p>
            <p className="mb-2"><strong className="text-gray-700">Phone:</strong> {user.phone}</p>
            <p className="mb-2">
              <strong className="text-gray-700">Website:</strong>{" "}
              <span className="text-blue-600 underline cursor-default">
                {user.website}
              </span>
            </p>
          </div>

          <div>
            <strong className="text-gray-700 mb-2">Company</strong>
            <p className="mb-1">{user.company?.name}</p>
            <p className="text-sm text-gray-600 italic mb-1">“{user.company?.catchPhrase}”</p>
          </div>
        </div>

        <div className="mt-6">
          <strong className="text-gray-700 mb-2">Address:</strong>
          <p>{user.address?.street}, {user.address?.suite}</p>
          <p>{user.address?.city} - {user.address?.zipcode}</p>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back to list
          </Link>
        </div>
      </div>
    </div>
  );
}
