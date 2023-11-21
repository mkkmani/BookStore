import { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Context from "../../Context/Context";
import "./index.css";

const apiStatusList = {
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

class BookDetails extends Component {
  state = {
    bookDetails: {},
    apiStatus: "init",
  };

  componentDidMount() {
    this.getBookDetails();
  }

  getBookDetails = async () => {
    this.setState({ apiStatus: apiStatusList.loading });
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const api = `https://api.itbook.store/1.0/books/${id}`;
    const options = {
      method: "GET",
    };

    const response = await fetch(api, options);
    const data = await response.json();

    this.setState({ bookDetails: data, apiStatus: apiStatusList.success });
  };

  renderLoader = () => (
    <div className="loader-container">
      <ClipLoader color={"orange"} />
    </div>
  );

  renderDetails = () => (
    <Context.Consumer>
      {(context) => {
        const { onClickSave, onClickAddToCart } = context;
        const { bookDetails } = this.state;
        const {
          title,
          subtitle,
          authors,
          publisher,
          isbn13,
          pages,
          year,
          rating,
          desc,
          price,
          image,
        } = bookDetails;

        const onClickSaveBtn = () => {
          onClickSave(bookDetails);
          // console.log("Added to save list", bookDetails);
        };

        const onClickAddToCartBtn = () => {
          onClickAddToCart(bookDetails);
          // console.log("Added to cart", bookDetails);
        };

        return (
          <div className="container book-container">
            <div className="row">
              <div className="col-12 p-3 titles-div">
                <h1 className="title-main">{title}</h1>
                <h2 className="sub">{subtitle}</h2>
              </div>
              <div className="col-12 col-md-4 d-flex flex-column align-items-start">
                <img src={image} alt={title} />
                <h1 className="book-title">{title}</h1>
                <p>{subtitle}</p>
              </div>
              <div className="col-12 col-md-8 d-flex flex-column justify-content-center align-items-center">
                <table>
                  <tbody>
                    <tr className="m-2">
                      <td className="col-4">Title</td>
                      <td className="fw-bold">{title}</td>
                    </tr>
                    <tr className="m-2">
                      <td className="col-4">Subtitle</td>
                      <td className="fw-bold">{subtitle}</td>
                    </tr>
                    <tr className="m-2">
                      <td className="col-4">Author</td>
                      <td className="fw-bold">{authors}</td>
                    </tr>

                    <tr className="m-2">
                      <td className="col-4">Price</td>
                      <td className="fw-bold">{price}</td>
                    </tr>

                    <tr className="m-2">
                      <td className="col-4">Rating</td>
                      <td className="fw-bold">{rating}</td>
                    </tr>

                    <tr className="m-2">
                      <td className="col-4">Published</td>
                      <td className="fw-bold">{year}</td>
                    </tr>

                    <tr className="m-2">
                      <td className="col-4">Publisher</td>
                      <td className="fw-bold">{publisher}</td>
                    </tr>

                    <tr className="m-2">
                      <td className="col-4">Pages</td>
                      <td className="fw-bold">{pages}</td>
                    </tr>

                    <tr className="m-2">
                      <td className="col-4">Format</td>
                      <td className="fw-bold">Paper</td>
                    </tr>

                    <tr className="m-2">
                      <td className="col-4">Language</td>
                      <td className="fw-bold">English</td>
                    </tr>

                    <tr className="m-2">
                      <td className="col-4">ISBN 13</td>
                      <td className="fw-bold">{isbn13}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 d-flex flex-row justify-content-center align-items-center">
                  <button
                    className="btn btn-primary m-2"
                    type="button"
                    onClick={onClickSaveBtn}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={onClickAddToCartBtn}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="col-12 mt-4 align-self-end">
                <p className="fw-bold">Description</p>
                <p>{desc}</p>
              </div>
            </div>
          </div>
        );
      }}
    </Context.Consumer>
  );

  renderPage = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusList.loading:
        return this.renderLoader();
      case apiStatusList.success:
        return this.renderDetails();

      default:
        return null;
    }
  };

  render() {
    return <div>{this.renderPage()}</div>;
  }
}

export default BookDetails;
