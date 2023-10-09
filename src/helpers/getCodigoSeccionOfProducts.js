
import { url } from "./URL"


export const getCodigoSeccionOfProductsByNameSeccion = async (nombre_seccion) => {


    try {
        const response = await fetch(`${url}/products`)
        const data = await response.json()
        const { codigo_seccion } = data.find(product => product.nombre_seccion === nombre_seccion)
        return codigo_seccion


    } catch (error) {
        throw new Error(error)
    }

}
