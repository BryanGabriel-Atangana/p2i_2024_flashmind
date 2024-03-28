import React from "react";
import Link from "next/link";

interface Card {
  id: string;
  question: string;
  answer: string;
}

interface MapCardProps {
  card: Card;
}

const CardCard: React.FC<MapCardProps> = ({ card }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-1 cursor-pointer">
      <div className="h-[4rem] rounded-md bg-[#f2f2f2]">
        <div className="flex items-center h-full px-2 pt-2">
          <span className="text-[#131135]">{card.question}</span>
        </div>
      </div>
    </div>
  );
};

export default CardCard;
