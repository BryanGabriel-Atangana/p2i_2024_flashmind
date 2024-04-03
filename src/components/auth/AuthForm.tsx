import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Social } from "./Social";

type Props = {
  children: {
    login: React.ReactNode;
    signup: React.ReactNode;
  };
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial: boolean;
  activeTab: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
};

const AuthForm = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  activeTab,
  onTabChange,
}: Props) => {
  return (
    <div className="mx-auto max-w-sm pt-[7rem]">
      <Tabs defaultValue={activeTab} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="login"
            onClick={() => onTabChange("login")}
            className={activeTab === "login" ? "active" : ""}
          >
            Se Connecter
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            onClick={() => onTabChange("signup")}
            className={activeTab === "signup" ? "active" : ""}
          >
            Créer un compte
          </TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "login" ? "Se Connecter" : "Créer un compte"}
              </CardTitle>
              <CardDescription>
                {activeTab === "login"
                  ? "Bienvenue"
                  : "Créer votre compte Flashmind"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {activeTab === "login" ? children.login : children.signup}
            </CardContent>
            <CardFooter>{showSocial && <Social />}</CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
