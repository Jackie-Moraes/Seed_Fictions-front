import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import "../../assets/styles/reset.css"
import GlobalStyle from "../../globalStyles"

import DataContext from "../context/context.js"

import Home from "../Home"
import Header from "../Header"
import Story from "../Story"
import Chapter from "../Chapter"
import CreateStory from "../CreateStory"
import SignUp from "../SignUp"
import SignIn from "../SignIn"

export default function App() {
    const [data, setData] = useState({})

    return (
        <DataContext.Provider value={{ data, setData }}>
            <GlobalStyle />
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/story/:storyId" element={<Story />} />
                    <Route
                        path="/story/:storyId/chapter/:chapterId"
                        element={<Chapter />}
                    />
                    <Route path="/create-story" element={<CreateStory />} />
                    <Route path="/create-chapter/:storyId" element="" />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                </Routes>
            </BrowserRouter>
        </DataContext.Provider>
    )
}
