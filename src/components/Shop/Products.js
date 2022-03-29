import ProductItem from './ProductItem';
import classes from './Products.module.css';

// This will eventually turn into the food oredering app and hardcoded data will be changed over to a backend
const DUMMY_PRODUCTS = [
  {
    id: "item1",
    price: 1,
    title: "Penne Pasta",
    description: "Good For Bulking"
  },
  {
    id: "item2",
    price: 3,
    title: "Marinara sauce",
    description: "Tastes delicious with cheese!"
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => 
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description= {product.description}
          />)}
      </ul>
    </section>
  );
};

export default Products;
