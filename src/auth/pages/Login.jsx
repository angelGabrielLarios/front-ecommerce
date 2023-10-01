import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../store"
import { SpinnerSmall } from "../../components"


export const Login = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const [isShowPassword, setIsShowPassword] = useState(false)

    const [errorLogin, setErrorLogin] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const allFieldsRequired = Object.values(errors).some(obj => obj?.type === "required")


    const onSubmitLogin = data => {


        setIsLoading(true)
        fetch('http://localhost:1234/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                email: data.email,
                password: data.password

            })
        })
            .then(response => response.json())
            .then(user => {
                if (user?.message) {
                    setErrorLogin(user.message)
                }
                else {
                    dispatch(login(user))
                    setErrorLogin("")
                    navigate('/home')
                }


            })
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false))

    }

    return (
        <section className="flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-10/12 lg:w-5/12 p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-purple-600 lg:max-w-xl">
                {/* <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
                    Sign in
                </h1> */}
                <form
                    className="mt-6 space-y-4"
                    onSubmit={handleSubmit(onSubmitLogin)}
                >
                    <div className="">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            id="email"
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Contraseña
                        </label>
                        <input
                            {...register("password",
                                {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: "La contraseña minimo debe contener 8 caracteres"
                                    }
                                })
                            }
                            id="password"
                            type={isShowPassword ? 'text' : 'password'}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-700">Mostrar Contraseña</span>

                        <label className="relative inline-flex items-center  cursor-pointer">
                            <input
                                type="checkbox"
                                onChange={event => setIsShowPassword(event.target.checked)}
                                defaultValue=""
                                className="sr-only peer"
                                defaultChecked=""
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-purple-600" />

                        </label>

                        {

                            errors?.password?.type === "minLength"
                                ? <div className="py-4 text-sm text-red-600 rounded-lg text-start" role="alert">
                                    {errors?.password?.message}
                                </div>
                                : null

                        }

                    </div>

                    <div className="mt-6">
                        <button
                            className="flex items-center justify-center gap-4 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 disabled:bg-gray-400"
                            disabled={isLoading}
                        >
                            Iniciar Sesión {isLoading && <SpinnerSmall />}
                        </button>
                    </div>
                </form>

                {
                    allFieldsRequired && <div className="p-4 text-sm text-red-600 rounded-lg text-center" role="alert">
                        Todos los campos son obligatorios
                    </div>
                }

                {
                    errorLogin && <div className="p-4 text-sm text-red-600 rounded-lg text-center" role="alert">
                        {errorLogin}
                    </div>
                }


                <p className="mt-2 text-xs font-light text-center text-gray-700">
                    No tienes una cuenta?
                    <Link
                        to={`/auth/register`}
                        className="font-medium text-purple-600 hover:underline ms-2"
                    >
                        Sign up
                    </Link>
                </p>

                {/* 
                
                    D0006D
                 */}
            </div>
        </section>
    )
}
