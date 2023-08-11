import Header from "../Header/Header";
import ArticleList from "../ArticleList/ArticleList";
import Article from "../Article/Article";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  const dispatch = useDispatch()
  const articles = useSelector((state) => state.articles)
  const page = useSelector((state) => state.page)

  async function getArticles(){
    const propmiseArticles = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${page*5 - 5}`)
    const articles = await propmiseArticles.json()
    console.log(articles)
    dispatch({type: "ADD_ARTICLES", payload: articles})
    dispatch({type: "ADD_TOTAL", payload: articles})
  }

  useEffect(() => {
    getArticles()
  }, [page])

  useEffect(() => {
    console.log(articles)
  }, [articles])

  return (
    <>
    <Router>
    <Header/>
    <Routes>
    <Route path="/" Component={ArticleList}/>
    <Route path="/:slug" Component={Article}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
