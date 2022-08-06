import { useState, useEffect } from "react"
import styled from "styled-components"
import { DebounceInput } from "react-debounce-input"
import axiosInstance from "../../instances/axiosInstances"
import { useNavigate } from "react-router"
import { FaSearch } from "react-icons/fa"

export default function SearchBar(state) {
    const [value, setValue] = useState("")
    const [selectedValue, setSelectedValue] = useState("")
    const [boxShadow, setBoxShadow] = useState()

    const navigate = useNavigate()

    function sendSearch(e) {
        e.preventDefault()
        const promise = axiosInstance.get(`${selectedValue}/${value}`)
        promise.then((response) => {
            console.log(response.data)
        })
    }

    return (
        <Search
            className="searchBar"
            style={{
                display: state.search ? "flex" : "none",
            }}
        >
            <DebounceInput
                type="text"
                placeholder="Pesquisar aqui"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => setBoxShadow("")}
                onFocus={() => setBoxShadow("0 0 8px rgba(102, 175, 233, 0.6)")}
                style={{
                    color: "white",
                    borderRadius: "10px",
                    height: "20px",
                    padding: "15px",
                    backgroundColor: "black",
                    border: "1px solid #333",
                    boxShadow: boxShadow,
                }}
            />
            <form onSubmit={sendSearch}>
                <select onChange={(e) => setSelectedValue(e.target.value)}>
                    <option value="/search/stories">Histórias</option>
                    <option value="/users">Usuários</option>
                </select>

                <SearchButton type="submit">
                    <FaSearch />
                </SearchButton>
            </form>
        </Search>
    )
}

const Search = styled.div`
    select {
        color: white;
        margin-left: 10px;
        height: 32px;
        border: 1px solid #333;
        padding: 0 20px;
        border-radius: 10px;
        background-color: black;

        :hover {
            box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
        }
    }
`

const SearchButton = styled.button`
    background-color: black;
    margin-left: 10px;

    border: 1px solid #333;
    border-radius: 10px;
    height: 30px;
    width: 30px;

    svg {
        font-size: 12px;
    }
`
