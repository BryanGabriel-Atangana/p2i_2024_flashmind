import { Button } from "../ui/button";
import Link from "next/link";
type Props = {
  children: React.ReactNode;
  href: string;
  label: string;
};

const BackButton = ({ href, label }: Props) => {
  return (
    <Button>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
