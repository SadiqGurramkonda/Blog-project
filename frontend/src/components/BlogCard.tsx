interface BlogCardProps {
    authorName : string,
    publishedDate: string,
    title: string,
    content: string
}


export const BlogCard = ({authorName,publishedDate,title,content}:BlogCardProps)=>{

    return(
        <div className="p-1">
                <div className="flex">
                    <div className="flex justify-center flex-col mr-1 pb-2">
                            <Avatar name={authorName}/>
                    </div>
                    <div className="mr-1 font-light text-sm">
                        {authorName}
                        <span className="inline text-gray-400">  &#183;</span>
                    </div>
                    <div className="mr-1 text-gray-400 font-light text-sm">
                        {publishedDate}
                    </div>
                </div>
                <div className="font-bold text-xl">
                    {title}
                </div>
                <div className="font-light text-sm py-1">
                    {content.slice(0,100)+ "..."}
                </div>
                <div className="text-gray-400 font-light text-xs pb-2">
                    {Math.ceil(content.length/100)} min read
                </div>
                <div>
                    <hr/>
                </div>
        </div>
    )
}


export const Avatar = ({name, size="small"}:{name:string, size?:"small" | "big"} )=>{

    return(
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "big"?"w-10 h-10":"w-4 h-4"}`}>
            <span className={`font-light text-gray-600 dark:text-gray-300 ${size === "big"?"text-lg":"text-xs"}`}>{name[0].toUpperCase()}</span>
        </div>
    )
}