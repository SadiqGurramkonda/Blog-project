import { Avatar } from "./BlogCard"

export const Header = ()=>{

    return(
        <div>
            <div className="flex  justify-between px-2 py-2 border-b">
                <div className="flex flex-col justify-center">
                    Medium
                </div>
                <div>
                    <Avatar name="SDQ" size="big"></Avatar>
                </div>
            </div> 
        </div>
        )
    }