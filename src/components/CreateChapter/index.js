import styled from "styled-components"
import ReactQuill from "react-quill"
import Select from "react-select"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

import axiosInstance from "../../instances/axiosInstances"

export default function CreateChapter() {
    const [title, setTitle] = useState("")
    const [startingNotes, setStartingNotes] = useState("")
    const [content, setContent] = useState("")
    const [endingNotes, setEndingNotes] = useState("")
    const { storyId } = useParams()

    const navigate = useNavigate()

    function sendChapter(e) {
        e.preventDefault()

        const token = localStorage.getItem("token")
        if (!token) {
            alert("Sua sessão expirou! Logue novamente.")
            return navigate("/sign-in")
        }

        const userBody = {
            name: title,
            content,
            startingNotes,
            endingNotes,
        }

        const userConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const promise = axiosInstance.post(
            `/chapters/${storyId}`,
            userBody,
            userConfig
        )

        promise.then((response) => {
            navigate(`/story/${storyId}/chapter/${response.data.chapterId}`)
        })

        promise.catch((e) => {
            console.log(e.response.data)
        })
    }

    return (
        <MainContaner>
            <Title>
                <h1>Adicionar Capítulo</h1>
            </Title>

            <form onSubmit={sendChapter}>
                <section>
                    <label>Título do Capítulo</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </section>

                <section>
                    <label>Notas do Autor</label>
                    <input
                        type="text"
                        value={startingNotes}
                        onChange={(e) => setStartingNotes(e.target.value)}
                    ></input>
                </section>

                <section>
                    <label style={{ marginBottom: "10px" }}>
                        Conteúdo do Capítulo
                    </label>
                    {/* ToDo - Usar Quill pro conteúdo */}
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></input>
                </section>

                <section>
                    <label>Notas Finais</label>
                    <input
                        type="text"
                        value={endingNotes}
                        onChange={(e) => setEndingNotes(e.target.value)}
                    ></input>
                </section>

                <section style={{ textAlign: "center", margin: "30px 0 15px" }}>
                    <button type="submit">Enviar Capítulo</button>
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
        display: inline-block;
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
            color: white;
        }
    }

    button {
        padding: 5px;
        background-color: #742a40;
        border-radius: 10px;
        cursor: pointer;
    }

    .quill {
        p {
            margin-top: 0px;
            font-size: 15px;
            font-weight: 300;
            margin-bottom: 0px;
        }
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
