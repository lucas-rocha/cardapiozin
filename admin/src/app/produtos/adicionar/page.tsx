'use client'

import Layout from "@/app/page";
import Button from "@/components/Buttons/Button";
import DumbInput from "@/components/Input/DumbInput";
import Input from "@/components/Input/Input";
import TextArea from "@/components/Input/TextArea";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProductPreview from "@/components/ProductPreview/ProductPreview";
import { AuthContext } from "@/contexts/AuthContext";
import { createMenuItem } from "@/services/menu-item";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const addProductFormSchema = z.object({
  item_name: z.string().nonempty("O campo nome não pode ser vazio"),
  visible: z.boolean(),
  price: z.string(),
  description: z.string().nonempty("O campo nome não pode ser vazio"),
  unit_measure: z.string(),
  serving: z.string(),
  quantity: z.string(),
  ingredients: z.array(z.string()).nonempty('')
})

type addProductFormSchema = z.infer<typeof addProductFormSchema>

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => {
  return isOpen ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M7 10L12.0008 14.58L17 10" stroke="#FF4545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M10 17L14.58 11.9992L10 7" stroke="#FF4545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function AdicionarProduto() {
  const [showBasicInfo, setShowBasicInfo] = useState(true)
  const [showCategoriesInfo, setShowCategoriesInfo] = useState(true)
  const [showIngredientsInfo, setShowIngredientsInfo] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [productImage, setProductImage] = useState<File | null>(null);
  const { restaurant } = useContext(AuthContext)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const { register, handleSubmit, control, formState: { errors }, watch } = useForm<addProductFormSchema>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      visible: true
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients'
  })


  const name = watch('item_name');
  const price = watch('price');
  const description = watch('description');
  const peopleServing = watch('serving')

  const handleImageChange = (image: File | null) => {
    setProductImage(image);
  };

  function addProduct(data: any) {
    const priceWithoutSimbol = data.price.slice(2)
    const realPrice = priceWithoutSimbol.replace(/\./g, '').replace(',', '.');

    const normalizedData = {
      item_name: data.item_name,
      price: parseFloat(realPrice),
      description: data.description,
      serving: parseInt(data.serving),
      quantity: parseInt(data.quantity),
      unit_id: 2,
      unit_measure: parseInt(data.unit_measure),
      visible: data.visible,
      categoryIds: [],
      categoriesCreated: [{
        name: "Sorvete muito bom",
        image_id: 2
      }],
      additionalItemIds: [],
      removeAdditionalItemIds: [],
      additionalItemCreated: [{
        name:"Pepino",
        price: 5,
        quantity: 10,
        isAdditional: true,
        isRemoved: false
      }]
    }
    
    const formData = new FormData();
    formData.append("data", JSON.stringify(normalizedData));
    formData.append("file", productImage as File);

    createMenuItem(restaurant?.id as string, formData)
  }


  return (
    <Layout>
      
      <div className="px-20 py-10">
      <PageHeader 
        title="Adicione um Produto"
        description="Gerencie e organize todos os produtos disponíveis em seu estabelecimento. Atualize informações, visualize detalhes e mantenha seu catálogo sempre atualizado para oferecer uma experiência completa e de qualidade aos seus clientes."
      />

      <div className="flex justify-between gap-10 mt-4">
        <form onSubmit={handleSubmit(addProduct)} className="flex-1">
          <div className="flex justify-between border-b-2 border-brandcolor mb-4 py-2 select-none cursor-pointer" onClick={() => setShowBasicInfo(!showBasicInfo)}>
            <h2 className="text-brandcolor font-bold text-base">Informações Básicas</h2>
            <ArrowIcon isOpen={showBasicInfo} />
          </div>
          {showBasicInfo && (
            <div className="flex flex-col gap-4">

               <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <Controller
                    name="visible"
                    control={control}
                    render={({ field }) => (
                      <input 
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked)
                        setIsVisible(!isVisible)
                      }}
                      className="sr-only"
                      />
                    )}
                  />
                  {/* <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={() => setIsVisible(!isVisible)}
                    className="sr-only"
                  /> */}
                  <div className={`w-10 h-6 rounded-full transition-colors ${isVisible ? 'bg-brandcolor' : 'bg-[#d1d5db]'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow-md mt-1 transform transition-transform ${isVisible ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                  <span className="ml-2 font-normal">
                    {isVisible ? (
                      <div className="flex items-center gap-2">
                        <span>Disponível</span>
                      </div>
                    ) : (
                      <span>Indisponível</span>
                    )}
                  </span>
                </label>
              </div>

              <div className="flex justify-between gap-4">
                <Input
                  register={register}
                  type="text"
                  placeholder="Ex: Hamburguer, Pizza..."
                  label="Nome do Produto"
                  name="item_name"
                  className="flex-1"
                />
                <Input
                  register={register}
                  type="text"
                  placeholder="Ex: 13,90"
                  label="Preço"
                  name="price"
                  isCurrency={true}
                  className="w-[120px]"
                />
              </div>

              <div className="flex justify-between gap-4">
                <Input
                  register={register}
                  type="text"
                  placeholder="Ex: 15g"
                  label="Tamanho"
                  name="unit_measure"
                  className="w-[120px]"
                />
                <Input
                  register={register}
                  type="text"
                  placeholder="Ex: 2"
                  label="Serve quantas pessoas"
                  name="serving"
                  className="w-[120px] flex-1"
                />
                <Input
                  register={register}
                  type="text"
                  placeholder="Ex: 15g"
                  label="Estoque"
                  name="quantity"
                  className="w-[120px]"
                />
              </div>

              <div>
                <TextArea 
                  register={register}
                  placeholder="Digite aqui a descrição do seu produto"
                  name="description"
                  label="Descrição"
                  className="w-full"
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-between border-b-2 border-brandcolor mb-4 py-2 mt-4 select-none cursor-pointer" onClick={() => setShowCategoriesInfo(!showCategoriesInfo)}>
            <h2 className="text-brandcolor font-bold text-base">Categorias</h2>
            <ArrowIcon isOpen={showCategoriesInfo} />
          </div>
          {showCategoriesInfo && (
            <div className="bg-white rounded-lg p-4">
              <DumbInput 
                placeholder="Pequisar categoria"
                type="text"
                className="border border-bordercolor rounded-lg"
              />
              <button type="button" onClick={openModal} className="flex gap-2 items-center mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="9" fill="#FF4545"/>
                  <path d="M9 6L9 12M12 9L6 9" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p className="text-brandcolor font-medium">Adicionar categoria</p>
              </button>
                {isModalOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Overlay com opacidade usando RGBA
                    ></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                          &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Adicionar Categoria</h2>
                        <div className="mb-4">
                          <p>Adicione as informações da nova categoria que deseja incluir.</p>
                          <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button onClick={closeModal} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                            Fechar
                          </button>
                          <button onClick={closeModal} className="px-4 py-2 bg-brandcolor text-white rounded hover:bg-red-600">
                            Salvar
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              <div className="mt-4">
                <div className="flex gap-2 items-center border-t border-bordercolor py-2">
                  <img src="https://cardapiozin.s3.sa-east-1.amazonaws.com/images/categories/default/cup.png" />
                  <p>Milk shakes</p>
                </div>
                <div className="flex gap-2 items-center border-t border-bordercolor py-2">
                  <img src="https://cardapiozin.s3.sa-east-1.amazonaws.com/images/categories/default/cup.png" />
                  <p>Milk shakes</p>
                </div>
              </div>
            </div>
          )}


           {/* Ingredients Section */}
           <div className="flex justify-between border-b-2 border-brandcolor mb-4 py-2 mt-4 select-none cursor-pointer" onClick={() => setShowIngredientsInfo(!showIngredientsInfo)}>
              <h2 className="text-brandcolor font-bold text-base">Personalização de Ingredientes</h2>
              <ArrowIcon isOpen={showIngredientsInfo} />
            </div>

            {showIngredientsInfo && (
              <div className="bg-white rounded-lg p-4">
                <DumbInput
                  placeholder="Pesquisar ingredientes"
                  type="text"
                  className="border border-bordercolor rounded-lg"
                />
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mt-4">
                    <input
                      {...register(`ingredients.${index}` as const)}
                      placeholder="Digite o ingrediente"
                      className="border border-gray-300 rounded-lg p-2 flex-1"
                    />
                    <button type="button" onClick={() => remove(index)} className="text-red-500">Remover</button>
                  </div>
                ))}
                <button type="button" onClick={() => append("")} className="text-brandcolor font-medium mt-2">
                  + Adicionar Ingrediente
                </button>
              </div>
            )}

          <div className="max-w-36 mt-4">
            <Button type="submit" background="bg-brandcolor" color="text-white" text="Salvar"/>
          </div>
        </form>

        <ProductPreview name={name} price={price} description={description} peopleServing={peopleServing} onImageChange={handleImageChange}/>
      </div>

      </div>
    </Layout>
  )
}