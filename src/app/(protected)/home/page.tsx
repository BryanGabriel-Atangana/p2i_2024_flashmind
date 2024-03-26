import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { auth, signOut } from "../../../../auth";
import FlowChart from "@/components/site/flow/FlowChart";
import SignoutButton from "@/components/site/general/SignoutButton";
import { BreadcrumbTitle } from "@/components/site/general/Breadcrumb";
import { AddMap } from "@/components/site/general/AddMapManager/AddMapCard";
import { db } from "@/lib/db";
import MapCard from "@/components/site/general/AddMapManager/MapCard";
import MapList from "@/components/site/general/AddMapManager/MapList";

type Props = {};

const PageDelay = async (ms: number) => {
  await new Promise((resolve) => setTimeout(() => resolve(true), ms));
};

const page = async (props: Props) => {
  const session = await auth();
  await PageDelay(2000);
  return (
    <div className="grid grid-cols-8 w-full h-screen">
      {/* {JSON.stringify(session)} */}

      {/* Navigation */}
      <div className="col-span-1 bg-[#131135] grid grid-rows-[7.5%,92.5%] px-4">
        {/* logo */}
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#FCFCFC]">Flashmind</h1>
        </div>
        {/* Menu */}
        <div>
          <nav></nav>
        </div>
        <div>{/* <FlowChart /> */}</div>
      </div>

      {/* Contenu */}
      <div className="col-span-7 bg-[#FCFCFC] grid grid-rows-[7.5%,92.5%] px-4">
        <div className="flex flex-row justify-end">
          {/* -- Déconexion -- */}
          <div className="flex flex-row items-center justify-center gap-3">
            <p>
              Hello 👋, <strong>{session?.user.name?.split(" ")[0]}</strong>
            </p>
            <form
              className="flex flex-col items-center justify-center"
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <SignoutButton type="submit" />
              {/* <button type="submit">signOut</button> */}
            </form>
          </div>
        </div>
        {/* Doccuments */}
        <div className="">
          <h1 className=" text-[1.5rem]">
            <BreadcrumbTitle />
          </h1>
          <div className="">
            <MapList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
