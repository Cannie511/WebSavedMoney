import api from "@/lib/axios"

export const MoneyService = {
    getSavedMoney: async(month?:number|null, year?:number|null) => {
        const res = await api.get('/savedMoney', {
            params: {
            ...(month != null && { month }),
            ...(year != null && { year }),
            },
        });
        return res.data;
    },

    saveMoney: async(amount:number) => {
        const res = await api.post('/savedMoney', {amount});
        return res.data;
    }
}