import styled from "styled-components"
import { useEffect, useState } from "react"
import Select from "react-select"
import { useNavigate } from "react-router"

import axiosInstance from "../../instances/axiosInstances"

export default function CreateStory() {
    const customStyles = {
        control: (provided) => ({
            ...provided,
            marginTop: "10px",
        }),
    }

    const [languages, setLanguages] = useState([])
    const [categories, setCategories] = useState([])
    const [genres, setGenres] = useState([])
    const [warnings, setWarnings] = useState([])

    const [titleValue, setTitleValue] = useState("")
    const [bannerValue, setBannerValue] = useState("")
    const [descriptionValue, setDescriptionValue] = useState("")
    const [chosenCategories, setChosenCategories] = useState("")
    const [chosenLanguage, setChosenLanguage] = useState("")
    const [chosenWarnings, setChosenWarnings] = useState("")
    const [chosenGenres, setChosenGenres] = useState("")
    const [tags, setTags] = useState("")

    useEffect(() => {
        const promise = axiosInstance.get("/qualifications")

        promise.then((response) => {
            setCategories(response.data.categories)
            setGenres(response.data.genres)
            setLanguages(response.data.languages)
            setWarnings(response.data.warnings)
        })
    }, [])

    const categoryOptions = categories.map((category) => {
        return {
            label: category.name,
            options: category.subcategories.map((subCategory) => {
                return { value: subCategory.name, label: subCategory.name }
            }),
        }
    })

    const languageOptions = [
        {
            label: "Idiomas",
            options: languages.map((language) => {
                return { value: language.name, label: language.name }
            }),
        },
    ]

    const warningOptions = [
        {
            label: "Avisos",
            options: warnings.map((warning) => {
                return { value: warning.name, label: warning.name }
            }),
        },
    ]

    const genreOptions = [
        {
            label: "Gêneros",
            options: genres.map((genre) => {
                return { value: genre.name, label: genre.name }
            }),
        },
    ]

    function sendStory(e) {
        e.preventDefault()
    }

    return (
        <MainContaner>
            <Title>
                <h1>Adicionar História</h1>
            </Title>

            <form onSubmit={sendStory}>
                <section>
                    <label>Título da História</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setTitleValue(e.target.value)}
                    ></input>
                </section>

                <section>
                    <label>Imagem de Capa da História</label>
                    <input
                        type="url"
                        onChange={(e) => setBannerValue(e.target.value)}
                    ></input>
                </section>

                <section>
                    <label>Sinopse da História</label>
                    <textarea
                        type="text"
                        required
                        onChange={(e) => setDescriptionValue(e.target.value)}
                    ></textarea>
                </section>

                <section>
                    <label>
                        Categoria{"(s)"} principal{"(ais)"} da História:
                    </label>
                    <Select
                        isMulti
                        options={categoryOptions}
                        styles={customStyles}
                        onChange={setChosenCategories}
                    />
                </section>

                <section>
                    <label>Idioma da História: </label>
                    <Select
                        options={languageOptions}
                        styles={customStyles}
                        onChange={setChosenLanguage}
                    />
                </section>

                <section>
                    <label>Avisos da História:</label>
                    <Select
                        isMulti
                        options={warningOptions}
                        styles={customStyles}
                        onChange={setChosenWarnings}
                    />
                </section>

                <section>
                    <label> Gêneros da História:</label>
                    <Select
                        isMulti
                        options={genreOptions}
                        styles={customStyles}
                        onChange={setChosenGenres}
                    />
                </section>

                <section>
                    <label>Tags da História (opcional)</label>
                    <p style={{ fontSize: "14px", margin: "5px" }}>
                        Esse campo é opcional, mas se for preenchido, deve ser
                        de maneira correta: coloque as palavras-chaves entre
                        virgulas e sem qualquer pontuação.
                    </p>
                    <input
                        type="text"
                        onChange={(e) => setTags(e.target.value)}
                    ></input>
                </section>

                <section style={{ textAlign: "center", margin: "30px 0 15px" }}>
                    <button type="submit">Enviar História</button>
                </section>
            </form>
        </MainContaner>
    )
}

const MainContaner = styled.main`
    max-width: 80%;
    height: auto;
    background-color: black;

    padding: 10px 2%;
    margin: 100px 10%;

    p {
        margin-top: 25px;
        font-size: 15px;
        font-weight: 300;
        margin-bottom: 20px;
    }

    label {
        margin: 0 5px;
    }

    input,
    textarea {
        width: 100%;
        padding: 6px 12px;

        border: 1px solid #333;
        color: white;
        background-color: black;
        margin-top: 10px;
    }

    section {
        margin-top: 40px;

        div {
            color: black;
        }
    }

    button {
        padding: 5px;
        background-color: #742a40;
        border-radius: 10px;
        cursor: pointer;
    }
`

const Title = styled.div`
    background-color: #742a40;
    height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;

    h1 {
        color: white;
        font-weight: 700;
        font-size: 22px;
    }
`
