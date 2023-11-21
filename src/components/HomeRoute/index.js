import { Component } from "react";
import { ClockLoader } from "react-spinners";
import Slider from "react-slick";
import { FcSearch } from "react-icons/fc";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";

const apiStatusList = {
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

class Home extends Component {
  state = {
    newBooksList: [],
    booksList: [],
    searchInput: "react",
    activePage: 1,
    newBooksApiStatus: "",
    getBooksApiStatus: "",
  };

  componentDidMount() {
    this.getNewArrivals();
    this.getBooks();
  }

  getNewArrivals = async () => {
    this.setState({ newBooksApiStatus: apiStatusList.loading });
    const api = "https://api.itbook.store/1.0/new";
    const options = {
      method: "GET",
    };

    const response = await fetch(api, options);
    const data = await response.json();

    if (response.ok) {
      this.setState({
        newBooksList: data.books,
        newBooksApiStatus: apiStatusList.success,
      });
    }
  };

  getBooks = async () => {
    this.setState({
      getBooksApiStatus: apiStatusList.loading,
    });

    const { searchInput, activePage } = this.state;
    const api = `https://api.itbook.store/1.0/search/${searchInput}/${activePage}`;
    const options = {
      method: "GET",
    };
    const response = await fetch(api, options);
    const data = await response.json();

    if (response.ok) {
      this.setState({
        booksList: data.books,
        getBooksApiStatus: apiStatusList.success,
      });
    } else {
      this.setState({
        getBooksApiStatus: apiStatusList.failure,
      });
    }
  };

  onChangeInput = (e) => {
    this.setState({
      searchInput: e.target.value,
    });
  };

  onKeyDown = (e) => {
    if (e.key === "Enter") {
      this.getBooks();
    }
  };

  onClickSearch = () => {
    this.getBooks();
  };

  onClickLeft = () => {
    const { activePage } = this.state;
    if (activePage !== 1) {
      this.setState(
        (prev) => ({
          activePage: prev.activePage - 1,
        }),
        this.getBooks
      );
    }
  };

  onClickRight = () => {
    this.setState(
      (prev) => ({ activePage: prev.activePage + 1 }),
      this.getBooks
    );
  };

  renderPaginationButtons = () => {
    const { activePage } = this.state;
    const { booksList } = this.state;

    return (
      <div className="d-flex flex-row justify-content-center align-items-center">
        <button
          key="left"
          className="page-btn"
          type="button"
          onClick={this.onClickLeft}
          disabled={activePage === 1}
        >
          <CiCircleChevLeft className="page-icon" />
        </button>
        <p className="page-num">{activePage}</p>
        <button
          key="right"
          className="page-btn"
          type="button"
          onClick={this.onClickRight}
          disabled={booksList.length < 10}
        >
          <CiCircleChevRight className="page-icon" />
        </button>
      </div>
    );
  };

  renderLoader = () => (
    <div className="loader-container d-flex justify-content-center align-items-center">
      <ClockLoader color="skyblue" height="50" width="50" />
    </div>
  );

  renderSlides = () => {
    const { newBooksList } = this.state;
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 3600,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
      ],
    };
    return (
      <div className="slides-div">
        <h2 className="text-warning new-arrivals"> New Arrivals </h2>
        <Slider {...settings}>
          {newBooksList.map((each) => (
            <Link to={`/book/${each.isbn13}`} key={each.isbn13}>
              <img className="slide-img" src={each.image} alt={each.title} />
            </Link>
          ))}
        </Slider>
      </div>
    );
  };

  renderBooks = () => {
    const { booksList } = this.state;

    return (
      <>
        <ul className="books-ul">
          {booksList.map((each) => (
            <li key={each.isbn13} className="book-li col-6 col-md-4">
              <Link
                className="book-a d-flex flex-column align-items-center"
                to={`/book/${each.isbn13}`}
              >
                <img className="book-img" src={each.image} alt={each.title} />
                <p className="book-name">{each.title}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div>{this.renderPaginationButtons()}</div>
      </>
    );
  };

  renderBooksList = () => {
    const { getBooksApiStatus } = this.state;

    switch (getBooksApiStatus) {
      case apiStatusList.loading:
        return this.renderLoader();
      case apiStatusList.success:
        return this.renderBooks();

      default:
        return null;
    }
  };

  renderHomePage = () => (
    <div>
      <div>{this.renderSlides()}</div>
      <div className="input-container m-auto">
        <input
          type="search"
          onChange={this.onChangeInput}
          onKeyDown={this.onKeyDown}
          name="searchInput"
          className="home-search pl-5"
          placeholder="Search with title or ISBN number"
        />
        <FcSearch className="search-icon" onClick={this.onClickSearch} />
      </div>
      <div>{this.renderBooksList()}</div>
      <div>{this.renderPagination}</div>
    </div>
  );

  render() {
    return (
      <div className="container home-container">{this.renderHomePage()}</div>
    );
  }
}

export default Home;
