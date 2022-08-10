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
    const [refresher, setRefresher] = useState(0)
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
    }, [refresher])

    function updateStory() {
        const token = localStorage.getItem("token")

        const userConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const userBody = { value: !storyInfo.isFinished }

        const promise = axiosInstance.put(
            `/stories/${storyId}`,
            userBody,
            userConfig
        )

        promise.then(() => {
            setRefresher(refresher + 1)
        })

        promise.catch(() => {
            alert("Sua sessão expirou! Logue novamente.")
            return navigate("/sign-in")
        })
    }

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
            {author === data.id ? (
                <>
                    <StoryFinishedContainer>
                        <span>História Concluída</span>
                        <label class="switch">
                            <input
                                type="checkbox"
                                defaultChecked={storyInfo.isFinished}
                                onChange={() => updateStory()}
                            />
                            <span class="slider round"></span>
                        </label>
                    </StoryFinishedContainer>
                </>
            ) : (
                ""
            )}
            <h3>Lista de Capítulos</h3>
            <ChaptersContainer>
                {author === data.id ? (
                    <button
                        onClick={() => navigate(`/create-chapter/${storyId}`)}
                    >
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

const StoryFinishedContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 35px;

    .switch {
        margin-left: 20px;
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: #2196f3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
`
