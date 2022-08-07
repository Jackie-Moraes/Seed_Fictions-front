import { useEffect, useState } from "react"
import { useParams } from "react-router"
import styled from "styled-components"

import axiosInstance from "../../instances/axiosInstances"

export default function Chapter() {
    const [chapterInfo, setChapterInfo] = useState("")
    const { chapterId } = useParams()

    useEffect(() => {
        const chaptersPromise = axiosInstance.get(`/chapter/${chapterId}`)
        chaptersPromise.then((response) => {
            setChapterInfo(response.data)
        })
    }, [])

    console.log(chapterInfo)

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
