import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { auth, signOut } from "../../../../auth";
type Props = {};

const PageDelay = async (ms: number) => {
  await new Promise((resolve) => setTimeout(() => resolve(true), ms));
};

const page = async (props: Props) => {
  const session = await auth();
  await PageDelay(5000);
  return (
    <div>
      {JSON.stringify(session)}
      <div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">signOut</button>
        </form>
      </div>
    </div>
  );
};

export default page;
