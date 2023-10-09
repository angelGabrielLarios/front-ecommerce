
import { useEffect } from "react"
import { CartCard } from "../components"
import { formaterCurrency, url } from "../../helpers"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateCartProducts } from "../../store"



export const CartPage = () => {

    /* const [users_products, setUsers_products] = useState([]) */

    const { cartProducts } = useSelector(state => state.cartProducts)
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const { priceTotalAll } = useSelector(state => state.cartProducts)

    useEffect(() => {
        fetch(`${url}/user_product/${auth.nif}`)
            .then(response => response.json())
            .then(data => {

                dispatch(updateCartProducts({ cart_products: data }))

            })
            .catch(error => console.error(error))
    }, [auth.nif, dispatch])


    return (
        <div className="h-screen bg-gray-10">
            <section
                className="py-4"
            >
                <Link className="flex items-center gap-2 hover:text-purple-600 active:text-purple-600" to={`/home`}>
                    Regresar <img src="/images/back-svgrepo-com.svg" alt="" className="h-4" />
                </Link>
            </section>
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">

                <div className="rounded-lg md:w-2/3 space-y-4">



                    {
                        cartProducts?.map(product => {
                            return (
                                <CartCard
                                    key={product.codigo_producto}
                                    product={{ ...product }}

                                />
                            )
                        })
                    }

                </div>

                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">

                    <h2
                        className="text-2xl font-bold text-purple-600"
                    >
                        Resumen de Compra
                    </h2>

                    <hr className="my-4" />
                    <p className="">
                        Producto(s): <span>{cartProducts.length}</span>
                    </p>
                    <div className="flex items-start">

                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="text-lg font-bold">{formaterCurrency(priceTotalAll)}</p>

                        </div>
                    </div>
                    <button className="mt-6 w-full rounded-md bg-purple-500 py-1.5 font-medium text-purple-50 hover:bg-purple-600">
                        Pagar
                    </button>
                </div>
            </div>
        </div>
    )
}
