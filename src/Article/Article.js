import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import "./Article.css"

function Article () {
    const articles = useSelector((state) => state.articles)
    const {slug} = useParams()
    const article = () => {
        if (articles.length) {
            return articles.findIndex(el => el.slug === slug)
        }
    }
    
    if (articles.length && articles[article()].slug === slug && slug!==undefined) return (
        <div className="article article_id">
            <h3 className="title title_id">{articles[article()].title}</h3>
            <div className="tags">
                {articles[article()].tagList.map(tag => <span className="tag">{tag}</span>)}
            </div>
            <div>
                {articles[article()].description}
            </div>
            <div className="user_info">
                <div>
                <div>{articles[article()].author.username}</div>
                <div>{new Date(articles[article()].updatedAt).toDateString()}</div>
                </div>
                <img src={articles[article()].author.image}></img>
            </div>
            <div className="article_body">{articles[article()].body}</div>
        </div>
        )
}

export default Article