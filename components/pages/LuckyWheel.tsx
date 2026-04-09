"use client";

import { useMoneyStore } from "@/app/stores/useMoneyStore";
import { formatMoney } from "@/lib/helper";
import { useState } from "react";



const colors = [
  "#f87171",
  "#fb923c",
  "#facc15",
  "#4ade80",
  "#60a5fa",
  "#a78bfa",
];

export default function LuckyWheel({rewards}: {rewards: number[]}) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const segmentAngle = 360 / rewards.length;

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    // 👉 giả lập backend
    const winnerIndex = Math.floor(Math.random() * rewards.length);
    const extraSpins = 5;
    const targetRotation =
      360 * extraSpins +
      (360 - winnerIndex * segmentAngle - segmentAngle / 2);
    setRotation((prev) => prev + targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      useMoneyStore.setState({randomMoneyToday: rewards[winnerIndex]})
    }, 8000);
  };

  // 🎨 tạo màu các lát
  const gradient = rewards
    .map((_, i) => {
      const start = i * segmentAngle;
      const end = start + segmentAngle;
      return `${colors[i % colors.length]} ${start}deg ${end}deg`;
    })
    .join(",");

  return (
    <div className="py-4 sm:py-0 relative flex flex-col items-center justify-center gap-6 animate-in fade-in-50 duration-200">
      {/* Pointer */}
      <div className="absolute top-2 z-10 w-0 h-0 border-l-[14px] border-r-[14px] border-b-[22px] border-l-transparent border-r-transparent border-b-red-500 transform rotate-180" />

      {/* Wheel */}
      <div className="relative w-72 h-72">
        <div
          className="w-full h-full rounded-full border-4 border-gray-300 shadow-lg transition-transform duration-[8000ms] ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            background: `conic-gradient(${gradient})`,
          }}
        >
          {/* Text radial */}
          {rewards.map((reward, i) => {
            const angle = segmentAngle * i + segmentAngle / 2;

            return (
              <div
                key={i}
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <span
                  className="text-xs font-bold text-white drop-shadow"
                  style={{
                    transform: `
                      translateY(-100px)
                      rotate(90deg)
                    `,
                  }}
                >
                  {formatMoney(reward)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button */}
      <button
        onClick={spin}
        className="px-5 bg-blue-500 absolute text-white shadow disabled:opacity-50 py-7 rounded-full"
      >
        Quay
      </button>
    </div>
  );
}