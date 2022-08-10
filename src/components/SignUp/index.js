import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

import axiosInstance from "../../instances/axiosInstances"
import image from "../../assets/images/tree_logo.svg"

export default function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pictureURL, setPictureURL] = useState("")

    const navigate = useNavigate()

    function validateRegister(e) {
        e.preventDefault()

        const obj = {
            name,
            email,
            password,
            pictureURL,
        }

        const promise = axiosInstance.post("/sign-up", obj)

        promise.catch((e) => {
            alert("Algo deu errado! Tente novamente mais tarde.")
        })

        promise.then(() => {
            navigate("/sign-in", { replace: true })
        })
    }

    return (
        <MainContainer>
            <SignUpHeader>
                <img src={image}></img>
            </SignUpHeader>

            <form onSubmit={validateRegister}>
                <input
                    required
                    type="text"
                    placeholder="Nome de Usuário"
                    onChange={(e) => setName(e.target.value)}
                ></input>

                <input
                    required
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    required
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <input
                    required
                    type="url"
                    placeholder="Link da imagem de perfil"
                    onChange={(e) => setPictureURL(e.target.value)}
                ></input>
                <button type="submit">Criar Conta</button>
            </form>

            <Link to="/sign-in">Já registrado? Clique aqui para logar.</Link>
        </MainContainer>
    )
}

const MainContainer = styled.main`
    width: 100vw;
    height: 100vh;
    padding: 50px 30px;

    display: flex;
    flex-direction: column;
    justify-content: center;
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

    form {
        width: 30%;
    }
`

const SignUpHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;

    img {
        width: 230px;
    }
`
