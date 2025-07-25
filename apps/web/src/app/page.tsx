'use client';

import { useEffect, useState } from 'react';
import { createUser, deleteUser, getUsers, updateUser, User } from '../lib/api';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingId !== null) {
      const updated = await updateUser(editingId, { name, phone });
      setUsers((prev) => prev.map((u) => (u.id === editingId ? updated : u)));
      setEditingId(null);
    } else {
      const newUser = await createUser({ name, phone });
      setUsers((prev) => [...prev, newUser]);
    }

    setName('');
    setPhone('');
    setLoading(false);
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setName(user.name);
    setPhone(user.phone);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {editingId ? 'Edit Client' : 'Add a Client'}
          </h1>
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading
                ? 'Saving...'
                : editingId
                  ? 'Update Client'
                  : 'Create Client'}
            </button>
            {editingId && (
              <button
                type="button"
                className="bg-gray-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-gray-600 transition"
                onClick={() => {
                  setEditingId(null);
                  setName('');
                  setPhone('');
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <h2 className="text-xl font-semibold px-6 pt-6 pb-2 text-gray-900 dark:text-white">
            List of Clients
          </h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-left text-gray-700 dark:text-gray-300">
                <th className="p-4 border-t border-b dark:border-gray-700">
                  ID
                </th>
                <th className="p-4 border-t border-b dark:border-gray-700">
                  Name
                </th>
                <th className="p-4 border-t border-b dark:border-gray-700">
                  Phone
                </th>
                <th className="p-4 border-t border-b dark:border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-4 border-t dark:border-gray-700">{u.id}</td>
                  <td className="p-4 border-t dark:border-gray-700">
                    {u.name}
                  </td>
                  <td className="p-4 border-t dark:border-gray-700">
                    {u.phone}
                  </td>
                  <td className="p-4 border-t dark:border-gray-700">
                    <div className="flex gap-2">
                      <button
                        className="bg-yellow-500 text-white rounded-lg px-3 py-1 hover:bg-yellow-600 text-sm font-medium transition"
                        onClick={() => handleEdit(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white rounded-lg px-3 py-1 hover:bg-red-600 text-sm font-medium transition"
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
