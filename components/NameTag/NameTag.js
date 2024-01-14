import useGame from "@/hooks/useGame";
import { USER_ROLES } from "@/utils/constants";
import Header from "@/components/Header";

const NameTag = () => {
  const { userRole } = useGame();

  return <Header>{USER_ROLES[userRole]}</Header>;
};

export default NameTag;
