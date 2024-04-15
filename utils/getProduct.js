async function  getProducts(id) {
  try {
    if(id){
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/product/${id}`, {
          cache: "force-cache",
        });
        const product = await res.json();
        return product.product;
      } catch (error) {
        console.log(error);
      }
    }else{
      const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/product", {
        cache: "force-cache",
      });
      return res.json();
    }
  } catch (error) {
    console.log("Error loading products: ", error);
  }
};

export default getProducts;