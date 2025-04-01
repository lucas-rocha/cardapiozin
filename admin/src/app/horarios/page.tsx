'use client'

import PageHeader from "@/components/PageHeader/PageHeader";
import Layout from "../page";
import { useContext, useEffect, useState } from "react";
import { getHours } from "@/services/hour";
import { AuthContext } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";

type DaysOfWeekProps = {
  id: number;
  name: string;
  code: number;
};

type HoursProps = {
  id: number;
  open_time: string;
  close_time: string;
  is_closed: boolean;
  is_24_hours: boolean;
  days_of_week_id: number;
  restaurant_id: string;
  Days_of_week: DaysOfWeekProps; // Objeto único, não array
};

type HoursList = HoursProps[]; // Lista de horários


export default function Horarios() {
  const { restaurant, user } = useContext(AuthContext)
  const [activeDays, setActiveDays] = useState<string[]>([])
  const [addedHours, setAddedHours] = useState([])
  const [hours, setHours] = useState<HoursProps[]>([])
  const [newHours, setNewHours] = useState([]);
  const daysOfWeek = [ "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]

  const toggleDay = (day: string) => {
    setActiveDays((prev) => 
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  useEffect(() => {
    if(restaurant) {
      getHours(restaurant.id).then(response => {
        setHours(response.data)
      })
    }
  }, [restaurant])
  
  const addTime = () => {
    setNewHours([...newHours, { open_time: "", close_time: "", days: activeDays }] as any)
    hours.map(item => {
      setActiveDays((prev) => {
        if(!prev.includes((item.Days_of_week.name))) {
          return [...prev, item.Days_of_week.name]
        }
        return prev
      })
    })
  }

  return (
    <PrivateRoute>
      <Layout>
      <div className="px-20 py-10">
        <PageHeader
          title="Horários de Atendimento"
          description="Defina e organize os horários de funcionamento do seu estabelecimento. Configure dias e períodos de atendimento, informe horários especiais e garanta que seus clientes estejam sempre bem informados sobre quando podem contar com seus serviços."
        />


        <div className="mt-10 flex flex-col gap-4">
          <div className="bg-white py-4 px-8 border border-bordercolor rounded-lg">
            <span className="font-bold">Terça - Sábado:</span><span className="mx-4">18:00 às 00:00</span>
          </div>

          {newHours.map((hour, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="bg-white border border-bordercolor rounded-lg">
                {daysOfWeek.map(item => (
                  <button key={item} className={`py-4 px-8 font-bold ${activeDays.includes(item) ? 'bg-secondarycolor text-white' : '' }`} onClick={() => toggleDay(item)}>{item}</button>
                ))}
              </div>
                
              <div className="border border-bordercolor rounded-lg shadow-sm bg-white px-8 py-4">
                <h2 className="text-lg font-bold">Insira os horários</h2>
                <div className="flex items-center gap-4 my-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Das</span>
                    <input type="time" className="w-32 bg-gray h-12 rounded-lg px-4"/>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Às</span>
                    <input type="time" className="w-32 bg-gray h-12 rounded-lg px-4"/>
                  </div>
                    <button className="bg-brandcolor hover:bg-red-600 text-white h-12 px-4 rounded-lg">
                      <span className="mr-1">+</span> Salvar horário
                    </button>
                </div>
                <button className="text-sm text-[#373B59] hover:underline h-12 rounded-lg">
                  Adicionar mais horários a este dia
                </button>
              </div>
            </div>
          ))}
          

        </div>
        <button onClick={addTime} className="mt-4 bg-[#4A4A4A] hover:bg-[#3A3A3A] text-white h-12 px-4 rounded-lg">
          <span className="mr-1">+</span> Adicionar horários
        </button>
      </div>


    </Layout>
    </PrivateRoute>
  )
}