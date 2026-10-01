import { useState } from "react"
import { createMenuItem, updateMenuItem, deleteMenuItem } from "../../lib/api"

const CATEGORIES = [
  "Starters",
  "Mains",
  "Pasta",
  "Seafood",
  "Desserts",
  "Beverages",
  "Sides",
]

function AdminMenu({ menuItems, onRefresh }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const [formData, setFormData] = useState({
    name: "",
    category: "Mains",
    description: "",
    price: "",
    image: "",
    available: true,
  })

  const openCreateModal = () => {
    setEditingItem(null)
    setFormData({
      name: "",
      category: "Mains",
      description: "",
      price: "",
      image: "",
      available: true,
    })
    setError(null)
    setIsModalOpen(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price.toString(),
      image: item.image,
      available: item.available,
    })
    setError(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
    setError(null)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setError(null)

    try {
      const payload = {
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim(),
        price: Number(formData.price),
        image: formData.image.trim(),
        available: formData.available,
      }

      if (editingItem) {
        await updateMenuItem(editingItem._id, payload)
      } else {
        await createMenuItem(payload)
      }

      await onRefresh()
      closeModal()
    } catch (err) {
      setError(err.message || "Failed to save menu item")
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAvailability = async (item) => {
    try {
      await updateMenuItem(item._id, { available: !item.available })
      await onRefresh()
    } catch (err) {
      alert(err.message || "Failed to toggle availability")
    }
  }

  const handleDelete = async (id, name) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently remove "${name}" from the menu?`
      )
    ) {
      return
    }

    setDeletingId(id)
    try {
      await deleteMenuItem(id)
      await onRefresh()
    } catch (err) {
      alert(err.message || "Failed to delete item")
    } finally {
      setDeletingId(null)
    }
  }

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-['Playfair_Display'] text-2xl text-[#F4EFE7]">
            Menu Offerings ({menuItems.length})
          </h2>
          <p className="text-xs text-[#9C978F]">
            Manage items, pricing, categories, and dining availability
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 bg-[#B96843] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#C47A56]"
        >
          <span>+</span> Add New Dish
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition ${
                selectedCategory === cat
                  ? "bg-[#C9A66B]/20 text-[#C9A66B] ring-1 ring-[#C9A66B]/40"
                  : "bg-[#171614] text-[#9C978F] hover:text-[#F4EFE7]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 border border-[#F4EFE7]/15 bg-[#171614] px-4 py-2 text-xs text-[#F4EFE7] outline-none transition placeholder:text-[#6D6961] focus:border-[#B96843]"
        />
      </div>

      {/* Dishes Table / Cards */}
      <div className="overflow-hidden border border-[#F4EFE7]/10 bg-[#171614]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#F4EFE7]/10 bg-[#0E0E0D] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9C978F]">
              <tr>
                <th className="px-6 py-4">Dish</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Availability</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4EFE7]/5">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-[#6D6961]">
                    No dishes found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item._id}
                    className="transition hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded object-cover ring-1 ring-[#F4EFE7]/10"
                        />
                        <div>
                          <p className="font-medium text-[#F4EFE7]">
                            {item.name}
                          </p>
                          <p className="mt-0.5 line-clamp-1 max-w-xs text-[11px] text-[#6D6961]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-[#9C978F]">
                      <span className="rounded bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.1em]">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-semibold text-[#C9A66B]">
                      ${item.price}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleAvailability(item)}
                        className={`rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${
                          item.available
                            ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                            : "bg-zinc-500/15 text-zinc-400 ring-1 ring-zinc-500/30"
                        }`}
                      >
                        {item.available ? "Available" : "Unavailable"}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="border border-[#F4EFE7]/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-[#F4EFE7] transition hover:border-[#B96843] hover:text-[#B96843]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === item._id}
                          onClick={() => handleDelete(item._id, item.name)}
                          className="border border-rose-500/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-rose-300 transition hover:bg-rose-500/15 disabled:opacity-50"
                        >
                          {deletingId === item._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg border border-[#F4EFE7]/15 bg-[#171614] p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#F4EFE7]/10 pb-4">
              <h3 className="font-['Playfair_Display'] text-xl text-[#F4EFE7]">
                {editingItem ? "Edit Menu Dish" : "Create New Menu Dish"}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-lg text-[#9C978F] hover:text-[#F4EFE7]"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mt-4 border border-[#B96843]/40 bg-[#B96843]/10 p-3 text-xs text-[#F4EFE7]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="mb-1 block uppercase tracking-[0.15em] text-[#9C978F]">
                  Dish Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Charred Octopus"
                  className="w-full border border-[#F4EFE7]/15 bg-[#0E0E0D] px-3.5 py-2.5 text-sm text-[#F4EFE7] outline-none focus:border-[#B96843]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block uppercase tracking-[0.15em] text-[#9C978F]">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border border-[#F4EFE7]/15 bg-[#0E0E0D] px-3.5 py-2.5 text-sm text-[#F4EFE7] outline-none focus:border-[#B96843]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block uppercase tracking-[0.15em] text-[#9C978F]">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="24.00"
                    className="w-full border border-[#F4EFE7]/15 bg-[#0E0E0D] px-3.5 py-2.5 text-sm text-[#F4EFE7] outline-none focus:border-[#B96843]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block uppercase tracking-[0.15em] text-[#9C978F]">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Ingredients, preparation, and flavor notes"
                  className="w-full border border-[#F4EFE7]/15 bg-[#0E0E0D] px-3.5 py-2.5 text-sm text-[#F4EFE7] outline-none focus:border-[#B96843]"
                />
              </div>

              <div>
                <label className="mb-1 block uppercase tracking-[0.15em] text-[#9C978F]">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full border border-[#F4EFE7]/15 bg-[#0E0E0D] px-3.5 py-2.5 text-sm text-[#F4EFE7] outline-none focus:border-[#B96843]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="available-check"
                  name="available"
                  checked={formData.available}
                  onChange={handleInputChange}
                  className="accent-[#B96843]"
                />
                <label
                  htmlFor="available-check"
                  className="cursor-pointer text-xs uppercase tracking-[0.12em] text-[#F4EFE7]"
                >
                  Available to order
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#F4EFE7]/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-[#F4EFE7]/20 px-4 py-2.5 text-xs uppercase tracking-[0.15em] text-[#9C978F] hover:text-[#F4EFE7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#B96843] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white hover:bg-[#C47A56] disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save Dish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminMenu
