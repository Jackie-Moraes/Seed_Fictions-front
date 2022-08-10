import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { GiMagnifyingGlass } from "react-icons/gi"
import { BsPersonCircle } from "react-icons/bs"
import { FiLogIn, FiLogOut } from "react-icons/fi"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

import DataContext from "../context/context"
import axiosInstance from "../../instances/axiosInstances"

import image from "../../assets/images/tree_logo.svg"
import SearchBar from "./SearchBar"

export default function Header() {
    const { data, setData } = useContext(DataContext)
    const [search, setSearch] = useState(false)
    const [refresher, setRefresher] = useState(0)

    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) return ""

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        axiosInstance
            .get("/data", config)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                if (err.response.status === 500) {
                    alert("Your session expired! Please log-in again.")
                    localStorage.setItem("token", "")
                    setRefresher(refresher + 1)
                } else {
                    console.log(err)
                }
            })
    }, [refresher])

    return (
        <Container>
            <TitleContainer title="Seed Fictions, onde a semente da sua ideia gera uma árvore de histórias.">
                <Link to="/">
                    <img
                        src={image}
                        alt="Logo da Seed Fictions, uma árvore brotando de um livro."
                    />
                </Link>

                <Link to="/">
                    <span>Seed</span> Fictions
                </Link>
            </TitleContainer>

            <SearchBar search={search} />

            <div style={{ fontSize: "28px", cursor: "pointer" }}>
                <GiMagnifyingGlass
                    title="Pesquisar no site"
                    onClick={() => setSearch(!search)}
                />
                {token ? (
                    <BsPersonCircle
                        title="Seu perfil"
                        style={{ marginLeft: "20px" }}
                    />
                ) : (
                    <FiLogIn
                        title="Fazer Login"
                        style={{ marginLeft: "20px" }}
                        onClick={() => {
                            navigate("/sign-in")
                        }}
                    />
                )}
                {token ? (
                    <FiLogOut
                        title="Fazer Logout"
                        style={{ marginLeft: "20px" }}
                        onClick={() => {
                            localStorage.setItem("token", "")
                            setRefresher(refresher + 1)
                            window.location.reload()
                        }}
                    />
                ) : (
                    ""
                )}
            </div>
        </Container>
    )
}

const Container = styled.header`
    width: 100%;
    height: 70px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;

    position: fixed;
    top: 0;

    padding: 0 30px;

    span {
        font-weight: 600;
    }

    z-index: 2;
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;

    width: 0px;

    a {
        text-decoration: none;
        color: white;
        font-size: 17px;
    }

    img {
        width: 60px;
        margin-right: 10px;
    }
`
