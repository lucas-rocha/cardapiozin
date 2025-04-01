import { FC, useState } from "react"
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

interface ProductPreviewProps {
  name: string;
  price: string;
  description: string;
  peopleServing: number;
  onImageChange?: (image: File | null) => void; 
}

const ProductPreview: FC<ProductPreviewProps> = ({ name, price, description, peopleServing, onImageChange}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as any);
      };
      reader.readAsDataURL(file);
    }

    if (onImageChange) {
      onImageChange(file);
    }
  }

  return (
    <div className="max-w-[400px] min-w-[350px]">
      <div className="flex flex-col gap-4 justify-center items-center min-h-36 bg-[#efefef] cursor-pointer select-none w-full h-36">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        className="hidden" 
        id="fileUpload" 
      />
      
      <label htmlFor="fileUpload" className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
        {selectedImage ? (
          <img 
            src={selectedImage} 
            alt="Preview" 
            className="w-full h-full object-cover rounded-md" 
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="73" height="73" viewBox="0 0 73 73" fill="none">
              <rect width="73" height="73" rx="36.5" fill="white" />
              <path d="M25.7493 54.4168H47.2493C48.1997 54.4168 49.1111 54.0393 49.7831 53.3673C50.4552 52.6953 50.8327 51.7839 50.8327 50.8335V29.3335L40.0827 18.5835H25.7493C24.799 18.5835 23.8876 18.961 23.2155 19.633C22.5435 20.305 22.166 21.2165 22.166 22.1668V50.8335C22.166 51.7839 22.5435 52.6953 23.2155 53.3673C23.8876 54.0393 24.799 54.4168 25.7493 54.4168ZM38.291 22.1668L47.2493 31.1252H38.291V22.1668ZM30.2285 34.7085C30.5816 34.7086 30.9311 34.7783 31.2573 34.9135C31.5834 35.0487 31.8797 35.2468 32.1292 35.4965C32.3788 35.7463 32.5767 36.0427 32.7117 36.3689C32.8467 36.6951 32.9161 37.0447 32.916 37.3978C32.9159 37.7508 32.8462 38.1004 32.711 38.4265C32.5758 38.7526 32.3777 39.049 32.128 39.2985C31.8782 39.5481 31.5818 39.746 31.2556 39.881C30.9294 40.016 30.5798 40.0854 30.2267 40.0853C29.5137 40.0851 28.83 39.8016 28.326 39.2972C27.822 38.7929 27.539 38.109 27.5392 37.396C27.5395 36.683 27.8229 35.9993 28.3273 35.4953C28.8316 34.9913 29.5155 34.7083 30.2285 34.7085ZM31.1243 43.6668L33.9856 46.1089L38.291 38.2918L45.4577 49.0418H27.541L31.1243 43.6668Z" fill="#FF4545" />
            </svg>
            <span className="font-bold text-sm">Clique e faça o upload da imagem do produto</span>
          </div>
        )}
      </label>
    </div>

    <div className="bg-white p-4 rounded-t-lg mt-[-4px]">
      <p className="text-brandcolor font-bold">Pizza</p>
      <div className="flex justify-between font-medium text-lg my-1">
        <p>{name}</p>
        <p>{price}</p>
      </div>
      <p>{description}</p>
      {peopleServing && (
        <p className="my-4"><b>Serve {peopleServing} pessoas (900g)</b></p>
      )}

      <div className="flex flex-col gap-4">
        <div>
          <div className="bg-gray font-medium pl-2 py-1">Remover ingredientes</div>
          <CustomCheckbox
            label="Sem tomate"
          />
          <CustomCheckbox
            label="Sem manjericão"
          />
        </div>

        <div>
          <div className="bg-gray font-medium pl-2 py-1">Adicionar ingredientes</div>
          <CustomCheckbox
            label="Tomate"
            price={2.50}
          />
          <CustomCheckbox
            label="Manjericão"
            price={2.50}
          />
        </div>
      </div>

      <div className="mt-4">
        <p><b>Alguma observação?</b></p>
        <textarea placeholder="Ex: Retirar picles, mostarda e etc." className="w-full rounded-lg border border-bordercolor mt-3 p-2"></textarea>
      </div>
    </div>
  </div>
  )
}

export default ProductPreview