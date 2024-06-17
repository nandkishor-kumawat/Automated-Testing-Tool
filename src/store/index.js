import { TableData } from "@/lib/constants";
import { create } from "zustand";

export const useTableStore = create((set) => ({
    selectedTables: [],
    setSelectedTables: (tables) => set((state) => {
        const selectedTables = tables.map((table) => TableData.find((d) => d.id === table));
        return { selectedTables };
    }),
    addTable: (id) => set((state) => ({
        selectedTables: state.selectedTables.concat(TableData.find((d) => d.id === id))
    })),
    removeTable: (id) => set((state) => ({
        selectedTables: state.selectedTables.filter((table) => table.id !== id)
    }))
}));