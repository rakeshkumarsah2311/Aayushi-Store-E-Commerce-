import styled from "styled-components";
import { useCartContext } from "./context/cart_context";
import CartItem from "./components/CartItem";
import { NavLink } from "react-router-dom";
import { Button } from "./styles/Button";
import FormatPrice from "./Helpers/FormatPrice";

const Cart = () => {
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  
  // Check if cart is undefined or empty
  if (!cart || cart.length === 0) {
    return (
      <Wrapper>
        <div className="container">
          <EmptyDiv>
            <h3>No Cart Items </h3>
          </EmptyDiv>
        </div>
      </Wrapper>
    );
  }

  // Render the cart contents if cart is not empty
  return (
    <Wrapper>
      <div className="container">
        <div className="cart_heading grid grid-five-column">
          <p>Item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
          <p className="cart-hide">Subtotal</p>
          <p>Remove</p>
        </div>
        <hr />
        <div className="cart-item">
          {cart.map((curElem) => {
            return <CartItem key={curElem.id} {...curElem} />;
          })}
        </div>
        <hr />
        <div className="cart-two-button">
          <NavLink to="/products">
            <Button> Continue Shopping </Button>
          </NavLink>
          <Button className="btn btn-clear" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        {/* Order total_amount */}
        <div className="order-total--amount">
          <div className="order-total--subdata">
            <div>
              <p>Subtotal:</p>
              <p>
                <FormatPrice price={total_price} />
              </p>
            </div>
            <div>
              <p>Shipping Fee:</p>
              <p>
                <FormatPrice price={shipping_fee} />
              </p>
            </div>
            <hr />
            <div>
              <p>Order Total:</p>
              <p>
                <FormatPrice price={shipping_fee + total_price} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;

  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

export default Cart;
