export const ErrorLabel = ({ errormsg }: { errormsg: string }) => {


    return (

        <div className="border border-red-400 p-3 max-w-full rounded-md text-red-600 text-center shadow-md">
            {errormsg}
        </div>

    )
}