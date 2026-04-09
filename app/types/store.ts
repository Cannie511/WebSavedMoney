type MoneyState = {
    loading: boolean;
    total: number;
    month: number;
    year: number;
    lastSavedDate: string | null;
    transaction: Transaction[];
    randomMoneyToday: number;
    savedMoneyToday: number;
    fetchMoney: () => Promise<void>;
    savedMoney: () => Promise<void>;
    resetIfNewDay: () => void;
    increaseMonth: () => void;
    decreaseMonth: () => void;
}

type Transaction = {
    _id: string,
    amount: number,
    date: Date,
    createdAt: string,
    updatedAt: string,
}