import Product from "../Components/Product"

const ProductList = ({ user }) => {
  return (
    <div>
      {user ? (
        <div>
          <Product user={user} />
        </div>
      ) : (
        <div>{<Product />}</div>
      )}
    </div>
  )
}

export default ProductList
