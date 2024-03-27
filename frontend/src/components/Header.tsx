import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Header = () => {

    return (
        <div>
            <div className="flex  justify-between px-2 py-2 border-b">
                <Link to={"/blogs"}>
                    <div className="flex flex-col justify-center font-black text-xl">
                        MEDIUM
                    </div>
                </Link>
                <div>
                    <Avatar name="SDQ" size="big"></Avatar>
                </div>
            </div>
        </div>
    )
}