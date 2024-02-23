import  { useState, useEffect } from "react";
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

const Home = () => {
  const [newBooksList, setNewBooksList] = useState([]);
  const [booksList, setBooksList] = useState([]);
  const [searchInput, setSearchInput] = useState("react");
  const [activePage, setActivePage] = useState(1);
  const [newBooksApiStatus, setNewBooksApiStatus] = useState("");
  const [getBooksApiStatus, setGetBooksApiStatus] = useState("");

  useEffect(() => {
    getNewArrivals();
    getBooks();
  }, [activePage, searchInput]);

  const getNewArrivals = async () => {
    setNewBooksApiStatus(apiStatusList.loading);
    const api = "https://api.itbook.store/1.0/new";
    const options = {
      method: "GET",
    };

    const response = await fetch(api, options);
    const data = await response.json();

    if (response.ok) {
      setNewBooksList(data.books);
      setNewBooksApiStatus(apiStatusList.success);
    }
  };

  const getBooks = async () => {
    setGetBooksApiStatus(apiStatusList.loading);

    const api = `https://api.itbook.store/1.0/search/${searchInput}/${activePage}`;
    const options = {
      method: "GET",
    };
    const response = await fetch(api, options);
    const data = await response.json();

    if (response.ok) {
      setBooksList(data.books);
      setGetBooksApiStatus(apiStatusList.success);
    } else {
      setGetBooksApiStatus(apiStatusList.failure);
    }
  };

  const onChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      getBooks();
    }
  };

  const onClickSearch = () => {
    getBooks();
  };

  const onClickLeft = () => {
    if (activePage !== 1) {
      setActivePage((prev) => prev - 1);
    }
  };

  const onClickRight = () => {
    setActivePage((prev) => prev + 1);
  };

  const renderPaginationButtons = () => {
    return (
      <div className="d-flex flex-row justify-content-center align-items-center">
        <button
          key="left"
          className="page-btn"
          type="button"
          onClick={onClickLeft}
          disabled={activePage === 1}
        >
          <CiCircleChevLeft className="page-icon" />
        </button>
        <p className="page-num">{activePage}</p>
        <button
          key="right"
          className="page-btn"
          type="button"
          onClick={onClickRight}
          disabled={booksList.length < 10}
        >
          <CiCircleChevRight className="page-icon" />
        </button>
      </div>
    );
  };

  const renderLoader = () => (
    <div className="loader-container d-flex justify-content-center align-items-center">
      <ClockLoader color="skyblue" height="50" width="50" />
    </div>
  );

  const renderSlides = () => {
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

  const renderBooks = () => {
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
        <div>{renderPaginationButtons()}</div>
      </>
    );
  };

  const renderBooksList = () => {
    switch (getBooksApiStatus) {
      case apiStatusList.loading:
        return renderLoader();
      case apiStatusList.success:
        return renderBooks();
      default:
        return null;
    }
  };

  const renderHomePage = () => (
    <div>
      <div>{renderSlides()}</div>
      <div className="input-container m-auto">
        <input
          type="search"
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
          name="searchInput"
          className="home-search pl-5"
          placeholder="Search with title or ISBN number"
        />
        <FcSearch className="search-icon" onClick={onClickSearch} />
      </div>
      <div>{renderBooksList()}</div>
    </div>
  );

  return <div className="container home-container">{renderHomePage()}</div>;
};

export default Home;
