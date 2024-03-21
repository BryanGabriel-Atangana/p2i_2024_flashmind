// AuthForm.tsx
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
};

const AuthForm = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: Props) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
  };

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login" onClick={() => handleTabChange("login")}>
          Se Connecter
        </TabsTrigger>
        <TabsTrigger value="signup" onClick={() => handleTabChange("signup")}>
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
  );
};

export default AuthForm;
