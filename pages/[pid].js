import { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

function ProductDetailsPage(props) {
  const { filteredProduct } = props;
  return (
    <Fragment>
      <h1>{filteredProduct.title}</h1>
      <p>{filteredProduct.description}</p>
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
  const filteredProduct = data.products.find(
    (product) => product.id === productId
  );

  return {
    props: {
      filteredProduct: filteredProduct,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
    ],
    fallback: true,
  };
}

export default ProductDetailsPage;
