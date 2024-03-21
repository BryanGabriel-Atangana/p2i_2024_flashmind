import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { auth, signOut } from "../../../../auth";
type Props = {};

const page = async (props: Props) => {
  const session = await auth();

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
