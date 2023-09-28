
import { useEffect, useState } from "react"


export const AppMain = () => {

    const [seccions, setSeccions] = useState([])
    useEffect(() => {
        fetch(`http://localhost:1234/seccions`)
            .then(response => response.json())
            .then(seccions => {
                setSeccions([
                    ...seccions
                ])
            })
    }, [])
    return (
        <section>

            <nav className="bg-purple-600 border-gray-200 ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center">
                        <img src="images/logo.svg" className="h-12 mr-3 rounded-md" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Mikka Ecommerce</span>
                    </a>
                    <div className="flex items-center gap-4">

                        <img src="images/cart.svg" alt="" className="w-8" />

                        <img src="images/user.svg" alt="" className="w-8" />
                    </div>
                </div>
            </nav>
            <nav className="bg-purple-950 ">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">



                            {
                                seccions.map(seccion => {
                                    return (
                                        <li
                                            key={seccion.codigo_seccion}
                                        >
                                            <a href="#" className="text-white  hover:underline" aria-current="page">{seccion.nombre}</a>

                                        </li>
                                    )
                                })
                            }

                            {/* <li>
                                <a href="#" className="text-white  hover:underline">Company</a>
                            </li>
                            <li>
                                <a href="#" className="text-white  hover:underline">Team</a>
                            </li>
                            <li>
                                <a href="#" className="text-white  hover:underline">Features</a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>

        </section >
    )

}


/* 
ALTER TABLE Seccion MODIFY codigo_seccion INT AUTO_INCREMENT PRIMARY KEY;

*/
