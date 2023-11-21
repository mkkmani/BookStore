import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/HomeRoute";
import BookDetails from "./components/BookRoute";
import SavedList from "./components/SavedRoute";
import Cart from "./components/CartRoute";

import Context from "./Context/Context";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

class App extends Component {
  state = { savedList: [], cartList: [] };

  componentDidMount() {
    // Accessing the lists from local storage and adding them to state
    const localSavedList = JSON.parse(localStorage.getItem("savedList")) || [];
    const localCartList = JSON.parse(localStorage.getItem("booksCart")) || [];

    console.log("saved", localSavedList);
    console.log("cart", localCartList);
    this.setState({
      savedList: localSavedList,
      cartList: localCartList,
    });
  }

  onClickSave = (details) => {
    const { savedList } = this.state;
    const { isbn13 } = details;

    const existingIndex = savedList.findIndex((book) => book.isbn13 === isbn13);

    if (existingIndex === -1) {
      const updatedList = [...savedList, details];
      this.setState({ savedList: updatedList }, () => {
        localStorage.setItem("savedList", JSON.stringify(updatedList));
      });
    } else {
      return;
    }
  };

  onClickRemoveBookMark = (details) => {
    const { isbn13 } = details;
    const { savedList } = this.state;
    const existingIndex = savedList.findIndex((book) => book.isbn13 === isbn13);
    if (existingIndex !== -1) {
      const updatedList = savedList.filter((book) => book.isbn13 !== isbn13);
      this.setState({ savedList: updatedList }, () => {
        localStorage.setItem("savedList", JSON.stringify(updatedList));
      });
    }
  };

  onClickAddToCart = (details) => {
    const { cartList } = this.state;
    const { isbn13 } = details;

    const existingIndex = cartList.findIndex((book) => book.isbn13 === isbn13);

    if (existingIndex !== -1) {
      // Book already available in the cart so update quantity
      const updatedCartList = [...cartList];
      updatedCartList[existingIndex].quantity += 1;
      this.setState({ cartList: updatedCartList }, () => {
        localStorage.setItem("booksCart", JSON.stringify(updatedCartList));
      });
    } else {
      // Book is not available in the cart so add
      const updatedCartList = [...cartList, { ...details, quantity: 1 }];
      this.setState({ cartList: updatedCartList }, () => {
        localStorage.setItem("booksCart", JSON.stringify(updatedCartList));
      });
    }
  };

  render() {
    const { savedList, cartList } = this.state;
    return (
      <Context.Provider
        value={{
          savedList,
          cartList,
          onClickSave: this.onClickSave,
          onClickAddToCart: this.onClickAddToCart,
          onClickRemoveBookMark: this.onClickRemoveBookMark,
        }}
      >
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/book/:id" component={BookDetails} />
            <Route exact path="/saved" component={SavedList} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
          <Footer />
        </Router>
      </Context.Provider>
    );
  }
}

export default App;
