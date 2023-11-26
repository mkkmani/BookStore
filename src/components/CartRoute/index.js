import { Link } from "react-router-dom";
import Context from "../../Context/Context";
import "./index.css";

const Cart = () => (
  <Context.Consumer>
    {(context) => {
      const { cartList, onClickIncOrDec } = context;

      // Calculate total price
      const totalPrice = cartList
        .reduce((acc, each) => {
          const price = parseFloat(each.price.slice(1));
          const itemPrice = each.quantity * price;
          return acc + itemPrice;
        }, 0)
        .toFixed(2);

      return (
        <div>
          {cartList.length === 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center m-5">
              <img
                src="https://res.cloudinary.com/dj1bucjya/image/upload/v1700632525/pngwing.com_cjyuk1.png"
                alt="empty cart"
                className="empty-cart-img"
              />
              <p className="fw-bold">Your cart is empty.</p>
              <Link to="/">
                <button className="btn btn-primary">Browse Books</button>
              </Link>
            </div>
          ) : (
            <div>
              <ul className="d-flex flex-row flex-wrap">
                {cartList.map((each) => (
                  <li
                    key={each.isbn13}
                    className="d-flex flex-row align-items-center"
                  >
                    <img
                      src={each.image}
                      alt={each.title}
                      className="cart-li-img flex-shrink-1"
                    />
                    <div className="cart-li-details">
                      <p>{`Title: ${each.title}`}</p>
                      <p>{`Authors: ${each.authors}`}</p>
                      <p>{`Quantity: ${each.quantity}`}</p>
                      <p>{`Price:$ ${(
                        each.quantity * parseFloat(each.price.slice(1))
                      ).toFixed(2)}`}</p>
                      <div>
                        <button
                          className="btn pb-3"
                          onClick={() => onClickIncOrDec(each, -1)}
                        >
                          -
                        </button>
                        <span>{each.quantity}</span>
                        <button
                          className="btn pb-3"
                          onClick={() => onClickIncOrDec(each, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="d-flex flex-row justify-content-end p-5 pt-1">
                <div className="d-flex flex-column">
                  <p className="mr-5 pr-5 fw-bold">
                    Total Price: {`$ ${totalPrice}`}
                  </p>
                  <button type="button" className="btn btn-success">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }}
  </Context.Consumer>
);

export default Cart;
