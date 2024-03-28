import { MdDashboardCustomize } from "react-icons/md";
type Props = {};

const Navigation = (props: Props) => {
  return (
    <div>
      <div className="flex flex-row items-center bg-[#7E15FF] rounded-md px-3 py-2">
        <MdDashboardCustomize color="white" />
        <span className="pl-3 text-white">Accueil</span>
      </div>
    </div>
  );
};

export default Navigation;
