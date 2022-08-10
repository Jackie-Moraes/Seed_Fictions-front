import styled from "styled-components"
import { useNavigate } from "react-router"
import { AiFillEye } from "react-icons/ai"

import image from "../../assets/images/tree_logo.svg"

export default function StoryCard({ story }) {
    const navigate = useNavigate()

    const stage = story.isFinished

    return (
        <StoryCardContainer>
            <StoryTitle
                onClick={() => {
                    navigate(`/story/${story.id}`)
                    window.scrollTo(0, 0)
                }}
            >
                {story.name}
            </StoryTitle>
            <p>
                Escrita por <strong>{story.storiesUsers[0].user.name}</strong>
            </p>
            <ImageContainer>
                <img
                    src={story.bannerURL ? story.bannerURL : image}
                    onClick={() => navigate(`/story/${story.id}`)}
                />
            </ImageContainer>

            {stage ? (
                <StageContainer primary>Concluido</StageContainer>
            ) : (
                <StageContainer>Em andamento</StageContainer>
            )}
            <br />
            <br />

            <span>
                Capítulos <strong>{story.chapters?.length}</strong>
            </span>
            <br />

            <span>
                Idioma <strong>{story.language.name}</strong>
            </span>
            <br />

            <span>
                Categorias{" "}
                <strong>
                    {story.storiesCategories.map((current, i) => {
                        if (i === 0) {
                            return current.subCategory.name
                        } else {
                            return `, ${current.subCategory.name}`
                        }
                    })}
                </strong>
            </span>
            <br />

            <span>
                Gêneros{" "}
                <strong>
                    {story.storiesGenres.map((current, i) => {
                        if (i === 0) {
                            return current.genre.name
                        } else {
                            return `, ${current.genre.name}`
                        }
                    })}
                </strong>
            </span>
            <br />
            <br />

            <div style={{ fontSize: "14px" }}>{story.description}</div>

            <ClearFix>
                <AiFillEye style={{ marginRight: "10px" }} />
                {story.views}
            </ClearFix>
        </StoryCardContainer>
    )
}

const StoryCardContainer = styled.article`
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
        max-width: 120px;
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

const StageContainer = styled.label`
    background-color: ${(props) => (props.primary ? "#742a40" : "#c9812d")};
    border-radius: 10px;
    font-size: 12px;
    padding: 4px;
`
