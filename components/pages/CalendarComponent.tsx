import { Card, CardHeader } from '../ui/card';
import { formatDate, formatMoneyVN } from '@/lib/helper';
import { Button } from '../ui/button';
import { History } from 'lucide-react';
import { useMoneyStore } from '@/app/stores/useMoneyStore';
import { cn } from '@/lib/utils';
import DialogTransaction from './DialogTransaction';
import { useState } from 'react';

const CalendarComponent = ({lastDay}:{lastDay: number}) => {
    const today = new Date();
    const [openDialogTransaction, setOpenDialogTransaction] = useState<boolean>(false);
    const {transaction, month, year} = useMoneyStore();
    const dayOfMonth = new Map();
    for(let i = 1; i<= lastDay; i ++){
        dayOfMonth.set(i, 0);
    }
    transaction.forEach((t) => {
        const day = new Date(t.date).getDate();

        const current = dayOfMonth.get(day) || 0; 

        dayOfMonth.set(day, current + t.amount);
    });
    return (
    <Card className='p-0 space-y-0 shadow-lg'>
        <CardHeader className='p-4'>
            <div className='flex items-center justify-between'>
                <h3 className='text-xl font-bold'>Tháng {month}, {year}</h3>
                <Button onClick={()=>setOpenDialogTransaction(true)} className={'text-md cursor-pointer rounded-md bg-blue-400 hover:bg-blue-400/80 transition-colors duration-200' }>
                    <History className='size-4'/> Lịch sử tiết kiệm
                </Button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-10 space-y-2 sm:space-y-4">
                {dayOfMonth && Array.from(dayOfMonth).map((k, i) => {
                    return (
                        <div key={i} className={cn("rounded-xl flex-1 text-center px-3 py-1 group hover:bg-secondary transition-all fade-in cursor-pointer", today.getDate() === k[0] && "bg-yellow-200/70")}>
                            <span className='font-semibold text-xl'>{k[0]}</span>
                            <p className={cn('font-semibold text-muted-foreground text-xl', k[1] <= 0 ? "text-destructive" : "text-green-600" )}>{k[1] > 0 && "+"}{formatMoneyVN(k[1])}</p>
                        </div>
                    )
                })}
            </div>
        </CardHeader>
        <DialogTransaction open={openDialogTransaction} setOpen={setOpenDialogTransaction}/>
    </Card>
  )
}

export default CalendarComponent