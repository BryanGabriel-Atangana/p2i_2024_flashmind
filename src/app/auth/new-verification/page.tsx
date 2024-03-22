import NewVerificationForm from "@/components/auth/NewVerificationForm";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-50">
      <NewVerificationForm />
    </div>
  );
};

export default page;
