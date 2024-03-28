import { checkAuth } from "@/checkAuth";
import { auth, signOut } from "../../../../../../auth";
import { BreadcrumbTitle } from "@/components/site/general/Breadcrumb";
import SignoutButton from "@/components/site/general/SignoutButton";
import Navigation from "@/components/site/general/Navigation/Navigation";
import FlowChart from "@/components/site/MapDisplay/FlowChart";
import FlashcardsDisplay from "@/components/site/MapDisplay/FlashcardsDisplay";
import CardList from "@/components/site/MapDisplay/CardList";
type Props = {};

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await checkAuth();

  return (
    <div className="grid grid-cols-8 w-full h-screen">
      {/* {JSON.stringify(session)} */}

      {/* Navigation */}
      <div className="col-span-1 bg-[#131135] grid grid-rows-[7.5%,92.5%] px-2">
        {/* logo */}
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#FCFCFC]">Flashmind</h1>
        </div>
        {/* Menu */}
        <div>
          <nav>
            <Navigation />
          </nav>
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
          <div className="">My Page : {session ? params.slug : ""}</div>
          <FlashcardsDisplay currentMapId={params.slug[0]} />
          <CardList currentMapId={params.slug[0]} />
        </div>
      </div>
    </div>
  );
}
