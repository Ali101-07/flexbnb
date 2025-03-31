interface CustomButtonProps{
    label:string;
    className?:string;
    onClick:()=>void
}

const CustomButton:React.FC<CustomButtonProps>=({
    label,
    className,
    onClick
})=>{
    return(
        <div
            onClick={onClick} 
            className={`w-full text-center py-4 bg-red-500 hover:bg-red-900 text-white rounded-xl transition cursor-pointer`}>
             {label}
        </div>
    )
}
export default CustomButton;