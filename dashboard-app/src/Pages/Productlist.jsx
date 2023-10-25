import Product from "../Components/Product"

const ProductList = ({ user, handleClick }) => {
  return (
    <div>
      {user ? (
        <div>
          <Product user={user} handleClick={handleClick} />
        </div>
      ) : (
        <div>{<Product handleClick={handleClick} />}</div>
      )}
    </div>
  )
}

export default ProductList
