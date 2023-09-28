import { useEffect } from "react"


export const HomeProducts = () => {

    useEffect(() => {
        const url = `http://localhost:1234/products`
        fetch(url)
            .then(res => res.json())
            .then(data => console.log(data))
    }, [])

    return (
        <div>HomeProducts</div>
    )
}
