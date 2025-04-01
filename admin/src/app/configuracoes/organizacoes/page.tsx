'use client'

import PageHeader from "@/components/PageHeader/PageHeader"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"
import { getInitials } from "@/utils/getInitials"
import { currentRestaurant } from "@/services/user"
import { useRouter } from "next/navigation"
import Button from "@/components/Buttons/Button"

const Organizacoes = () => {
  const { user, changeRestaurant } = useContext(AuthContext)
  const router = useRouter()

  const handleCurrentRestaurant = (restaurantId: string, role: string) => {
    currentRestaurant(restaurantId, role)
      .then(response => {
        changeRestaurant(response.token)
        router.push('/')
      })
  }


  return (
    <div className="px-20 py-10">
      <PageHeader
        title="Organizações"
        description="Gerencie e acompanhe todos os pedidos recebidos em seu estabelecimento. Atualize o status, visualize detalhes e mantenha-se organizado para oferecer um atendimento eficiente e de qualidade aos seus clientes."
      />

      <div className="flex gap-4 mt-8">
        {user?.restaurants.map(item => (
          <div className="w-full max-w-[280px]" key={item.restaurant_id}>
            <div className="overflow-hidden rounded-lg">
              {/* Header with Avatar */}
              <div className="relative">
                {/* Purple header background */}
                <div className={`h-24 bg-gradient-to-r ${item.restaurant_id === user.restaurant_id ? 'from-[#FF4545] to-[#EE7070]' : 'from-[#43497A] to-[#5D67BB]' }`} />

                {/* Centered avatar that overlaps the header */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-12">
                  <div className="w-24 h-24 rounded-full bg-[#E6E6E6] border-4 border-white" />
                </div>

                {/* Small dot in the top right */}
                <div className={`absolute top-4 right-4 w-4 h-4 rounded-full ${item.restaurant_id === user.restaurant_id ? 'bg-[#DD3838]' : 'bg-white border-4 border-[#292E53]'}`} />
              </div>

              {/* Content */}
              <div className="pt-16 pb-6 px-4 text-center space-y-4 bg-white">
                <h2 className="text-lg font-bold text-gray-900 mb-5">{item.restaurant.restaurant_name}</h2>

                {item.restaurant_id === user.restaurant_id ?
                  (
                    <div className="flex items-center justify-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 27 26" fill="none">
                      <path d="M10.2509 22.1216L3.52344 15.3941L6.58927 12.3283L10.2509 16.0008L20.9543 5.28662L24.0201 8.35245L10.2509 22.1216Z" fill="#FF4545"/>
                      </svg>
                      <span className="text-brandcolor font-bold">Delivery selecionado</span>
                    </div>
                  ) :
                  (
                    <Button
                      // className="w-full py-2 px-4 bg-[#4A4B9F] text-white rounded-md text-sm font-medium" 
                      background="bg-[#4A4B9F]"
                      color="text-white"
                      text="Selecionar Delivery"
                      onClick={() => handleCurrentRestaurant(item.restaurant_id, item.role)}
                      disabled={false}
                    />
                  )
                }
                
              </div>
            </div>
          </div>
          // <div 
          //   key={restaurant.restaurant_id} 
          //   className="flex flex-col py-4 gap-4 items-center justify-center bg-white rounded-lg w-52 max-w-60 cursor-pointer"
          //   onClick={() => handleCurrentRestaurant(restaurant.restaurant_id, restaurant.role)}
          // >
          //   <div className="flex items-center justify-center rounded-full bg-table-head text-white font-bold w-16 h-16">
          //     {/* {getInitials(restaurant.restaurant.restaurant_name)} */}
          //   </div>
          //   <span className="font-bold">{restaurant.restaurant.restaurant_name}</span>
          // </div>
        ))}
      </div>
    </div>
  )
}

export default Organizacoes