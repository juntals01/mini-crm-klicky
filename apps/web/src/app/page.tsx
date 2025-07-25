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
    <div className="min-h-screen p-8 max-w-xl mx-auto space-y-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border p-6 rounded-xl shadow bg-white dark:bg-gray-900"
      >
        <h1 className="text-xl font-semibold">
          {editingId ? 'Edit User' : 'Add User'}
        </h1>
        <input
          type="text"
          placeholder="Name"
          className="border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          className="border px-3 py-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update User' : 'Create User'}
          </button>
          {editingId && (
            <button
              type="button"
              className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600"
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

      <table className="w-full border-collapse border text-sm shadow bg-white dark:bg-gray-900">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-left">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => {
            console.log('User Row Key:', u.id);
            return (
              <tr key={u.id} className="border-t">
                <td className="p-3 border">{u.id}</td>
                <td className="p-3 border">{u.name}</td>
                <td className="p-3 border">{u.phone}</td>
                <td className="p-3 border">
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-500 text-white rounded px-4 py-2 hover:bg-yellow-600"
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
