import Image from "next/image";
interface Property {
    id: number;
    img: string;
    name: string;
    price: string;
}

interface PropertyListItemProps {
    property: Property;
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({ property }) => {
    return (
        <div className="cursor-pointer">
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <img
                    src={property.img}
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt={property.name}
                />
            </div>
            <div className="mt-2">
                <p className="text-lg font-bold">{property.name}</p>
            </div>
            <div className="mt-2">
                <p className="text-sm"><strong>{property.price}</strong></p>
            </div>
        </div>
    );
};

export default PropertyListItem;
