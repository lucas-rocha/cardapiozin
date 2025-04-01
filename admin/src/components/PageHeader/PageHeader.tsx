import { FC, useContext } from "react";
import AvatarDash from "../Avatar/AvatarDash"
import { AuthContext } from "@/contexts/AuthContext";

interface PageHeaderProps { 
  title: string;
  description: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, description }) => {
  const { restaurant, user } = useContext(AuthContext)
  
  return (
    <div className="flex flex-col justify-between w-full gap-4">
      <AvatarDash userName={user?.firstName} restaurantName={restaurant?.restaurant_name} />
      <div className="max-w-5xl">
        <h2 className="font-bold">{title}</h2>
        <p className="my-2">{description}</p>
      </div>
        
    </div>
  )
}

export default PageHeader