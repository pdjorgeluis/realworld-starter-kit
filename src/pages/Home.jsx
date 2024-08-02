import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import tagsService from "../services/tags";
import Banner from "../components/Banner";
import ArticlesList from "../components/ArticlesList";
import {
  setArticlesByTag,
  setArticlesByFeed,
} from "../reducers/articleReducer";

function Home() {
  const user = useSelector((state) => state.loggedUser.user);
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const limit = 10; // make it variable?
  const pages = Math.ceil(articlesCount / limit);
  const [page, setPage] = useState(0);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState({ tag: "", feed: "GLOBAL" });

  useEffect(() => {
    tagsService.getAll().then((fetchedTags) => setTags(fetchedTags.tags));
  }, []);

  const dispatch = useDispatch();

  // Improve code below so it doesn need a switch case
  useEffect(() => {
    switch (filter.feed) {
      case "GLOBAL": {
        dispatch(setArticlesByTag({ offset: page }, filter.tag, user));
        break;
      }
      case "TAG": {
        dispatch(setArticlesByTag({ offset: page }, filter.tag, user));
        break;
      }
      case "YOUR": {
        dispatch(setArticlesByFeed({ offset: page }));
        break;
      }
      default:
        break;
    }
  }, [filter, page]);

  const handleTagClick = (t) => {
    setFilter({ tag: t, feed: "TAG" });
  };

  const handleGlobalFeedClick = () => {
    setFilter({ tag: "", feed: "GLOBAL" });
  };

  const handleYourFeedClick = () => {
    setFilter({ tag: "", feed: "YOUR" });
  };

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {user && (
                  <li className="nav-item">
                    <button
                      className={`nav-link ${filter.feed === "YOUR" ? "active" : ""}`}
                      type="button"
                      onClick={handleYourFeedClick}
                    >
                      Your Feed
                    </button>
                  </li>
                )}

                <div>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${filter.feed === "GLOBAL" ? "active" : ""}`}
                      type="button"
                      onClick={handleGlobalFeedClick}
                    >
                      Global Feed
                    </button>
                  </li>
                  {filter.tag !== "" && (
                    <li className="nav-item">
                      <button
                        className={`nav-link ${filter.feed === "TAG" ? "active" : ""}`}
                        type="button"
                      >
                        #{filter.tag}
                      </button>
                    </li>
                  )}
                </div>
              </ul>
            </div>
            <ArticlesList />

            <ul className="pagination">
              {Array.from({ length: pages }, (v, i) => (
                <li
                  className={page === i ? "page-item active" : "page-item"}
                  key={i}
                >
                  <button
                    className="page-link"
                    type="button"
                    onClick={() => setPage(i)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags &&
                  tags.map((t) => (
                    <Link
                      key={t}
                      className="tag-pill tag-default"
                      to=""
                      onClick={() => handleTagClick(t)}
                    >
                      {t}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
