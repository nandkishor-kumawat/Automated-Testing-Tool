import { data } from "@/lib/constants";
import { create } from "zustand";



export const useTableStore = create((set) => ({
    selectedTables: [],
    setSelectedTables: (tables) => set((state) => {
        //map the tables array to the data
        const selectedTables = tables.map((table) => data.find((d) => d.id === table));
        return { selectedTables };
    }),
    addTable: (id) => set((state) => ({
        selectedTables: state.selectedTables.concat(data.find((d) => d.id === id))
    })),
    removeTable: (id) => set((state) => ({
        selectedTables: state.selectedTables.filter((table) => table.id !== id)
    }))
}));