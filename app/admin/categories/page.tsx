'use client';

import { useEffect, useState } from 'react';

type Category = {
  id: string;
  name: string;
  active: boolean;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState('');

  async function loadCategories() {
    const response = await fetch('/api/admin/categories');
    const data = await response.json();
    setCategories(data);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function addCategory() {
    if (!newCategory.trim()) return;

    const response = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newCategory
      })
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Category added successfully');
      setNewCategory('');
      loadCategories();
    } else {
      setMessage(data.error);
    }
  }

  async function toggleCategory(
    id: string,
    active: boolean
  ) {
    await fetch('/api/admin/categories/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        active: !active
      })
    });

    loadCategories();
  }

  async function deleteCategory(id: string) {
    if (!confirm('Delete this category?')) return;

    await fetch('/api/admin/categories/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    loadCategories();
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">

      <h1 className="text-4xl font-bold">
        Category Management
      </h1>

      {message && (
        <p className="mt-4 rounded bg-green-100 p-3 text-green-700">
          {message}
        </p>
      )}

      <div className="mt-8 flex gap-3">
        <input
          value={newCategory}
          onChange={(e) =>
            setNewCategory(e.target.value)
          }
          placeholder="New category"
          className="rounded-lg border p-3"
        />

        <button
          onClick={addCategory}
          className="rounded-lg bg-violet-600 px-5 py-3 text-white"
        >
          Add Category
        </button>
      </div>

      <div className="mt-10 space-y-4">

        {categories.map((category) => (

          <div
            key={category.id}
            className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
          >
            <div>
              <h3 className="font-semibold">
                {category.name}
              </h3>

              <p className="text-sm text-slate-500">
                {category.active
                  ? 'Active'
                  : 'Inactive'}
              </p>
            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  toggleCategory(
                    category.id,
                    category.active
                  )
                }
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                {category.active
                  ? 'Disable'
                  : 'Enable'}
              </button>

              <button
                onClick={() =>
                  deleteCategory(category.id)
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-white"
              >
                Delete
              </button>

            </div>
          </div>

        ))}

      </div>

    </main>
  );
}