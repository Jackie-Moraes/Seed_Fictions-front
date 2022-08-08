import { useEffect, useState } from "react"
import { useParams } from "react-router"
import ReactQuill from "react-quill"
import styled from "styled-components"
import "react-quill/dist/quill.snow.css"

import axiosInstance from "../../instances/axiosInstances"

export default function Chapter() {
    const [commentValue, setCommentValue] = useState("")
    const [chapterInfo, setChapterInfo] = useState("")
    const { chapterId } = useParams()

    useEffect(() => {
        const chaptersPromise = axiosInstance.get(`/chapter/${chapterId}`)
        chaptersPromise.then((response) => {
            setChapterInfo(response.data)
        })
    }, [])

    function sendComment(e) {
        e.preventDefault()

        const token = localStorage.getItem("token")

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
    }

    return (
        <MainContaner>
            <a href="/"> Seed Fictions</a> {">"} {chapterInfo.name}
            <Title>
                <h1>Capítulo - {chapterInfo.name}</h1>
            </Title>
            <h3>Notas do Autor</h3>
            <span>{chapterInfo.startingNotes}</span>
            <h3>Início do Capítulo</h3>
            <span>{chapterInfo.content}</span>
            <h3>Notas Finais</h3>
            <span>{chapterInfo.endingNotes}</span>
            <NewCommentContainer>
                <h3>Deixe seu comentário e apoie o autor.</h3>
                <form onSubmit={sendComment}>
                    {/* ToDo - Usar Quill pro comentário */}
                    <textarea
                        type="text"
                        value={commentValue}
                        placeholder="Seu comentário aqui."
                        onChange={(e) => setCommentValue(e.target.value)}
                    ></textarea>

                    <button className="align" type="submit">
                        Enviar comentário
                    </button>
                </form>
            </NewCommentContainer>
            <CommentsContainer>
                <h3>
                    {chapterInfo ? chapterInfo.comments.length : "0"}{" "}
                    Comentários
                </h3>

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

                                          <span>{comment.content}</span>
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

    h3 {
        color: #fb95ae;
        margin-top: 30px;
        font-size: 22px;
        font-weight: 400;
        margin-bottom: 25px;
    }

    span {
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

        span {
            margin-left: 10px;
        }
    }
`

const ProfilePictureContainer = styled.div`
    margin-left: 10px;
    float: left;

    img {
        max-width: 120px;
    }
`
