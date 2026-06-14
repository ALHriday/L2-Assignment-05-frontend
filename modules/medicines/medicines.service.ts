


export const medicinesService = {
    getMedicines: async (search: string, m: string, sort: string, categoryId: string, skip: number) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (m) params.append("m", m);
        if (sort) params.append("sort", sort);
        if (categoryId) params.append("categoryId", categoryId);
        if (skip) params.append("skip", skip.toString());

        const query = params.toString();

        try {
            const res = await fetch(`/api/medicines?${query}`);

            if (!res.ok) {
                throw new Error(`HTTP error! status ${res.status}`);
            }
            const data = await res.json();

            return { data, error: null };
        } catch {
            return { result: null, err: { message: 'something went wrong!' } }
        }
    },
    getAllCategories: async () => {
        try {
            const res = await fetch(`/api/categories`);
            if (!res.ok) {
                throw new Error(`HTTP error! status ${res.status}`);
            }
            const data = await res.json();

            return { data: data?.data, error: null };
        } catch {
            return { result: null, err: { message: 'something went wrong!' } }
        }
    },
    getMedicinesCount: async () => {
        try {
            const res = await fetch(`/api/getMedicinesLen`);
            if (!res.ok) {
                throw new Error(`HTTP error! status ${res.status}`);
            }
            const data = await res.json();

            return { data: data?.data, error: null };
        } catch {
            return { result: null, err: { message: 'something went wrong!' } }
        }
    },
}