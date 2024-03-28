import React, { useEffect, useState } from "react";
import { EditMap } from "./MapEditMenu";
import { MapDropdownMenu } from "./MapDropdownMenu";
import Link from "next/link";
import { getCardsCount } from "@/actions/getCards";

interface Map {
  id: string;
  title: string;
  color: string;
}

interface MapCardProps {
  map: Map;
}

const MapCard: React.FC<MapCardProps> = ({ map }) => {
  const [cardCount, setCardCount] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { count, error } = await getCardsCount(map);
        if (error) {
          throw new Error();
        }
        setCardCount(count);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching card count:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [map]);

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-1 cursor-pointer">
      <Link href={`home/maps/${map.id}`}>
        <div className="h-[4rem] rounded-md bg-[#f2f2f2]">
          <div>
            <div className="flex justify-between items-center h-full px-2 pt-2">
              <div className="flex items-center gap-2">
                <div
                  style={{ backgroundColor: map.color }}
                  className="h-4 w-4 rounded-full"
                ></div>
                <span className="text-[#131135]">{map.title}</span>
              </div>
              <div>
                <MapDropdownMenu />
              </div>
            </div>
            <div className="text-[#333333] text-[0.8rem] pl-8">
              {loading
                ? "Loading..."
                : cardCount === undefined
                ? "Error"
                : `${cardCount} cartes`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MapCard;
