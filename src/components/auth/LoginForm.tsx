"use client";
import { useState, useEffect } from "react";
import * as z from "zod";
import AuthForm from "./AuthForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { LoginSchema } from "@/schema";
import { SignupSchema } from "@/schema";
import { Button } from "../ui/button";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { login } from "@/actions/login";
import { signup } from "@/actions/signup";
import { useSearchParams } from "next/navigation";
import { CommonButton } from "../landingPage/CommonButton";
import Link from "next/link";

type Props = {};

const LoginForm = (props: Props) => {
  const searchParams = useSearchParams();
  searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email déjà utiliser"
    : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmitLogin = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    login(values)
      .then((data) => {
        if (data?.error) {
          loginForm.reset();
          setError(data.error);
        }
        // if (data?.success) {
        //   loginForm.reset();
        //   setSuccess(data.success);
        // }
      })
      .catch(() => setError("Something went wrong"));
  };

  const onSubmitSignup = (values: z.infer<typeof SignupSchema>) => {
    setError("");
    setSuccess("");

    signup(values).then((data) => {
      setError(data.error);
      setSuccess(data.success);
    });
  };

  useEffect(() => {
    if (searchParams.get("tab") === "signup") {
      setActiveTab("signup");
    }
  }, [searchParams]);

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Link href="/">
        <div className="pt-3 pl-3 ">
          <CommonButton variant="outline">
            <span className="flex flex-row gap-3 items-center">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              Retour
            </span>
          </CommonButton>
          <span className="pl-3">
            <strong>FLASHMIND</strong>
          </span>
        </div>
      </Link>
      <AuthForm
        showSocial={true}
        headerLabel="Connexion"
        backButtonHref="/auth/register"
        backButtonLabel="Vous n'avez pas de compte ?"
        activeTab={activeTab}
        onTabChange={handleTabChange}
      >
        {{
          // Form de connexion
          login: (
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onSubmitLogin)}
                className="flex flex-col gap-3"
              >
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="flash@example.com"
                          type="email"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="•••••••"
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button>Terminé</Button>
              </form>
            </Form>
          ),

          // Form d'inscription
          signup: (
            <Form {...signupForm}>
              <form
                onSubmit={signupForm.handleSubmit(onSubmitSignup)}
                className="flex flex-col gap-3"
              >
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Flash Example"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="flash@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="•••••••"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button>Terminé</Button>
              </form>
            </Form>
          ),
        }}
      </AuthForm>
    </div>
  );
};

export default LoginForm;
