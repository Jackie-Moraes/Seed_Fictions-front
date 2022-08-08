import styled from "styled-components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { BsPlusCircle } from "react-icons/bs"

import axiosInstance from "../../instances/axiosInstances"

import StoryCard from "../StoryCard"

export default function Home() {
    const [stories, setStories] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const promise = axiosInstance.get("/stories")
        promise.then((response) => {
            setStories(response.data)
        })
    }, [])

    // TO-DO: Pages

    return (
        <>
            <MainContaner>
                <Title>
                    <h1>Descobrir</h1>

                    <BsPlusCircle
                        title="Enviar uma história"
                        onClick={() => navigate("/create-story")}
                    />
                </Title>

                <p style={{ marginBottom: "50px" }}>
                    Descubra as histórias mais recentes da Seed Fictions.
                </p>

                {stories.length > 0
                    ? stories.map((story) => {
                          return <StoryCard key={story.id} story={story} />
                      })
                    : ""}
            </MainContaner>
        </>
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

    svg {
        font-size: 32px;
        cursor: pointer;
    }
`
