import { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { formaterCurrency, url } from "../../helpers"
import { useDispatch, useSelector } from "react-redux"
import { SpinnerSmall } from "../../components"
import { changePriceTotalAll, updateCartProducts } from "../../store"


export const CartCard = ({ product }) => {



    const [isLoading, setIsLoading] = useState(false)

    const [amountProduct, setAmountProduct] = useState(product.cantidad)
    const [amount, setAmount] = useState(amountProduct)
    const [priceTotal, setPriceTotal] = useState(parseFloat(product.precio) * amountProduct)

    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        setPriceTotal(parseFloat(product.precio) * amountProduct)
    }, [amountProduct, product.precio])

    useEffect(() => {
        const updateProdyctByAmount = (amount) => {


            if (amount < 1) {
                return;
            }

            setIsLoading(true)
            fetch(`${url}/user_product`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_product: {
                            user_nif: auth.nif,
                            codigo_producto: product.codigo_producto,
                            cantidad: amount
                        }

                    })
                }

            )
                .then(response => response.json())
                .then(data => {
                    setAmountProduct(data?.user_product_update?.cantidad)
                })
                .catch(err => console.error(err))
                .finally(() => setIsLoading(false))
        }

        updateProdyctByAmount(amount)
    }, [amount, auth.nif, product.codigo_producto])


    useEffect(() => {
        fetch(`${url}/user_product/${auth.nif}`)
            .then(response => response.json())
            .then(data => {
                let priceTotalAllMemory = 0;

                data.forEach(product => {
                    priceTotalAllMemory += product.cantidad * parseFloat(product.precio)
                })

                dispatch(changePriceTotalAll({ priceTotalAllUpdate: priceTotalAllMemory }))
            })
            .catch(error => console.error(error))
    }, [priceTotal, auth.nif, dispatch, isLoading])

    useEffect(() => {
        fetch(`${url}/user_product/${auth.nif}`)
            .then(response => response.json())
            .then(data => {

                dispatch(updateCartProducts({ cart_products: data }))

            })
            .catch(error => console.error(error))
    }, [isLoading, dispatch, auth.nif])


    return (
        <article className="bg-white grid grid-cols-7 p-4 rounded-lg ">

            <div className="col-span-4 flex items-start gap-2">
                <img src={product.url_image} alt="product-image" className="block w-24 rounded-lg " />

                <div className="">
                    <h2 className="text-base font-bold text-gray-900">{product.nombre.split(' ').slice(0, 5).join(' ')}</h2>
                    <p className="text-gray-600 text-sm">Precio Unitario:  <span className="text-black font-bold">{formaterCurrency(parseFloat(product.precio))}</span></p>

                </div>
            </div>

            <div className="col-span-3 space-y-3">

                <div className="space-y-2">
                    <p className="font-bold text-basem text-purple-600">Cantidad:</p>

                    <div className="flex items-center border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10">
                                <button
                                    disabled={isLoading}
                                    className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-purple-500 hover:text-blue-50 disabled:bg-gray-400"
                                    onClick={() => {
                                        setAmount(amount - 1)

                                    }}
                                > - </button>
                                <input
                                    disabled={isLoading}
                                    className=" w-12 border bg-white text-center text-xs outline-none disabled:bg-gray-400 block"
                                    type="number"
                                    value={amountProduct}
                                    min="1"
                                    onChange={event => {

                                        setAmount(event.target.value)

                                    }}
                                />
                                <button
                                    disabled={isLoading}
                                    className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-purple-500 hover:text-blue-50 disabled:bg-gray-400"
                                    onClick={() => {

                                        setAmount(amount + 1)




                                    }}
                                > + </button>
                            </div>


                            {isLoading ? <SpinnerSmall /> : null}

                        </div>
                    </div>
                </div>


                <div className="flex items-center gap-4">
                    <p className="font-bold text-base text-purple-600">Precio Total:</p>
                    <p className="text-base">{formaterCurrency(priceTotal)}</p>
                </div>

                <button
                    disabled={isLoading}
                    className="text-red-600 font-bold disabled:text-gray-500"
                    onClick={() => {

                        setIsLoading(true)
                        fetch(`${url}/user_product?user_nif=${auth.nif}&codigo_producto=${product.codigo_producto}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                            })
                            .catch(error => console.error(error))
                            .finally(() => setIsLoading(false))




                    }}
                >
                    Eliminar
                </button>

            </div>


        </article>

    )
}

CartCard.propTypes = {

    name: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
    url_image: PropTypes.string,
    codigo_producto: PropTypes.number,
    product: PropTypes.object

}