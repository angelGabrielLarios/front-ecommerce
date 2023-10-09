import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProducts } from "../../store/products"
import { Link } from "react-router-dom"
import { url } from "../../helpers"
import { getDateTodayFormat } from "../../helpers/getDateTodayFormat"
import { getCodigoSeccionOfProductsByNameSeccion } from "../../helpers/getCodigoSeccionOfProducts"

export const Navbar = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [seccions, setSeccions] = useState([])
    useEffect(() => {
        fetch(`${url}/seccions`)
            .then(response => response.json())
            .then(seccions => {
                setSeccions([
                    ...seccions
                ])
            })
    }, [])

    const getProductsBySearh = (search = "") => {
        fetch(`${url}/products/search?search=${search}`)
            .then(response => response.json())
            .then(data => {
                dispatch(updateProducts(
                    { update_products: data }
                ))
            })
    }

    const getAllProducts = () => {
        fetch(`${url}/products`)
            .then(response => response.json())
            .then(data => {
                dispatch(updateProducts(
                    { update_products: data }
                ))
            })
    }


    const addVisitUser = async ({ nombre_seccion = "" }) => {
        const codigo_seccion = await getCodigoSeccionOfProductsByNameSeccion(nombre_seccion)

        fetch(`${url}/visitas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "usuario_nif": auth.nif,
                "codigo_seccion": codigo_seccion,
                "fecha_visitada": getDateTodayFormat()
            })
        })
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))


    }
    return (
        <>
            <nav className="bg-purple-600 border-gray-200 ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center">
                        <img src="images/logo.svg" className="h-12 mr-3 rounded-md" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Mikka Ecommerce</span>
                    </a>
                    <div className="flex items-center gap-4">




                        <div className="">


                            <button id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm p-3 text-center inline-flex items-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" type="button">
                                <img
                                    src="images/user.svg"
                                    alt=""
                                    className="w-8"

                                />
                            </button>


                            <div id="dropdownDelay" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                                <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDelayButton">

                                    <li>
                                        <p className="block px-4 py-2 hover:bg-gray-100">Nombre: {auth?.name}</p>
                                    </li>

                                    <li>
                                        <p className="block px-4 py-2 hover:bg-gray-100">Correo: {auth?.email}</p>
                                    </li>

                                    <li>
                                        <p className="block px-4 py-2 hover:bg-gray-100 text-red-600 font-bold">Sign out</p>
                                    </li>


                                </ul>
                            </div>


                        </div>
                        <Link
                            to={`/cart`}
                        >
                            <img src="images/cart.svg" alt="" className="w-8" />
                        </Link>
                    </div>
                </div>
            </nav >
            <nav className="bg-purple-950 ">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center gap-4">

                        <p className="text-white text-sm font-bold">Secciones: </p>


                        <select
                            className="block w-[300px] p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                            onChange={event => {
                                if (event.target.value === "all") {
                                    getAllProducts()
                                    return
                                }
                                getProductsBySearh(event.target.value)
                                addVisitUser({
                                    nombre_seccion: event.target.value
                                })

                            }}
                        >
                            <option value="all">Todas las secciones</option>
                            {
                                seccions.map(seccion => {
                                    return (
                                        <option
                                            key={seccion.codigo_seccion}
                                            className="p-2"
                                            value={seccion.nombre}
                                            data-codigo_seccion={seccion.codigo_seccion}
                                        >
                                            {seccion.nombre}
                                        </option>
                                    )
                                })
                            }
                        </select>


                    </div>
                </div>
            </nav>
        </>
    )
}

