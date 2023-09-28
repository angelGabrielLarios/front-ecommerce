import { Routes, Route } from 'react-router-dom'
import { Login, Register } from '../auth/pages'
import { HomeProducts } from '../products/pages'
import { PrivateRoute } from './PrivateRoute'
import { isEmptyObject } from '../helpers'
import { useSelector } from 'react-redux'
import { AppMain } from '../appmain/pages'

export const AppRouter = () => {


    const auth = useSelector(state => state.auth)

    return (
        <Routes>

            {/* <PrivateRoute>

            </PrivateRoute> */}


            <Route

                path='/'
                element={
                    <PrivateRoute
                        condition={!isEmptyObject(auth)}
                        redirect={'auth/login'}
                    >
                        <HomeProducts />
                    </PrivateRoute>
                }
            />



            <Route
                path='auth/register'
                element={<Register />}
            />

            <Route
                path='auth/login'
                element={<Login />}
            />

            <Route
                path='home'
                element={<AppMain />}
            />

        </Routes>


    )
}
