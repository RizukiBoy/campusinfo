import { FiSearch, FiMapPin, FiMail, FiMenu, FiX} from "react-icons/fi";
import {FaGlobe } from "react-icons/fa"

const CardCampus = () => {
    return (
   <div className="bg-white rounded-xl shadow-md p-2 mb-8">
        <div className="w-full h-40 md:h-48 lg:h-56 bg-gray-300 rounded-lg mb-4" />

        <div className="flex justify-between"> 
          <div className="flex flex-col">
          <p className="text-xs font-semibold md:text-base">Universitas Muhammadiyah Magelang</p>
          <h2 className="font-semibold text-xs md:text-base text-start">Akreditasi</h2>
          </div>

          <div className="flex items-center gap-1 text-gray-700">
            <FiMapPin size={20}/>
            <p className="text-xs">Magelang, Jawa tengah</p>
          </div>
        </div>

        
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm mt-3 gap-2">
          <div className="flex items-center gap-1 text-gray-700">
            <FiMail />
            <span>unimma.ac.id</span>
          </div>

          <div className="flex items-center gap-1 text-gray-700">
            <FaGlobe />
            <span>unimma.ac.id</span>
          </div>
        </div>
      </div>
    )
}  

export default CardCampus
    
    
 