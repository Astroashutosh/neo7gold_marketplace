"use client";

import Link from "next/link";
import {
  useCart,
} from "../../context/CartContext";
import { getDashboardLoginUrl } from "../data/dashboard";

export default function CheckoutPage() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const shipping = 0;

  const discount = 0;

  const total =
    cartTotal +
    shipping -
    discount;

  const dashboardLoginUrl = getDashboardLoginUrl();

  const handleProceedToCheckout = () => {
    if (!dashboardLoginUrl) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "NEXT_PUBLIC_DASHBOARD_BASE_URL is not configured; " +
            "the checkout redirect is disabled."
        );
      }

      return;
    }

    window.location.assign(dashboardLoginUrl);
  };

  return (
    <main className="gold-checkout-page">

      {/* =====================================
          MAIN
      ===================================== */}

      <section className="checkout-wrapper">


        {/* LEFT */}

        <div className="checkout-left">


          <div className="checkout-title">

            <div>

              <span className="checkout-eyebrow">
                YOUR SELECTION
              </span>

              <h1>
                Shopping
                <em>
                  Bag
                </em>
              </h1>

            </div>


            <div className="item-count">

              {cartCount} ITEM
              {cartCount !== 1 ? "S" : ""}

            </div>

          </div>


          {/* EMPTY CART */}

          {cartItems.length === 0 && (

            <div className="empty-cart">

              <div className="empty-cart-icon">
                ◇
              </div>

              <h2>
                Your bag is empty
              </h2>

              <p>
                Discover our exclusive
                jewellery collection.
              </p>

              <Link
                href="/shop"
                className="continue-shopping"
              >
                EXPLORE COLLECTION
                <span>
                  →
                </span>
              </Link>

            </div>

          )}


          {/* CART ITEMS */}

          {cartItems.map(
            (item) => (

              <article
                className="checkout-product"
                key={item.id}
              >

                {/* IMAGE */}

                <div className="checkout-product-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <span className="image-badge">
                    PREMIUM
                  </span>

                </div>


                {/* PRODUCT INFO */}

                <div className="checkout-product-info">

                  <div className="product-info-top">

                    <div>

                      <span className="product-brand">
                        NEOS7 GOLD
                        JOAILLERIE
                      </span>

                      <h2>
                        {item.name}
                      </h2>

                      <span className="checkout-sku">
                        REF. {item.sku}
                      </span>

                    </div>


                    <button
                      className="remove-product"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      ×
                    </button>

                  </div>


                  {/* DETAILS */}

                  <div className="checkout-product-details">

                    <div>

                      <span>
                        CERTIFICATION
                      </span>

                      <strong>
                        IGI Certified
                      </strong>

                    </div>


                    <div>

                      <span>
                        DELIVERY
                      </span>

                      <strong>
                        Insured Shipping
                      </strong>

                    </div>

                  </div>


                  {/* BOTTOM */}

                  <div className="checkout-product-bottom">

                    {/* QUANTITY */}

                    <div className="checkout-quantity">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>

                    </div>


                    {/* PRICE */}

                    <div className="checkout-price">

                      <span>
                        EXCLUSIVE PRICE
                      </span>

                      <strong>
                        $
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString()}
                      </strong>

                    </div>

                  </div>

                </div>

              </article>

            )
          )}


          <Link
            href="/shop"
            className="checkout-continue"
          >
            ←
            <span>
              Continue Shopping
            </span>
          </Link>


          {/* TRUST */}

          <div className="checkout-trust-row">

            <div>

              <span>
                ✓
              </span>

              <div>

                <strong>
                  AUTHENTICITY
                </strong>

                <small>
                  Guaranteed
                </small>

              </div>

            </div>


            <div>

              <span>
                ✓
              </span>

              <div>

                <strong>
                  SECURE PAYMENT
                </strong>

                <small>
                  Protected
                </small>

              </div>

            </div>


            <div>

              <span>
                ✓
              </span>

              <div>

                <strong>
                  INSURED DELIVERY
                </strong>

                <small>
                  Worldwide
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <aside className="checkout-right">


          {/* GOLD PROMO */}

          <div className="gold-promo">

            <div className="promo-glow"></div>

            <span className="promo-small">
              NEOS7 EXCLUSIVE
            </span>

            <h3>
              Golden
              <em>
                Privilege
              </em>
            </h3>

            <p>
              Enjoy complimentary
              insured worldwide delivery.
            </p>

            <div className="promo-diamond">
              ✦
            </div>

          </div>


          {/* COUPON */}

          <div className="checkout-coupon">

            <div className="coupon-icon">
              %
            </div>

            <div>

              <strong>
                Have a privilege code?
              </strong>

              <span>
                Apply your exclusive offer
              </span>

            </div>

            <button>
              APPLY
            </button>

          </div>


          {/* DELIVERY */}

          <div className="checkout-delivery">

            <div className="delivery-icon">
              ◉
            </div>

            <div>

              <strong>
                DELIVERY & LOCATION
              </strong>

              <span>
                Add your delivery details
              </span>

            </div>

            <span className="delivery-arrow">
              →
            </span>

          </div>


          {/* ORDER SUMMARY */}

          <div className="order-summary">

            <div className="summary-heading">

              <span>
                ORDER SUMMARY
              </span>

              <span>
                {cartCount} ITEM
                {cartCount !== 1
                  ? "S"
                  : ""}
              </span>

            </div>


            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                $
                {cartTotal.toLocaleString()}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Privilege Discount
              </span>

              <strong className="discount-value">
                —
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Insured Shipping
              </span>

              <strong className="free-shipping">
                COMPLIMENTARY
              </strong>

            </div>


            <div className="summary-divider"></div>


            <div className="summary-total">

              <div>

                <span>
                  TOTAL
                </span>

                <small>
                  INCLUDING TAXES
                </small>

              </div>

              <strong>
                $
                {total.toLocaleString()}
              </strong>

            </div>


            <div className="checkout-note">

              <span>
                ✦
              </span>

              <p>
                Your final price and
                availability will be confirmed
                before payment.
              </p>

            </div>

          </div>


          {/* CHECKOUT BUTTON */}

          {cartItems.length > 0 && (

            <button
              type="button"
              className="checkout-button"
              onClick={handleProceedToCheckout}
              disabled={!dashboardLoginUrl}
              aria-disabled={!dashboardLoginUrl}
              title={
                dashboardLoginUrl
                  ? undefined
                  : "Checkout is temporarily unavailable."
              }
            >

              <span>
                PROCEED TO CHECKOUT
              </span>

              <i>
                →
              </i>

            </button>

          )}

          <div className="checkout-payment-note">

            <span>
              🔒
            </span>

            Secure & encrypted checkout

          </div>

        </aside>

      </section>

    </main>
  );
}
