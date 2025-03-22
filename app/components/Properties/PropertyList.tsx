import PropertyListItem from "./PropertyListItem";
const properties=[
  { 
    id:1,
    img:"/aliImgFinal.jpeg",
    name:"propertyimg1",
    price:"1200$",
  },
  {
    id:2,
    img:"/BeachFront_Icon.jpg",
    name:"propertyimg2",
    price:"1200$",
  },
  {
    id:3,
    img:"/aliImgFinal.jpeg",
    name:"propertyimg3",
    price:"1300$",
  },
  {
    id:4,
    img:"/aliImgFinal.jpeg",
    name:"propertyimg4",
    price:"1200$",
  }
]
  


const PropertyList=() =>{
  return(
    <>
    {properties.map((property) => (
        <PropertyListItem key={property.id} property={property} />
      ))}
    </>
  )
}
export default PropertyList;

