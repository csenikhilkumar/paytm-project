interface props {
    text: string
    lable: string
    ref : string
    
}
export default function Input({ text, lable,ref }: props) {
    return (<>
        <div className="m-3">
            <label>{lable}</label>
            <div className="flex justify-center">
                <div>

                </div>
                <input className="rounded-lg pt-2 pb-2 pl-2 bg-purple-700 outline-none  cursor-pointer " type="text" ref={ref} placeholder={text} />


            </div>
        </div>
    </>)
}