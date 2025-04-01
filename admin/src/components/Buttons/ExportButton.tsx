import Image from "next/image"

const ExportButton: React.FC = () => {
  return (
    <div className="flex items-center justify-between justify-self-end bg-brandcolor h-9 rounded-lg px-5 cursor-pointer">
      <p className="font-medium text-sm text-white">Exportar</p>
      <Image src="/export-icon.png" alt="Procurar pedido" width={18} height={18} />
    </div>
  )
}

export default ExportButton