import Money from '@/app/models/Money';
import { MessageError } from '@/lib/helper';
import { connectDB } from '@/lib/mongo';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month'); 
  const year = searchParams.get('year');   
  const now = new Date();
  const selectedMonth = month !== null ? Number(month) - 1 : now.getMonth();
  const selectedYear = year !== null ? Number(year) : now.getFullYear();
  const startOfMonth = new Date(selectedYear, selectedMonth, 1);
  const endOfMonth = new Date(selectedYear, selectedMonth + 1, 1);
  const result = await Money.aggregate([
    {
      $facet: {
        transaction: [
          {
            $match: {
              date: { $gte: startOfMonth, $lt: endOfMonth },
            },
          },
          { $sort: { date: -1 } },
        ],
        total: [
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' },
            },
          },
        ],
      },
    },
  ]);
  console.log(result)
  return NextResponse.json({
    transaction: result[0].transaction,
    total: result[0].total[0]?.total ?? 0,
    message: 'Get saved money success',
  });
}

export async function POST(req: Request) {
  try {
      await connectDB();
      const {amount} = await req.json();
      const newMoney = await Money.create({
        amount, 
        date: new Date()
      })
      return NextResponse.json({
        message: 'Created successfully',
        money: newMoney,
      });
  } catch (error) {
    console.log("Error with save money: ", error);
    return NextResponse.json({message: MessageError})
  }
}