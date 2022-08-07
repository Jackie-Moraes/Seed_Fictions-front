import styled from "styled-components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { AiFillEye } from "react-icons/ai"

import axiosInstance from "../../instances/axiosInstances"

import Header from "../Header"

export default function Home() {
    const [stories, setStories] = useState([])

    useEffect(() => {
        const promise = axiosInstance.get("/stories")
        promise.then((response) => {
            setStories(response.data)
        })
    }, [])

    const navigate = useNavigate()

    return (
        <>
            <Header />
            <MainContaner>
                <Title>
                    <h1>Descobrir</h1>
                </Title>

                <p style={{ marginBottom: "50px" }}>
                    Descubra as histórias mais recentes da Seed Fictions.
                </p>

                {stories.map((story) => {
                    return (
                        <StoryCard key={story.id}>
                            <StoryTitle
                                onClick={() => navigate(`/story/${story.id}`)}
                            >
                                {story.name}
                            </StoryTitle>
                            <p>
                                Escrita por{" "}
                                <strong>
                                    {story.storiesUsers[0].user.name}
                                </strong>
                            </p>
                            <ImageContainer>
                                <img
                                    src={story.bannerURL}
                                    onClick={() =>
                                        navigate(`/story/${story.id}`)
                                    }
                                />
                            </ImageContainer>

                            <span>
                                Capítulos{" "}
                                <strong>{story.chapters?.length}</strong>
                            </span>
                            <br />

                            <span>
                                Idioma <strong>{story.language.name}</strong>
                            </span>
                            <br />

                            <span>
                                Categorias{" "}
                                <strong>
                                    {
                                        story.storiesCategories[0]?.subCategory
                                            .name
                                    }
                                    {story.storiesCategories.length > 1
                                        ? ", "
                                        : ""}
                                    {story.storiesCategories
                                        .slice(1)
                                        .map((category) => {
                                            return category.subCategory.name
                                        })}
                                </strong>
                            </span>
                            <br />

                            <span>
                                Gêneros{" "}
                                <strong>
                                    {story.storiesGenres[0]?.genre.name}
                                    {story.storiesGenres.length > 1 ? ", " : ""}
                                    {story.storiesGenres
                                        .slice(1)
                                        .map((current) => {
                                            return current.genre.name
                                        })}
                                </strong>
                            </span>
                            <br />
                            <br />

                            <div style={{ fontSize: "14px" }}>
                                {story.description}
                            </div>

                            <ClearFix>
                                <AiFillEye style={{ marginRight: "10px" }} />
                                {story.views}
                            </ClearFix>
                        </StoryCard>
                    )
                })}
            </MainContaner>
        </>
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
`

const Title = styled.div`
    background-color: #742a40;
    height: 50px;

    display: flex;
    align-items: center;
    padding: 0 15px;

    h1 {
        color: white;
        font-weight: 700;
        font-size: 22px;
    }
`

const StoryCard = styled.article`
    margin-bottom: 35px;

    p {
        margin-top: 16px;
        font-weight: 400;
    }

    span {
        line-height: 24px;
    }
`

const StoryTitle = styled.h2`
    color: #fb95ae;
    cursor: pointer;
`

const ImageContainer = styled.figure`
    float: left;

    img {
        max-width: 80px;
        max-height: 120px;
        margin-right: 10px;
        cursor: pointer;
    }
`

const ClearFix = styled.div`
    display: flex;
    width: 100%;

    margin-top: 20px;
    padding: 8px;

    border: 1px solid #11171e;
`
