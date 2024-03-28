"use client";
import { useEffect } from "react";
import { useCardStore } from "@/store/cards";
import CardCard from "./Card";
import { getCurrentMap } from "@/data/map";

type Props = {
  currentMapId: string;
};

const CardList = ({ currentMapId }: Props) => {
  const cards = useCardStore((state) => state.cards);
  const fetchCards = useCardStore((store) => store.fetchCards);

  useEffect(() => {
    const fetchData = async () => {
      const currentMap: any = await getCurrentMap(currentMapId);
      fetchCards(currentMap);
    };
    if (currentMapId) {
      fetchData();
    }
  }, [currentMapId, fetchCards]);

  // Filter cards based on currentMapId
  const filteredCards = cards.filter((card) => card.mapId === currentMapId);

  return (
    <div className="pt-2">
      <div className="flex flex-wrap">
        {filteredCards.map((card) => (
          <CardCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
