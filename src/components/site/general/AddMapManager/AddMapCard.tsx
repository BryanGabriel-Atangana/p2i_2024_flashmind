"use client";
import * as React from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { MapSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMap } from "@/actions/addMap";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ColorGrid from "./ColorGrid";
import { useMapStore } from "@/store/maps";

export function AddMap() {
  const { selectedColor, setSelectedColor, fetchMaps } = useMapStore();

  const handleSelectedColor = (color: string) => {
    setSelectedColor(color);
    addMapForm.setValue("color", color);
  };

  const addMapForm = useForm<z.infer<typeof MapSchema>>({
    resolver: zodResolver(MapSchema),
    defaultValues: {
      title: "",
      color: selectedColor,
    },
  });

  const onSubmitMap = (values: z.infer<typeof MapSchema>) => {
    addMap(values).then(() => {
      fetchMaps();
      addMapForm.reset();
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild className="w-full">
        <Button
          variant="outline"
          className="w-full h-[4rem] flex flex-col justify-center items-center"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-[#3E3C5B] text-[0.8rem]">nouvelle map</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Nouvelle map</DrawerTitle>
            <DrawerDescription>
              Tips 💡 : Les maps sont très importantes pour une organisation
              éfficace des cartes
            </DrawerDescription>
            <Form {...addMapForm}>
              <form
                onSubmit={addMapForm.handleSubmit(onSubmitMap)}
                className="w-full"
              >
                <FormField
                  control={addMapForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="example : Math"
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <ColorGrid handleSelectedColor={handleSelectedColor} />

                <DrawerClose asChild>
                  <Button type="submit" className="w-full">
                    Créer
                  </Button>
                </DrawerClose>
              </form>
            </Form>
            <DrawerClose asChild>
              <Button variant="outline">Annuler</Button>
            </DrawerClose>
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
