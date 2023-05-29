import { Fragment } from "react";

function ProductDetailsPage(props) {
  const { fileteredProduct } = props;
  return (
    <Fragment>
      <h1>{fileteredProduct.title}</h1>
      <p>{fileteredProduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  console.log("revalidating... product-details");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const { params } = context;
  const productId = params.pid;
  const filteredProduct = data.products.find((product) => product.id === productId);

  return {
    props: {
      filteredProduct: filteredProduct,
    },
  };
}

export default ProductDetailsPage;
