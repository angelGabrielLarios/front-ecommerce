
import { Navigate } from "react-router-dom"
import PropTypes from 'prop-types'

export const PrivateRoute = ({ children, condition, redirect }) => {

    if (condition) {
        return children
    }
    else {
        return <Navigate to={redirect} />
    }

}


PrivateRoute.propTypes = {
    children: PropTypes.any,
    condition: PropTypes.bool,
    redirect: PropTypes.string
}



