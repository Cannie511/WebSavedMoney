import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card } from '../ui/card';
import { useMoneyStore } from '@/app/stores/useMoneyStore';
import { formatDateTransaction, formatMoney } from '@/lib/helper';
import { Calendar, ChevronLeft, ChevronRight, CircleDollarSign, History } from 'lucide-react';
import { Button } from '../ui/button';
interface DialogTransactionProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
const DialogTransaction = ({open, setOpen}: DialogTransactionProps) => {
    const today = new Date();
    const {transaction, month, year, increaseMonth, decreaseMonth, fetchMoney} = useMoneyStore();
    const reverseTransaction = [...transaction].reverse();
    const handleIncrease = () => {
        increaseMonth();
        fetchMoney();
    }
    const handleDecrease = () => {
        decreaseMonth();
        fetchMoney();
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={'w-[825px] bg-linear-60 from-blue-300 via-pink-300 to-purple-300'} >
            <DialogHeader>
                <DialogTitle className={'text-xl text-white font-bold flex items-center space-x-2'}>
                    <History className='size-6'/> <span>Lịch sử tiết kiệm</span>
                </DialogTitle>
            </DialogHeader>
            <Card className="p-5 border-none bg-origin-border shadow-lg">
                <div className='flex items-center justify-between'>
                    <Button size={'icon'} variant={'ghost'} onClick={handleDecrease}> <ChevronLeft className='size-5'/> </Button>
                    <h3 className='sm:text-2xl text-lg'>Tháng {month}, {year} </h3>
                    <Button size={'icon'} variant={'ghost'} disabled={month === Number(today.getMonth() + 1)} onClick={handleIncrease}> <ChevronRight className='size-5'/> </Button>
                </div>
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {
                        reverseTransaction.length === 0 && (
                            <div className='text-center text-muted-foreground'>
                                Chưa để được đồng nào hết zạyy 😥
                            </div>
                        )
                    }
                    {
                        reverseTransaction.reverse().map((t) => {
                            return (
                                <div key={t._id} className='flex items-center justify-between space-y-2'>
                                    <span className='text-sm text-muted-foreground flex items-center space-x-2 bg-muted rounded-full py-1 px-2'><Calendar className='size-5'/> <span>{formatDateTransaction(t.date)}</span></span>
                                    <span className='text-green-600 text-md flex items-center space-x-1'><span>+{formatMoney(t.amount)} đ </span> <CircleDollarSign className='size-4 text-yellow-600'/></span>
                                </div>
                            )
                        })
                    }
                </div>
            </Card>
        </DialogContent>
    </Dialog>
  )
}

export default DialogTransaction