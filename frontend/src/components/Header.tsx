import { Button } from "./Auth"
import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Header = () => {

    return (
        <div>
            <div className="flex justify-between px-2 py-2 border-b">
                
                    <div className="flex flex-col justify-center font-black text-xl">
                    <Link to={"/blogs"}>
                        MEDIUM
                    </Link>
                    </div>
                <div className="flex">
                    <div className="">
                        <Link to={"/publish"}>
                         <Button onClick={()=>{}} label="Create" />
                        </Link>
                    </div>
                    <div className="px-10">
                        <Link to={"/signin"}>
                         <Button onClick={()=>{
                            localStorage.removeItem("token");
                         }} label="Logout" />
                        </Link>
                    </div>
                    <div className=" flex flex-col justify-center">
                        <Avatar name="SDQ" size="big"></Avatar>
                    </div>
                </div>
            </div>
        </div>
    )
}