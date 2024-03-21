import { LandingPageAlert } from "@/components/landingPage/Alert";
import { AuthButton } from "@/components/landingPage/AuthButton";
import Link from "next/link";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Link href="https://github.com/BryanGabriel-Atangana/FlashM">
            {/* <AuthButton variant="outline">Github</AuthButton> */}
          </Link>
          <Link href="/auth/login">
            <AuthButton>Se Connecter</AuthButton>
          </Link>

          {/* nav */}
        </div>
      </nav>
      {/*  */}
      <div className=" animate-in flex-1 flex flex-col max-w-4xl py-6 px-3 ">
        <main>
          <div className="flex flex-col gap-1 items-center">
            <h1 className="sr-only">The best way to memorize</h1>

            <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center text-[#404040]">
              "Le moyen le plus rapide de mémoriser ? Facile : faites-le juste
              avant l'examen !"{" "}
            </p>
            <p className="text-[#787878]">avec</p>
            <Link href="/login">
              <h1 className="animate bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-[4rem] font-black  bg-300% animate-gradient">
                FLASHMIND
              </h1>
            </Link>
            <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
            <LandingPageAlert title="1 - Sujet">
              Entrer le sujet du quiz
            </LandingPageAlert>
            <LandingPageAlert title="2 - Questions">
              Entrez le nombre de question que vous souhaitez répondre dans le
              quiz
            </LandingPageAlert>
            <LandingPageAlert title="3 - QUIZ">
              Ta da ! vous avez un quiz
            </LandingPageAlert>
          </div>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          made by{" "}
          <a
            href="https://github.com/BryanGabriel-Atangana/p2i_flashmind"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Atango
          </a>
        </p>
      </footer>
    </div>
  );
}
