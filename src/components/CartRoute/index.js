import Context from "../../Context/Context";

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
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cartList.map((each) => (
                <li
                  key={each.isbn13}
                  className="d-flex flex-row justify-content-center col-12 align-items-center"
                >
                  <img src={each.image} alt={each.title} />
                  <div>
                    <p>{`Title: ${each.title}`}</p>
                    <p>{`Authors: ${each.authors}`}</p>
                    <p>{`Quantity: ${each.quantity}`}</p>
                    <p>{`Price: ${(
                      each.quantity * parseFloat(each.price.slice(1))
                    ).toFixed(2)}`}</p>
                    <div>
                      <button
                        className="btn"
                        onClick={() => onClickIncOrDec(each, -1)}
                      >
                        -
                      </button>
                      <span>{each.quantity}</span>
                      <button
                        className="btn"
                        onClick={() => onClickIncOrDec(each, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              <li>Total Price: {totalPrice}</li>
            </ul>
          )}
        </div>
      );
    }}
  </Context.Consumer>
);

export default Cart;
