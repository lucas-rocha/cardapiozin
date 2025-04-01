import { AuthContext } from "@/contexts/AuthContext";
import { getNotifications } from "@/services/notification";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image"
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface AvatarDashProps {
  userName: string | undefined;
  restaurantName: string | undefined;
}

type NotificationRequest = {
  id: string;
  actorName: string;
  title: string;
  is_read: boolean;
  updatedAt: string;
}

const AvatarDash = ({ userName, restaurantName}: AvatarDashProps) => {
  const { user, logout } = useContext(AuthContext)
  const [notifications, setNotifications] = useState<NotificationRequest[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenNotification, setIsOpenNotification] = useState(false)

  useEffect(() => {
    getNotifications()
      .then(response => {
        setNotifications(response)
      })
  }, [])

  const notificationToRead = notifications.filter(notification => notification.is_read === false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setIsOpenNotification(false)
  };

  const toggleMenuNotification = () => {
    setIsOpenNotification(!isOpenNotification)
    setIsOpen(false)
  };


  return (
    <div className="flex items-start gap-2 self-end">
      <div className="flex flex-col items-end bg-white px-4 rounded-lg">
        <p className="text-sm font-medium">{userName}</p>
        <p className="text-sm font-bold">{restaurantName}</p>
      </div>

      <div className="flex relative items-center justify-center w-10 h-10 rounded-full bg-brandcolor cursor-pointer" onClick={toggleMenuNotification}>
        <Image src="/bell-icon.png" alt="Notificações" width={21} height={21} />
        {notificationToRead.length > 0 && (
          <span className="flex items-center justify-center absolute top-[-5px] right-[-5px] w-5 h-5 bg-blue rounded-full text-white font-medium text-sm">
            +{notificationToRead.length}
          </span>
        )}

        <div 
          className={`absolute right-0 top-10 w-96 mt-2 bg-white rounded-md shadow-sm 
            ${isOpenNotification ? 'block' : 'hidden'}`} 
        >
          <ul className="py-1 text-sm">
            <div className="flex items-center gap-4 border-b-1 border-gray py-2 px-4">
              <Image src="/notification-icon.png" alt="Notificações" width={34} height={17}/>
              <p className="font-bold">Notificações</p>
              {notificationToRead && (
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray font-medium">{notificationToRead.length}</span>
              )}
            </div>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <Link href={`/notificacoes/${notification.id}`} className={`flex relative p-4 gap-2 ${notification.is_read ? '' : 'bg-blue-notification'}`} key={notification.id}>
                  {!notification.is_read && (
                    <div className="absolute w-2 h-2 bg-blue rounded-full top-[50%] right-4"></div>
                  )}
                  <div>
                    <div className="w-8 h-8 bg-brandcolor rounded-full"></div>
                  </div>
                  <div>
                    <div className="flex gap-2 relative">
                      <span><b>{notification.actorName}</b> <span>{notification.title}</span></span>
                      
                    </div>
                    <span>{formatDate(notification.updatedAt)}</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="font-bold p-4 text-center">Você possui nenhuma notificação</p>
            )}
            
            <div className="border-t-1 border-gray text-center py-2 px-4">
              <Link href="#" className="font-bold">Ver todas notificações</Link>
            </div>
        
          </ul>
        </div>
      </div>

      <div className="relative cursor-pointer" onClick={toggleMenu}>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brandcolor">
          <Image src={user?.photo_url || "/default-avatar.png"} alt="Notificações" width={40} height={40} className="rounded-full max-h-10"/>
        </div>

        <div 
          className={`absolute right-0 w-48 mt-2 bg-white rounded-md shadow-sm 
            ${isOpen ? 'block' : 'hidden'}`} 
        >
          <ul className="p-2 space-y-2">
            <li>
              <Link 
                href="/configuracoes/perfil" 
                className="block px-4 py-2 text-gray-700 hover:bg-secondarycolor hover:text-white"
              >
                Perfil da Conta
              </Link>
            </li>
            <li>
              <Link 
                href="/configuracoes/conta" 
                className="block px-4 py-2 text-gray-700 hover:bg-secondarycolor hover:text-white"
              >
                Conta
              </Link>
            </li>
            <li>
              <Link 
                href="/configuracoes/assinatura" 
                className="block px-4 py-2 text-gray-700 hover:bg-secondarycolor hover:text-white"
              >
                Assinatura
              </Link>
            </li>
            <li>
              <Link 
                href="/configuracoes/usuarios" 
                className="block px-4 py-2 text-gray-700 hover:bg-secondarycolor hover:text-white"
              >
                Usuários
              </Link>
            </li>
            <li onClick={() => logout()}>
              <div className="block px-4 py-2 text-gray-700 hover:bg-secondarycolor hover:text-white">
                Sair da Conta
              </div>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default AvatarDash