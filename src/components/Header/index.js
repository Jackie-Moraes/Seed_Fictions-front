import { useState } from "react"
import styled from "styled-components"
import { GiMagnifyingGlass } from "react-icons/gi"

import image from "../../assets/images/tree_logo.svg"
import SearchBar from "./SearchBar"

export default function Header() {
    const [search, setSearch] = useState(false)

    return (
        <Container>
            <TitleContainer>
                <a href="/">
                    <img
                        src={image}
                        alt="Logo da Seed Fictions, uma árvore brotando de um livro."
                    />
                </a>

                <a href="/">
                    <span>Seed</span> Fictions
                </a>
            </TitleContainer>

            <SearchBar search={search} />

            <GiMagnifyingGlass
                style={{ fontSize: "28px", cursor: "pointer" }}
                onClick={() => setSearch(!search)}
            />
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

    padding: 0 30px;

    span {
        font-weight: 600;
    }
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
