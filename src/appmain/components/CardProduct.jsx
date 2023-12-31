
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { formaterCurrency, url } from '../../helpers'
import { useState } from 'react'
import { SpinnerSmall } from '../../components'


export const CardProduct = ({ name = "", price = 0, url_image = "", nombre_seccion = "", product = {} }) => {

    const [isLoading, setIsLoading] = useState(false)
    const auth = useSelector(state => state.auth)

    const onClickAddCart = () => {

        setIsLoading(true)
        fetch(`${url}/user_product`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_product: {
                        user_nif: auth.nif,
                        codigo_producto: product.codigo_producto,

                    }

                })
            }

        )
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false))

    }
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg shadow-purple-400 ">

            <img
                className="block h-[220px] rounded-t-lg w-full object-contain object-center"
                src={url_image}
                alt={`This is a image of ${name}`}
            />

            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">{name}</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                    <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg className="w-4 h-4 $599text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded   ml-3">5.0</span>
                </div>

                <div className='flex items-center gap-2'>
                    <p className='font-bold text-purple-600 '>Seccion: </p><span className='text-red-600'>{nombre_seccion}</span>
                </div>
                <div className="space-y-4">
                    <span className="text-base font-bold text-gray-900 ">{formaterCurrency(price)}</span>
                    <button
                        disabled={isLoading}
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 flex items-center gap-4 disabled:bg-gray-400"
                        onClick={onClickAddCart}
                    >Agregar al carrito {isLoading ? <SpinnerSmall /> : null}</button>
                </div>
            </div>
        </div>
    )
}

CardProduct.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    url_image: PropTypes.string,
    product: PropTypes.object,
    nombre_seccion: PropTypes.string
}