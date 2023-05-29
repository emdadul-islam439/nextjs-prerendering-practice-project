import { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

function ProductDetailsPage(props) {
  const { filteredProduct } = props;

  //   if(!filteredProduct){
  //     return <p>Loading...</p>
  //   }

  return (
    <Fragment>
      <h1>{filteredProduct.title}</h1>
      <p>{filteredProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
}

export async function getStaticProps(context) {
  console.log("revalidating... product-details");
  const data = await getData();

  const { params } = context;
  const productId = params.pid;
  const filteredProduct = data.products.find(
    (product) => product.id === productId
  );

  if (!filteredProduct) {
    return { notFound: true };
  }

  return {
    props: {
      filteredProduct: filteredProduct,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    // fallback: true,
    fallback: "blocking",
  };
}

export default ProductDetailsPage;
