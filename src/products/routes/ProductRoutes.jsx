import { Route, Routes } from "react-router-dom"

import { HomeProducts } from "../pages"



export const ProductRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<HomeProducts />}
            />

        </Routes>
    )
}
