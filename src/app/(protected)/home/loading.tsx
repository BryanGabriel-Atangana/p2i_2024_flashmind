import NewVerificationForm from "@/components/auth/NewVerificationForm";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <NewVerificationForm />
    </div>
  );
};

export default loading;
