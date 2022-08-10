import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import ReactQuill from "react-quill"
import parse from "html-react-parser"
import styled from "styled-components"
import "react-quill/dist/quill.snow.css"

import axiosInstance from "../../instances/axiosInstances"

export default function Chapter() {
    const [commentValue, setCommentValue] = useState("")
    const [chapterInfo, setChapterInfo] = useState("")
    const [refresher, setRefresher] = useState(0)
    const { chapterId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const chaptersPromise = axiosInstance.get(`/chapter/${chapterId}`)
        chaptersPromise.then((response) => {
            setChapterInfo(response.data)
        })
    }, [refresher])

    function sendComment(e) {
        e.preventDefault()

        const token = localStorage.getItem("token")
        if (!token) {
            const confirmation = window.confirm(
                `Você precisa estar logado para fazer isso. Deseja se logar?
                
Obs: O comentário digitado até o momento será perdido, salve antes de aceitar.`
            )

            if (confirmation) {
                return navigate("/sign-in")
            } else {
                return ""
            }
        }

        const bodyData = {
            comment: commentValue,
        }

        const userData = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const promise = axiosInstance.post(
            `/comments/${chapterId}`,
            bodyData,
            userData
        )

        promise.catch((err) => {
            alert("Houve um erro ao publicar seu comentário.")
        })

        promise.then(() => {
            setCommentValue("")
            setRefresher(refresher + 1)
        })
    }

    return (
        <MainContaner>
            <a href="/"> Seed Fictions</a> {">"} {chapterInfo.name}
            <Title>
                <h1>Capítulo - {chapterInfo.name}</h1>
            </Title>
            <h4>Notas do Autor</h4>
            <span>{chapterInfo.startingNotes}</span>
            <h4>Início do Capítulo</h4>
            {chapterInfo ? parse(chapterInfo.content) : ""}
            <h4>Notas Finais</h4>
            <span>{chapterInfo.endingNotes}</span>
            <NewCommentContainer>
                <h4>Deixe seu comentário e apoie o autor.</h4>
                <form onSubmit={sendComment}>
                    {/* ToDo - Usar Quill pro comentário */}

                    <ReactQuill
                        theme="snow"
                        value={commentValue}
                        onChange={setCommentValue}
                    />

                    <button className="align" type="submit">
                        Enviar comentário
                    </button>
                </form>
            </NewCommentContainer>
            <CommentsContainer>
                <h4>
                    {chapterInfo ? chapterInfo.comments.length : "0"}{" "}
                    Comentários
                </h4>

                {chapterInfo
                    ? chapterInfo.comments.map((comment) => {
                          const date = new Date(comment.createdAt)
                          return (
                              <CommentCard>
                                  <h2>{comment.user.name}</h2>
                                  <CommentBox>
                                      <div>
                                          <span>Postado</span>{" "}
                                          <strong>
                                              {date.toLocaleString()}
                                          </strong>
                                      </div>

                                      <section>
                                          <ProfilePictureContainer>
                                              <img
                                                  src={comment.user.pictureURL}
                                              />
                                          </ProfilePictureContainer>

                                          {parse(comment.content)}
                                      </section>
                                  </CommentBox>
                              </CommentCard>
                          )
                      })
                    : ""}
            </CommentsContainer>
        </MainContaner>
    )
}

const MainContaner = styled.main`
    max-width: 80%;
    height: auto;
    background-color: black;

    padding: 10px 2%;
    margin: 30px 10%;

    a {
        text-decoration: none;
        color: #fb95ae;
        font-size: 17px;

        :hover {
            text-decoration: underline;
        }
    }

    h4 {
        color: #fb95ae;
        margin-top: 30px;
        font-size: 22px;
        font-weight: 400;
        margin-bottom: 25px;
    }

    span,
    p {
        font-size: 15px;
        font-weight: 300;
    }
`

const Title = styled.div`
    background-color: #742a40;
    height: 50px;

    display: flex;
    align-items: center;
    padding: 0 15px;
    margin: 30px 0px;

    h1 {
        color: white;
        font-weight: 700;
        font-size: 20px;
    }
`

const NewCommentContainer = styled.div`
    margin-top: 60px;

    text-align: center;

    button {
        width: 130px;
        height: 35px;
        margin-top: 20px;
        padding: 3px;

        background-color: transparent;

        border: 1px solid #333;
        border-radius: 10px;
        cursor: pointer;
    }

    form {
        border: 1px solid #333;
        border-radius: 10px;
        border-color: #11171e;

        padding: 10px;
    }

    .quill {
        text-align: left;

        button {
            margin-top: 0px;
        }
    }

    input,
    textarea {
        width: 100%;
        padding: 6px 12px;

        border: 1px solid #333;
        color: white;
        background-color: black;
        margin-top: 10px;
        border-radius: 10px;
    }
`

const CommentsContainer = styled.div`
    margin-top: 50px;
`

const CommentCard = styled.div`
    margin-bottom: 35px;

    h2 {
        color: #fb95ae;
        font-weight: 500;
        margin-bottom: 10px;
    }
`

const CommentBox = styled.div`
    border: 1px solid #11171e;
    padding: 10px;

    span {
        color: #a2a2a2;
    }

    strong {
        font-size: 14px;
        font-weight: 600;
    }

    section {
        width: auto;
        display: flex;
        margin-top: 15px;

        p {
            margin-left: 10px;
        }
    }
`

const ProfilePictureContainer = styled.div`
    margin-left: 10px;
    float: left;

    img {
        max-width: 120px;
        max-height: 120px;
    }
`
