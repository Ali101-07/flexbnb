'use client'

interface MenuLinkProps{
    label:string;
}



const MenuLink: React.FC<MenuLinkProps> =({
    label
}) =>{
    return(
        <div className="px-5 py-4 hover:bg-gray-100 transition">
            {label}
        </div>
    )
}
export default MenuLink;