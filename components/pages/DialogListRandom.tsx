
import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Card, CardFooter } from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CircleCheckBig, Dices } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface DialogListRandomProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setRandomList: Dispatch<SetStateAction<number[]>>;
}

const listPolyme = [
    {value: 10000, imgUrl: '/10k.jpg', isSelected: false},
    {value: 20000, imgUrl: '/20k.jpg', isSelected: false},
    {value: 50000, imgUrl: '/50k.jpg', isSelected: false},
    {value: 100000, imgUrl: '/100k.jpg', isSelected: false},
    {value: 200000, imgUrl: '/200k.jpg', isSelected: false},
    {value: 500000, imgUrl: '/500k.jpg', isSelected: false},
]

const DialogListRandom = ({open, setOpen, setRandomList}: DialogListRandomProps) => {
    const [maxValue, setMaxValue] = useState<number>(0);
    const handleOnClick = (money:any) => {
        console.log(money)
        setMaxValue(money.value);
    }

    const handleConfirm = () => {
        const temp:number[] = [];
        for(let i = 0; i<=maxValue; i+=maxValue/10) {
            if(i !== 0) temp.push(i);
        }
        console.log(temp);
        setRandomList(temp);
        toast.success("Tạo danh sách quay ngẫu nhiên thành công")
        setOpen(false)
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={'w-[825px]'}>
            <DialogHeader>
                <DialogTitle className={'text-xl font-bold'}>
                    Thêm các mệnh giá để quay số
                </DialogTitle>
            </DialogHeader>
            <Card className="p-5 border-none shadow-lg">
                <div className="grid grid-cols-2 space-x-4 space-y-4">
                    {listPolyme.map(p => {
                        return (
                            <div key={p.value} onClick={() => handleOnClick(p)} className="flex items-center justify-center cursor-pointer">
                                <Image width={200} height={200} src={p.imgUrl} alt={p.value.toString()} className={cn(maxValue === p.value && "opacity-50 scale-90")}/>
                                {maxValue === p.value && <CircleCheckBig className="size-6 text-green-700 absolute z-10"/>}
                            </div>
                        )
                    })}
                </div>
                <CardFooter className="p-0">
                    {
                        maxValue > 0 && 
                        <Button onClick={handleConfirm} className='w-full bg-blue-400/70 hover:bg-blue-400 cursor-pointer transition-colors hover:animate-in h-fit p-3'>
                            <Dices className='size-12'/>
                            <div>
                                <span className='text-lg font-semibold'>Quay Ngẫu Nhiên</span>
                                <p className='text-sm text-muted-foreground'>Tạo một số tiền ngẫu nhiên</p>
                            </div>
                        </Button>
                    }
                </CardFooter>
            </Card>
        </DialogContent>
    </Dialog>
  )
}

export default DialogListRandom