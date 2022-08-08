import { BrowserRouter, Routes, Route } from "react-router-dom"

import "../../assets/styles/reset.css"
import GlobalStyle from "../../globalStyles"

import DataContext from "../context/context.js"

import Home from "../Home"
import Header from "../Header"
import Story from "../Story"
import Chapter from "../Chapter"
import CreateStory from "../CreateStory"

export default function App() {
    return (
        <DataContext.Provider value="">
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
                </Routes>
            </BrowserRouter>
        </DataContext.Provider>
    )
}
