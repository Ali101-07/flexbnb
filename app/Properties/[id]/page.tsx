'use client';

import Image from "next/image";
import Link from "next/link";
import ReservationSideBar from "@/app/components/Properties/ReservationSideBar";
import { getUserId } from "@/app/lib/actions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PropertyDetailPage = () => {
    const params = useParams();
    const [property, setProperty] = useState<any>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/properties/${params.id}`);
                const data = await res.json();
                setProperty(data);
                const uid = await getUserId();
                setUserId(uid);
            } catch (error) {
                console.error('Error fetching property:', error);
            }
        };

        if (params?.id) {
            fetchData();
        }
    }, [params?.id]);

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src={property.image_url}
                    className="object-cover w-full h-full"
                    alt="Beach house"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{property.title}</h1>

                    <span className="mb-6 block text-lg text-gray-600">
                        {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
                    </span>

                    <hr />

                    <Link 
                        href={`/landlords/${property.landlord?.id}`}
                        className="py-6 flex items-center space-x-4"
                    >
                        {property.landlord?.avatar_url && (
                            <Image
                                src={property.landlord.avatar_url}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="The user name"
                            />
                        )}

                        <p><strong>{property.landlord?.name}</strong> is your host</p>
                    </Link>

                    <hr />

                    <p className="mt-6 text-lg">
                        {property.description}
                    </p>
                </div>

                <ReservationSideBar 
                    userId={userId}
                    property={property}
                />
            </div>
        </main>
    );
};

export default PropertyDetailPage;

