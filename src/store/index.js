import { TableData } from "@/lib/constants";
import { create } from "zustand";

export const useTableStore = create((set) => ({
    selectedTables: [],
    fileData: {},
    mappedData: [],

    setSelectedTables: (tables) => set((state) => {
        const selectedTables = tables.map((table) => TableData.find((d) => d.id === table));
        return { selectedTables };
    }),
    addTable: (id) => set((state) => ({
        selectedTables: state.selectedTables.concat(TableData.find((d) => d.id === id))
    })),
    removeTable: (id) => set((state) => ({
        selectedTables: state.selectedTables.filter((table) => table.id !== id)
    })),
    setFileData: (data) => set({ fileData: data }),

    setMappedData: (valOrFunc) => set((state) => {
        const mappedData = typeof valOrFunc === 'function' ? valOrFunc(state.mappedData) : valOrFunc;
        return { mappedData };
    }),

}));


