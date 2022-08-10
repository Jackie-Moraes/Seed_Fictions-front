import styled from "styled-components"
import { useNavigate } from "react-router"
import { AiFillClockCircle } from "react-icons/ai"

export default function ChapterCard({ chapter, number, storyId }) {
    const navigate = useNavigate()
    const date = new Date(chapter.createdAt)

    return (
        <ChapterCardContainer
            onClick={() => {
                navigate(`/story/${storyId}/chapter/${chapter.id}`)
                window.scrollTo(0, 0)
            }}
        >
            <span style={{ fontSize: "20px", fontWeight: "700" }}>
                {number}
            </span>
            <ChapterInfoContainer>
                <p>{chapter.name}</p>
                <CreationDateContainer>
                    <AiFillClockCircle style={{ fontSize: "18px" }} />
                    <span> em {date.toLocaleString()}</span>
                </CreationDateContainer>
            </ChapterInfoContainer>
        </ChapterCardContainer>
    )
}

const ChapterCardContainer = styled.div`
    width: 50%;

    display: flex;
    justify-content: left;
    align-items: center;

    padding-left: 10%;
    margin-bottom: 15px;

    border-radius: 10px;
    cursor: pointer;

    :hover {
        background-color: #742a40;
    }
`

const ChapterInfoContainer = styled.section`
    margin-left: 15px;
    p {
        margin: 0 0 5px 0 !important;
        font-weight: 700 !important;
    }
`

const CreationDateContainer = styled.div`
    display: flex;
    align-items: center;

    margin-top: 5px;

    svg {
        margin-right: 5px;
    }
`
