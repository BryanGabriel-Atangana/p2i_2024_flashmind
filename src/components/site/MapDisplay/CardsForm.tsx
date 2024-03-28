import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CardEditor from "./CardEditor";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CardSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addCard } from "@/actions/addCard";
import { useCardStore } from "@/store/cards";
import { getCurrentMap } from "@/data/map";

type Props = {
  currentMapId: string;
};
export function CardsForm({ currentMapId }: Props) {
  const { answer, fetchCards } = useCardStore();

  const addCardForm = useForm<z.infer<typeof CardSchema>>({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      question: "",
      answer: answer,
      mapId: currentMapId,
    },
  });

  const onSubmitCard = (values: z.infer<typeof CardSchema>) => {
    console.log("Form submitted !!!");
    addCard(values).then(() => {
      const map: any = getCurrentMap(currentMapId);
      fetchCards(map);
      addCardForm.reset();
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ nouvelle carte</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Crée une nouvelle carte</DialogTitle>
          <DialogDescription>Remplissez le form ci-dessous</DialogDescription>
        </DialogHeader>
        <Form {...addCardForm}>
          <form onSubmit={addCardForm.handleSubmit(onSubmitCard)}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col">
                <Label htmlFor="question" className="pb-[0.5rem]">
                  Question
                </Label>
                <FormField
                  control={addCardForm.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="col-span-3"
                          placeholder="exemple : quelle est la capitale du Cameroun ?"
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center pb-[2rem]">
                <CardEditor />
              </div>
            </div>
            <DialogFooter className="w-full pt-3rem  ">
              <Button type="submit" className="w-full">
                Créer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
