
import { CardProduct, Navbar } from "../components/"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProducts } from "../../store/products"


export const AppMain = () => {


    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)

    useEffect(() => {
        fetch(`http://localhost:1234/products`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                dispatch(updateProducts(data))
            })
    }, [dispatch])



    return (
        <section>
            <Navbar />
            <div className="grid grid-cols-3 lg:w-10/12 mx-auto gap-4">
                {
                    products.map(product => {
                        return (
                            <CardProduct
                                key={product.codigo_producto}
                                name={product.nombre}
                                price={parseFloat(product.precio)}
                                url_image={product.url_image}
                            />
                        )
                    })
                }
            </div>


        </section >
    )

}

