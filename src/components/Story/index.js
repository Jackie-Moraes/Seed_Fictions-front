import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { AiFillWarning } from "react-icons/ai"

import DataContext from "../context/context"
import axiosInstance from "../../instances/axiosInstances"

import image from "../../assets/images/tree_logo.svg"
import ChapterCard from "./ChapterCard"

export default function Story() {
    const { data, setData } = useContext(DataContext)

    const [storyInfo, setStoryInfo] = useState("")
    const [chapters, setChapters] = useState("")
    const { storyId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const storyPromise = axiosInstance.get(`/stories/${storyId}`)
        storyPromise.then((response) => {
            setStoryInfo(response.data)
        })

        const chaptersPromise = axiosInstance.get(`/chapters/${storyId}`)
        chaptersPromise.then((response) => {
            setChapters(response.data)
        })
    }, [])

    const author = storyInfo ? storyInfo.storiesUsers[0].user.id : ""

    return (
        <MainContaner>
            <a href="/"> Seed Fictions</a> {">"} {storyInfo.name}
            <Title>
                <h1>História - {storyInfo.name}</h1>
            </Title>
            <span>
                Escrita por{" "}
                <strong>
                    {storyInfo.storiesUsers?.length > 0
                        ? storyInfo.storiesUsers[0].user.name
                        : ""}
                </strong>
            </span>
            <ImageContainer>
                <img src={storyInfo.bannerURL ? storyInfo.bannerURL : image} />
            </ImageContainer>
            <p>
                <strong>Sinopse:</strong>
            </p>
            <span>{storyInfo.description}</span>
            <br />
            <br />
            <span>
                Idioma <strong>{storyInfo.language?.name}</strong>
            </span>
            <br />
            <span>
                Visualizações <strong>{storyInfo.views}</strong>
            </span>
            <br />
            <span>
                Concluído{" "}
                <strong>{storyInfo.isFinished ? "Sim" : "Não"}</strong>
            </span>
            <br />
            <span>
                Gêneros{" "}
                <strong>
                    {storyInfo
                        ? storyInfo.storiesGenres.map((current, i) => {
                              if (i === 0) {
                                  return current.genre.name
                              } else {
                                  return `, ${current.genre.name}`
                              }
                          })
                        : ""}
                </strong>
            </span>
            <br />
            <span>
                Tags{" "}
                <strong>
                    {storyInfo
                        ? storyInfo.storiesTags.map((current, i) => {
                              if (i === 0) {
                                  return current.tag.name
                              } else {
                                  return `, ${current.tag.name}`
                              }
                          })
                        : ""}
                </strong>
            </span>
            <br />
            <ClearFix>
                <AiFillWarning
                    style={{ fontSize: "40px", marginRight: "15px" }}
                />
                <span>
                    Avisos:{" "}
                    <strong>
                        {storyInfo
                            ? storyInfo.storiesWarnings.map((current, i) => {
                                  if (i === 0) {
                                      return current.warning.name
                                  } else {
                                      return `, ${current.warning.name}`
                                  }
                              })
                            : ""}
                    </strong>
                </span>
            </ClearFix>
            <h3>Lista de Capítulos</h3>
            <ChaptersContainer>
                {author === data.id ? (
                    <button onClick={() => navigate("")}>
                        Adicionar novo capítulo
                    </button>
                ) : (
                    ""
                )}
                {chapters.length > 0
                    ? chapters.map((chapter, number) => {
                          return (
                              <>
                                  <ChapterCard
                                      chapter={chapter}
                                      number={number + 1}
                                      storyId={storyId}
                                      key={chapter.id}
                                  />
                                  <br />
                              </>
                          )
                      })
                    : ""}
            </ChaptersContainer>
        </MainContaner>
    )
}

const MainContaner = styled.main`
    max-width: 80%;
    height: auto;
    background-color: black;

    padding: 10px 2%;
    margin: 30px 10%;

    p {
        margin-top: 25px;
        font-size: 15px;
        font-weight: 300;
        margin-bottom: 20px;
    }

    a {
        text-decoration: none;
        color: #fb95ae;
        font-size: 17px;

        :hover {
            text-decoration: underline;
        }
    }

    span {
        line-height: 26px;
    }

    h3 {
        color: #fb95ae;
        margin-top: 30px;
        font-size: 22px;
        font-weight: 400;
        margin-bottom: 40px;
        text-align: center;
    }

    button {
        width: 200px;
        padding: 5px;
        background-color: #742a40;
        border-radius: 10px;
        cursor: pointer;
        margin-bottom: 30px;
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

const ImageContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    max-height: 400px;
    margin-top: 35px;

    text-align: center;

    img {
        max-width: 35%;
    }
`

const ClearFix = styled.div`
    width: 100%;

    display: flex;
    align-items: center;

    margin-top: 20px;
    padding: 8px;

    border: 3px solid #11171e;
`

const ChaptersContainer = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
