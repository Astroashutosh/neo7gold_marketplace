"use client";

import Link from "next/link";
import {
  useWishlist,
} from "../../context/WishlistContext";

import {
  useCart,
} from "../../context/CartContext";


export default function WishlistPage() {

  const {
    wishlistItems,
    wishlistCount,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();


  const {
    addToCart,
  } = useCart();


  const moveToCart = (item: any) => {

    addToCart({

      id: item.id,

      name: item.name,

      sku: item.sku,

      price: item.price,

      image: item.image,

      quantity: 1,

      goldWeight:
        item.goldWeight,

    });


    removeFromWishlist(item.id);

  };


  return (

    <main className="luxury-wishlist-page">

      {/* =====================================
          EMPTY WISHLIST
      ===================================== */}

      {wishlistItems.length === 0 && (

        <section className="empty-wishlist">

          <div className="empty-wishlist-icon">

            ♡

          </div>


          <span>

            YOUR COLLECTION IS EMPTY

          </span>


          <h2>

            Discover Something
            <em> Extraordinary</em>

          </h2>


          <p>

            Explore our exclusive collection
            and save the pieces you love.

          </p>


          <Link
            href="/shop"
            className="wishlist-shop-btn"
          >

            EXPLORE COLLECTION

            <i>
              →
            </i>

          </Link>

        </section>

      )}


      {/* =====================================
          WISHLIST GRID
      ===================================== */}

      {wishlistItems.length > 0 && (

        <>

          <div className="wishlist-summary">

            <span>

              YOUR PRIVATE COLLECTION

            </span>


            <strong>

              {wishlistCount}{" "}

              {wishlistCount === 1
                ? "PIECE"
                : "PIECES"}

            </strong>

          </div>


          <section className="wishlist-grid">

            {wishlistItems.map((item) => (

              <article
                className="wishlist-card"
                key={item.id}
              >


                {/* IMAGE */}

                <div className="wishlist-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />


                  <button
                    className="wishlist-remove"
                    onClick={() =>
                      removeFromWishlist(item.id)
                    }
                  >

                    ×

                  </button>


                  <div className="wishlist-image-overlay">

                    <span>

                      NEOS7 GOLD

                    </span>

                  </div>

                </div>


                {/* CONTENT */}

                <div className="wishlist-card-content">


                  <span className="wishlist-reference">

                    {item.sku}

                  </span>


                  <h3>

                    {item.name}

                  </h3>


                  <div className="wishlist-card-bottom">


                    <div className="wishlist-price">

                      <span>

                        EXCLUSIVE PRICE

                      </span>


                      <strong>

                        $
                        {item.price.toLocaleString()}

                      </strong>

                    </div>


                    <button
                      className="wishlist-cart-btn"
                      onClick={() =>
                        moveToCart(item)
                      }
                    >

                      ADD TO BAG

                      <i>
                        →
                      </i>

                    </button>

                  </div>

                </div>

              </article>

            ))}

          </section>

        </>

      )}


      {/* =====================================
          FOOTER TRUST
      ===================================== */}

      <section className="wishlist-trust">

        <div>

          <span>✦</span>

          PRIVATE COLLECTION

        </div>


        <div>

          <span>✓</span>

          AUTHENTICITY GUARANTEED

        </div>


        <div>

          <span>✦</span>

          INSURED DELIVERY

        </div>

      </section>


    </main>

  );

}
