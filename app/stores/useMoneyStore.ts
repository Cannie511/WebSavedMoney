import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MoneyService } from '../services/moneyService';
import { toast } from 'sonner';
import { formatMoney } from '@/lib/helper';

export const useMoneyStore = create<MoneyState>()(
  persist(
    (set, get) => ({
      loading: false,
      total: 0,
      randomMoneyToday: 0,
      savedMoneyToday: 0,
      transaction: [],
      lastSavedDate: null,
      month: new Date().getMonth()+1,
      year: new Date().getFullYear(),
      fetchMoney: async() => {
        try {
          set({loading: true})
          const {total, transaction} = await MoneyService.getSavedMoney(get().month, get().year);
          set({total, transaction})
        } catch (error) {
          console.log("Lỗi khi tải tiền tiết kiệm", error);
        } finally {
          set({loading: false});
        }
      },
      savedMoney: async() => {
        try {
          set({loading: true})
          if(get().randomMoneyToday === 0) return
          if(get().randomMoneyToday === get().savedMoneyToday) return;
          const newMoney = await MoneyService.saveMoney(get().randomMoneyToday);
          if(newMoney.money === 0) {
            toast.error("Có lỗi khi gửi tiền vào heo đất");
            return;
          }
          set((prev) => ({
            total: prev.total + prev.randomMoneyToday,
            savedMoneyToday: prev.randomMoneyToday,
            lastSavedDate: new Date().toDateString(),
          }))
          get().fetchMoney();
          toast.success("Đã tiết kiệm thêm được " + formatMoney(get().randomMoneyToday).toString());
        } catch (error) {
          console.log("Lỗi khi thêm tiền vào tiết kiệm", error);
        } finally {
          set({loading: false});
        }
      },
      resetIfNewDay: () => {
        const today = new Date().toDateString();
        const last = get().lastSavedDate;

        if (last !== today) {
          set({
            randomMoneyToday: 0,
            savedMoneyToday: 0,
            lastSavedDate: today,
          });
        }
      },
      decreaseMonth: () => {
        if(get().month === 1) {
          set((prev) => ({
            month: 12,
            year: prev.year - 1
          }));
          return;
        }
        set((prev) => ({
          month: prev.month -1
        }))
      },
      increaseMonth: () => {
        if(get().month === 12) {
          set((prev) => ({
            month: 1,
            year: prev.year + 1
          }))
          return;
        }
        set((prev) => ({
          month: prev.month + 1
        }))
      },
    }),
    {
      name: 'money-storage',
      partialize: (state) => ({
        total: state.total,
        randomMoneyToday: state.randomMoneyToday,
        savedMoneyToday: state.savedMoneyToday,
        transaction: state.transaction
      }),
    }
  )
);