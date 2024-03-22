"use client";
import { useCallback, useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { useSearchParams } from "next/navigation";

type Props = {};

const NewVerificationForm = (props: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="animate bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-[4rem] font-black  bg-300% animate-gradient">
        FLASHMIND
      </h1>
      <Loader />
      <p className="text-[#787878] py-3">Ça arrive ...</p>
      <FormSuccess message={success} />
      <FormError message={error} />
    </div>
  );
};

export default NewVerificationForm;
