
import { CardProduct, Navbar } from "../components/"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProducts } from "../../store/products"
import { url } from "../../helpers"


export const AppMain = () => {


    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)
    const { cartProducts } = useSelector(state => state.cartProducts)
    console.log(cartProducts)


    useEffect(() => {
        fetch(`${url}/products`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                dispatch(updateProducts({ update_products: data }))
            })
    }, [dispatch])



    return (
        <section>
            <Navbar />
            <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 lg:w-10/12 mx-auto gap-4 mt-60">
                {
                    products.map(product => {

                        return (
                            <CardProduct
                                key={product.codigo_producto}
                                name={product.nombre}
                                price={parseFloat(product.precio)}
                                url_image={product.url_image}
                                product={product}
                                nombre_seccion={product.nombre_seccion}
                            />
                        )
                    })
                }
            </div>


        </section >
    )

}

