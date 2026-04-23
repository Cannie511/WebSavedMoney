'use client'
import { Card, CardContent, CardHeader } from '../ui/card'
import { formatDate, formatMoney, getLastDayOfMonth, randomMoneyRealistic } from '@/lib/helper';
import { BadgeDollarSign, Calendar, ChartNoAxesCombined, Dices, RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import CalendarComponent from './CalendarComponent';
import HeaderHomePage from './HeaderHomePage';
import { useMoneyStore } from '@/app/stores/useMoneyStore';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import DialogListRandom from './DialogListRandom';
import { Spinner } from '../ui/spinner';
import LuckyWheel from './LuckyWheel';
import CountUp from 'react-countup';

const HomePage = () => {
  const today = new Date();
  const [openDialogListRandom, setOpenDialogListRandom] = useState<boolean>(false);
  const [randomList, setRandomList] = useState<number[]>([]);
  const lastDay = getLastDayOfMonth(today);
  const {total, randomMoneyToday, savedMoneyToday,fetchMoney, savedMoney, resetIfNewDay, loading} = useMoneyStore();
  const handleFetchMoney = async() => {
    fetchMoney();
  }

  const handleSavedMoney = async() => {
    await savedMoney();
  }

  useEffect(() => {
    fetchMoney();
    resetIfNewDay()
  }, [])

  return (

    <div className='space-y-2 sm:py-0 py-2 sm:px-0 px-2'>
      <HeaderHomePage/>
      <div className='sm:w-full grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-3'>
          <div className='col-span-3 sm:col-span-2'>
              <Card className='border-none shadow-lg p-0 dark:bg-blue-500/30 bg-blue-100'>
                  <CardHeader className='p-0'>
                      <div className='text-center bg-linear-300 dark:from-blue-500 dark:to-purple-500 from-blue-300 to-purple-400 py-6 space-y-2 rounded-2xl'> 
                        <h3 className='text-xl sm:text-2xl text-white/80 font-semibold'>Tổng tiết kiệm</h3>
                        <div className='flex items-center justify-center space-x-2'>
                          <h1 className='text-3xl sm:text-5xl font-bold text-white text-shadow-lg'>
                            <CountUp end={total} duration={1} separator="." /> đ
                          </h1> 
                          <Button variant={'ghost'} onClick={handleFetchMoney} className={'p-2 cursor-pointer'} size={'icon'}>
                            <RefreshCcw className={cn('size-6 text-muted-foreground', loading && "animate-spin")}/>
                          </Button>
                        </div>
                      </div>
                      <div className='flex flex-col sm:flex-row items-center justify-center space-x-48'>
                        <Image width={300} height={300} src={'/savedPig.png'} alt='savedPig' className='hidden sm:block'/>
                       {/* <div className='text-center space-y-2 py-2 sm:py-0'>
                            <ChartNoAxesCombined className='size-12 sm:size-20 mx-auto text-gradient' />
                            <span className='font-semibold text-lg sm:text-xl tracking-wide text-muted-foreground'>
                              Bạn chưa có mục tiêu tiết kiệm nào
                            </span>
                        </div> */}
                        {randomList.length > 0 && randomMoneyToday === 0 &&
                          <LuckyWheel rewards={randomList}/>
                        }
                      </div>
                  </CardHeader>
              </Card>
          </div>
          <div className='space-y-3 mt-2 sm:mt-0'>
            <div className='hidden sm:block'>
              <Card className='border-none shadow-lg bg-cyan-300/50'>
                <CardHeader>
                    <h3 className='text-lg font-semibold flex space-x-2'><Calendar/> <span>Hôm nay:</span> </h3>
                    <h2 className='text-xl font-bold'>{formatDate(today, 'fullDate')}</h2>
                </CardHeader>
              </Card>
            </div>
            <div>
              <Card className='border-none shadow-lg dark:bg-slate-700/70 bg-amber-50'>
                <CardHeader className='text-center px-2'>
                    <h3 className='block sm:hidden text-md font-semibold text-muted-foreground'>{formatDate(today, 'fullDate')}</h3>
                    <h3 className='text-xl font-semibold'>Số tiền tiết kiệm hôm nay: </h3>
                    <h2 className='text-3xl font-extrabold text-green-700'>{randomMoneyToday > 0 ? "+" + formatMoney(randomMoneyToday) : formatMoney(randomMoneyToday)} đ</h2>
                    
                </CardHeader>
                <CardContent className='py-1 space-y-2 px-2 text-center'>
                  {randomMoneyToday === 0 ? 
                     (
                      <Button onClick={()=>setOpenDialogListRandom(true)} className='w-full bg-blue-400/70 hover:bg-blue-400 cursor-pointer transition-colors hover:animate-in h-fit p-3'>
                          <Dices className='size-12'/>
                          <div>
                            <span className='text-lg font-semibold text-primary'>Chọn Mệnh Giá</span>
                            <p className='text-sm text-muted-foreground'>Chọn số tiền lớn nhất bạn muốn</p>
                          </div>
                      </Button>
                     )
                    : 
                    (
                      <>
                        {savedMoneyToday <= 0 ? 
                          <Button onClick={handleSavedMoney} disabled={randomMoneyToday === savedMoneyToday || loading} className='w-full bg-green-400/70 hover:bg-green-400 cursor-pointer transition-colors hover:animate-in h-fit p-3'>
                            {loading ? <Spinner className='size-12'/> : <BadgeDollarSign className='size-12'/>}
                            <div>
                              <span className='text-lg text-primary font-semibold'>{randomMoneyToday === savedMoneyToday ? "Hôm nay đã tiết kiệm rồi" : "Bỏ Vào Heo Đất"} </span>
                              <p className='text-sm text-muted-foreground'>Cộng tiền hôm nay vào heo đất</p>
                            </div>
                          </Button>
                          :
                          <></>
                        }
                      </>
                      
                    )
                  }
                 
                  {savedMoneyToday > 0 &&
                    <div className='bg-amber-200 rounded-2xl p-3'>
                      <h3 className='text-xl text-muted-foreground font-semibold'>{randomMoneyToday !== savedMoneyToday || randomMoneyToday === 0  ? "Mục tiêu hôm nay:" : "Đã hoàn thành 🎉"} </h3>
                    </div>
                  }
                    
                </CardContent>
              </Card>
            </div>
          </div>
      </div>
      <CalendarComponent lastDay={Number(lastDay)} />
      <DialogListRandom open={openDialogListRandom} setOpen={setOpenDialogListRandom} setRandomList={setRandomList}/>
    </div>
  )
}

export default HomePage