import { Search, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    } from "@/components/ui/tooltip";

    export default function DataTable({
    title,
    columns,
    data,
    loading,
    search,
    setSearch,
    searchPlaceholder,
    onEdit,
    onDelete,
    onAdd,
    onRowClick,
    getItemName = (item) => item.name || item.title || "Item",
    }) {
    if (loading) {
        return <div className="text-white p-10">Loading {title.toLowerCase()}...</div>;
    }

    return (
        <div className="relative min-h-screen px-5 py-8">
        {/* Search */}
        <div className="flex justify-center mb-12">
            <div className="bg-gray-700/80 rounded-full w-full max-w-[650px] px-6 py-4 flex items-center gap-4 backdrop-blur-lg">
            <Search className="text-gray-300" />
            <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none flex-1 text-white placeholder:text-gray-300"
            />
            </div>
        </div>

        <h1 className="text-white text-3xl mb-8">{title}</h1>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-white/30 bg-gray-800/70 backdrop-blur-lg text-center">
            <table className="w-full text-white">
            <thead>
                <tr className="bg-red-900">
                {columns.map((col) => (
                    <th key={col.key} className="p-4">
                    {col.label}
                    </th>
                ))}
                <th className="p-4">MODIFY</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                data.map((item) => (
                    <tr
                    key={item.id}
                    className="border-b border-white/20 hover:bg-white/5 transition"
                    >
                    {columns.map((col) => (
                        <td
                        key={col.key}
                        className={`p-4 ${onRowClick ? "cursor-pointer" : ""}`}
                        onClick={() => onRowClick?.(item, col.key)}
                        >
                        {col.render ? col.render(item) : item[col.key]}
                        </td>
                    ))}
                    <td className="p-4">
                        <TooltipProvider>
                        <div className="flex justify-center gap-2">
                            <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => onDelete(item, getItemName(item))}
                                className="cursor-pointer hover:bg-red-800"
                                >
                                <Trash className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="text-white">
                                <p>Delete</p>
                            </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                type="button"
                                variant="secondary"
                                size="icon"
                                onClick={() => onEdit(item)}
                                className="cursor-pointer hover:bg-blue-800"
                                >
                                <Pencil className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="text-white">
                                <p>Edit</p>
                            </TooltipContent>
                            </Tooltip>
                        </div>
                        </TooltipProvider>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={columns.length + 1} className="p-6 text-center">
                    No {title.toLowerCase()} found
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>

        {/* Add Button */}
        <div className="flex justify-center mt-10">
            <button
            type="button"
            onClick={onAdd}
            className="px-10 py-4 rounded-full bg-gray-700 text-white text-xl hover:bg-gray-600 transition"
            >
            Add {title.replace(" MANAGEMENT", "").toLowerCase()}
            </button>
        </div>
        </div>
    );
}
