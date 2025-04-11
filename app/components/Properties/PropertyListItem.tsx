import Image from "next/image";
import { PropertyType } from "./PropertyList";
<<<<<<< HEAD
interface PropertyProps {
    property:PropertyType;
}
const PropertyListItem: React.FC<PropertyProps> = ({ property }) => {
    return (
        <div 
            className="cursor-pointer"
            onClick={() => router.push(`/properties/${property.id}`)}
        >
=======

interface PropertyProps {
    property: PropertyType;
    
}

const PropertyListItem: React.FC<PropertyProps> = ({ property }) => {
    return (
        <div>
>>>>>>> 75aa0e8dd4b878fa4551ca4ff2d045432ea9f5df
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={property.image_url}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                />

                {markFavorite && (
                    <FavoriteButton
                        id={property.id}
                        is_favorite={property.is_favorite}
                        markFavorite={(is_favorite) => markFavorite(is_favorite)}
                    />
                )}
            </div>
<<<<<<< HEAD

            <div className="mt-2">
                <p className="text-lg font-bold">{property.title}</p>
            </div>

=======
    
            <div className="mt-2">
                <p className="text-lg font-bold">{property.title}</p>
            </div>
    
>>>>>>> 75aa0e8dd4b878fa4551ca4ff2d045432ea9f5df
            <div className="mt-2">
                <p className="text-sm text-gray-500"><strong>${property.price_per_night}</strong> per night</p>
            </div>
        </div>
<<<<<<< HEAD
    )
=======
    );
    
>>>>>>> 75aa0e8dd4b878fa4551ca4ff2d045432ea9f5df
};

export default PropertyListItem;
