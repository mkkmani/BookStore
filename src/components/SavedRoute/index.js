import { Component } from "react";
import { CiBookmarkMinus } from "react-icons/ci";
import { Link } from "react-router-dom";
import Context from "../../Context/Context";
import "./index.css";

class SavedList extends Component {
  onClickClearList = () => {
    const emptyList = [];
    this.setState({ savedList: emptyList });
    localStorage.setItem("savedList", JSON.stringify(emptyList));
  };

  renderSavedList = () => (
    <Context.Consumer>
      {(context) => {
        const { savedList, onClickRemoveBookMark } = context;

        if (!savedList || savedList.length === 0) {
          return (
            <div className="no-books-div">
              <img
                className="no-books-img"
                src="https://res.cloudinary.com/dj1bucjya/image/upload/v1700596360/bookstore/nobooks-ic_hqefot.png"
                alt="no books"
              />
              <h1>No saved books</h1>
              <Link to="/">
                <button className="btn btn-primary" type="button">
                  Browse books
                </button>
              </Link>
            </div>
          );
        }

        return (
          <div>
            <div className="top-div">
              <h1 className="saved-title">Saved Books</h1>
              <button className="btn btn-danger" type="button">
                Clear List
              </button>
            </div>
            <div>
              <ul className="saved-ul-list row">
                {savedList.map((each) => (
                  <li
                    className="col-12 col-md-6 mb-3 d-flex flex-row"
                    key={each.isbn13}
                  >
                    <Link className="link-item" to={`/book/${each.isbn13}`}>
                      <img
                        className="saved-image"
                        src={each.image}
                        alt={each.title}
                      />
                    </Link>
                    <div className="d-flex flex-column fw-bold saved-details ms-3">
                      <p className="saved-text">{each.title}</p>
                      <p className="saved-text">{`By ${each.authors}`}</p>
                      <p className="saved-text">{each.price}</p>
                      <button
                        type="button"
                        className="btn d-flex align-items-center"
                        onClick={() => onClickRemoveBookMark(each)}
                      >
                        Remove <CiBookmarkMinus className="ms-1" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }}
    </Context.Consumer>
  );

  render() {
    return this.renderSavedList();
  }
}

export default SavedList;
