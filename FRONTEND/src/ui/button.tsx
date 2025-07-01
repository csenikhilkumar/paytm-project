
interface props{
    text : string
    onClick :any
    
}

export function Button({text,onClick}:props){
    return(<>
       <div>
        <button onClick={onClick} className="bg-purple-700 rounded-lg w-40 p-5 mt-2 ">{text}</button>
       </div>
    </>)
}