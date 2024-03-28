"use server";
import React from "react";
import { signOut } from "../../auth";

const SignoutForm: React.FC = () => {
  return (
    <button
      type="button"
      onClick={async () => {
        await signOut();
      }}
    >
      Sign Out
    </button>
  );
};

export default SignoutForm;
