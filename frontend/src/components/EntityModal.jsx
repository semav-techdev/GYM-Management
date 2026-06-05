import { X } from "lucide-react";

export default function EntityModal({
    title,
    fields,
    formData,
    onChange,
    onSubmit,
    onClose,
    saving,
    }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
        <form
            onSubmit={onSubmit}
            className="w-full max-w-2xl rounded-2xl border border-white/20 bg-gray-900 p-6 text-white shadow-2xl"
        >
            <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-gray-300 hover:bg-white/10 hover:text-white"
            >
                <X className="h-5 w-5" />
            </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
                <label
                key={field.name}
                className="block text-sm font-medium text-gray-200"
                >
                {field.label}
                <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name] ?? ""}
                    onChange={onChange}
                    className="mt-2 w-full rounded-lg border border-white/20 bg-gray-800 px-3 py-2 text-white outline-none focus:border-red-500"
                />
                </label>
            ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
            <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-gray-700 px-5 py-2.5 text-white hover:bg-gray-600"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-red-700 px-5 py-2.5 text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {saving ? "Saving..." : "Save"}
            </button>
            </div>
        </form>
        </div>
    );
}