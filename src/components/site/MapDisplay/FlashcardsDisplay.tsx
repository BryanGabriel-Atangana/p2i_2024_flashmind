"use client";
import { FlashcardArray } from "react-quizlet-flashcard";
import { CardsForm } from "./CardsForm";

type Props = {
  currentMapId: string;
};

export default function FlashcardsDisplay({ currentMapId }: Props) {
  const cards = [
    {
      id: 1,
      frontHTML: (
        <div className="w-full h-full flex flex-col justify-center items-center text-[1.3rem] text-white ">
          What is the capital of <u>Alaska</u>?
        </div>
      ),
      backHTML: (
        <div className="w-full h-full flex flex-col justify-center items-center text-[1.3rem] text-white ">
          Jumeau
        </div>
      ),
    },
    {
      id: 2,
      frontHTML: <>What is the capital of California?</>,
      backHTML: <>Sacramento</>,
    },
    {
      id: 3,
      frontHTML: <>What is the capital of New York?</>,
      backHTML: <>Albany</>,
    },
    {
      id: 4,
      frontHTML: <>What is the capital of Florida?</>,
      backHTML: <>Tallahassee</>,
    },
    {
      id: 5,
      frontHTML: <>What is the capital of Texas?</>,
      backHTML: <>Austin</>,
    },
    {
      id: 6,
      frontHTML: <>What is the capital of New Mexico?</>,
      backHTML: <>Santa Fe</>,
    },
    {
      id: 7,
      frontHTML: <>What is the capital of Arizona?</>,
      backHTML: <>Phoenix</>,
    },
  ];
  return (
    <div className="w-full flex flex-col justify-center items-center  ">
      <FlashcardArray
        cards={cards}
        frontCardStyle={{
          backgroundColor: "#6525b2",
        }}
        backCardStyle={{ backgroundColor: "#6525b2" }}
      />
      <div>
        <CardsForm currentMapId={currentMapId} />
      </div>
    </div>
  );
}
