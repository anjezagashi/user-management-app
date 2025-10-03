import React, { useState } from "react";
import type { User } from "../types/UserType";

type Props = {
  onAdd: (user: Omit<User, "id">) => void;
};

const initialForm = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  company: "",
  street: "",
  suite: "",
  city: "",
  zipcode: "",
};

export default function UserForm({ onAdd }: Props) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const newUser: Omit<User, "id"> = {
      name: form.name,
      username: form.username || "",
      email: form.email,
      phone: form.phone || "",
      website: form.website || "",
      company: {
        name: form.company || "",
        catchPhrase: "",
        bs: "",
      },
      address: {
        street: form.street || "",
        suite: form.suite || "",
        city: form.city || "",
        zipcode: form.zipcode || "",
      },
    };

    onAdd(newUser);
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        Add New User
      </h3>

      {Object.values(errors)?.map((err, i) => (
        <p key={i} className="text-red-500 text-sm text-center">{err}</p>
      ))}


      {["name", "username", "email", "phone", "website", "company"].map(
        (field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={`${field[0].toUpperCase()}${field.slice(1)}${['name','email'].includes(field) ? ' *' : ''}`}
            value={(form as any)[field]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500"
          />
        )
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {["street", "suite", "city", "zipcode"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={`${field[0].toUpperCase()}${field.slice(1)}`}
            value={(form as any)[field]}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500"
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
      >
        Add User
      </button>
    </form>
  );
}
