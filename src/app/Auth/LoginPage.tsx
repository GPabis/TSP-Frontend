import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../store/appStore";
import {useNavigate} from "@tanstack/router";

const LoginPage = observer(() => {
    const {auth} = useContext(AppContext)
    const navigate = useNavigate();

    useEffect(() => {
        const whoami = async () => {
            await auth.whoAmI();
            if(auth.isAuth) await navigate({to: '/tsp'});
        }
        whoami();

        }, [])

    return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-md shadow-md">
            <h1 className="mb-4 text-3xl font-semibold text-center text-gray-700">Sign in</h1>
            <form onSubmit={auth.login} className="w-full">
                <div className="flex flex-col mb-4">
                    <label className="mb-2 font-semibold text-gray-600">Email</label>
                    <input  onChange={auth.setEmailFormInput} name={"email"} type="email" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                    <label className="mb-2 font-semibold text-gray-600">Password</label>
                    <input onChange={auth.setPasswordFormInput} name={"password"} type="password" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                    <button type={'submit'}  className={"mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Sign in</button>
                </div>
            </form>
        </div>
    </div>
});

export default LoginPage;