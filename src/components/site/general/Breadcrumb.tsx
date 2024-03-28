"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCurrentMap } from "@/data/map";

type Map = {
  id: string;
  title: string;
  color: string;
  userId: string;
};

type MapError = {
  error: string;
};

type CurrentMap = Map | MapError | null;

type Props = {
  currentMapId: string;
};

export function BreadcrumbTitle({ currentMapId }: Props) {
  const [currentMap, setCurrentMap] = useState<CurrentMap>(null);

  useEffect(() => {
    const fetchCurrentMap = async () => {
      try {
        const map = await getCurrentMap(currentMapId);
        setCurrentMap(map);
      } catch (error) {
        return error;
      }
    };

    if (currentMapId) {
      fetchCurrentMap();
    }
  }, [currentMapId]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/home" className="text-[1.2rem]">
            Mes Maps
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {currentMap && !("error" in currentMap) && (
          <BreadcrumbItem>
            <BreadcrumbPage>
              {currentMap && !("error" in currentMap)
                ? currentMap.title
                : "Loading..."}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
