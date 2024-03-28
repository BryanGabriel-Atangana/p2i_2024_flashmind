"use client";
import { FlashcardArray } from "react-quizlet-flashcard";
import { CardsForm } from "./CardsForm";
import { useCardStore } from "@/store/cards";
import { useEffect, useState } from "react";
import { getCurrentMap } from "@/data/map";

type Props = {
  currentMapId: string;
};

// Function to parse HTML content of answer
function parseAnswer(answer: string) {
  // Regular expression to match image URLs
  const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/gi;

  // Replace image URLs with <img> tags
  const parsedAnswer = answer.replace(
    imageUrlRegex,
    '<img src="$1" alt="Image">'
  );

  return parsedAnswer;
}

export default function FlashcardsDisplay({ currentMapId }: Props) {
  const cardList = useCardStore((state) => state.cards);
  const fetchCards = useCardStore((store) => store.fetchCards);
  const [currentMap, setCurrentMap] = useState<any>(null);
  const [filteredCards, setFilteredCards] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const map = await getCurrentMap(currentMapId);
        setCurrentMap(map);
      } catch (error) {
        console.error("Error fetching current map:", error);
      }
    };

    if (currentMapId) {
      fetchData();
    }
  }, [currentMapId]);

  useEffect(() => {
    if (currentMap) {
      fetchCards(currentMap);
    }
  }, [currentMap, fetchCards]);

  useEffect(() => {
    if (cardList.length > 0 && currentMap) {
      const filtered = cardList.filter((card) => card.mapId === currentMapId);
      setFilteredCards(filtered);
    }
  }, [cardList, currentMap, currentMapId]);

  const cards = filteredCards.map((card) => ({
    id: parseInt(card.id),
    frontHTML: (
      <div className="w-full h-full flex flex-col justify-center items-center text-[1.3rem] text-white">
        {card.question}
      </div>
    ),
    backHTML: (
      <div
        className="w-full h-full flex flex-col justify-center items-center text-[1.3rem] text-white"
        dangerouslySetInnerHTML={{ __html: parseAnswer(card.answer) }}
      ></div>
    ),
  }));

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <FlashcardArray
        cards={cards}
        frontCardStyle={{ backgroundColor: "#6525b2" }}
        backCardStyle={{ backgroundColor: "#6525b2" }}
      />
      <div>
        <CardsForm currentMapId={currentMapId} />
      </div>
    </div>
  );
}
