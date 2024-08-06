import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  favoriteAnArticle,
  unfavoriteAnArticle,
} from "../reducers/articleReducer";

function ArticlePreview({ article, scope }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser.user);

  const handleFavouriteClick = () => {
    if (user.username !== article.author.username) {
      console.log("jum");

      try {
        if (article.favorited === false) {
          dispatch(favoriteAnArticle(article.slug, scope));
        } else {
          dispatch(unfavoriteAnArticle(article.slug, scope));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!article) {
    return null;
  }

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>
        <div className="info">
          <Link to={`/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>
        <button
          className="btn btn-outline-primary btn-sm pull-xs-right"
          type="button"
          onClick={handleFavouriteClick}
        >
          <i className="ion-heart" /> {article.favorited}
          {article.favoritesCount}
        </button>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}

export default ArticlePreview;
