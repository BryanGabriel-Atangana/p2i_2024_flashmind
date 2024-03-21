import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}
export function CommonButton({ children, variant }: Props) {
  return <Button variant={variant}>{children}</Button>;
}
