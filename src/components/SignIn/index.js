import styled from "styled-components"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import axiosInstance from "../../instances/axiosInstances"
import image from "../../assets/images/tree_logo.svg"

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function validateLogin(e) {
        e.preventDefault()

        const obj = { email, password }

        const promise = axiosInstance.post("/sign-in", obj)

        promise.catch((e) => {
            alert("Algo deu errado! Tente novamente mais tarde.")
        })

        promise.then((response) => {
            const { token } = response.data
            localStorage.setItem("token", token)
            navigate("/")
        })
    }

    return (
        <MainContainer>
            <SignInHeader>
                <img src={image} alt="Logo da loja While True Play"></img>
            </SignInHeader>

            <form onSubmit={validateLogin}>
                <input
                    required
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    required
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Logar</button>
            </form>

            <Link to="/sign-up">
                Ainda não registrado? Crie uma conta aqui.
            </Link>
        </MainContainer>
    )
}

const MainContainer = styled.main`
    width: 100vw;
    height: 100vh;
    padding: 50px 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        width: 100%;
        height: 45px;
        margin-top: 10px;
        padding: 8px;
        outline: none;
        border: 1px solid #d5d5d5;
        border-radius: 5px;
        background: #d4d4d4;
        color: black;
    }

    button {
        width: 100%;
        height: 46px;
        border: none;
        background: #742a40;
        border-radius: 5px;
        color: #ffffff;
        font-weight: 300;
        font-size: 20px;
        margin-top: 15px;
        margin-bottom: 35px;
    }

    a {
        text-decoration: none;
        color: white;
        font-size: 14px;
    }
`

const SignInHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    img {
        width: 230px;
    }
`
