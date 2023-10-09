

export const Cosa = () => {
    return (
        <>
            <button id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="text-white bg-transparent hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg p-2 text-center inline-flex items-center " type="button">
                <img
                    src="images/user.svg"
                    alt=""
                    className="w-8"

                />

            </button>


            <div id="dropdownDelay" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDelayButton">
                    <li>
                        {/* <a href="#" className="block px-4 py-2 hover:bg-gray-100dark:hover:text-white">Dashboard</a> */}
                    </li>
                    <li>
                        {/* <a href="#" className="block px-4 py-2 hover:bg-gray-100dark:hover:text-white">Settings</a> */}
                    </li>
                    <li>
                        {/* <a href="#" className="block px-4 py-2 hover:bg-gray-100dark:hover:text-white">Earnings</a> */}
                    </li>
                    <li
                        className="flex items-center gap-4"
                    >
                        Cerrar Sesión
                        <img src="/images/out_2.svg" alt="" className="w-5" />
                    </li>
                </ul>
            </div>
        </>
    )
}
