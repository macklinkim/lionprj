async function postReply(reply) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL +`/api/reply/${reply.productId}`, {
      method: "POST",
      body: JSON.stringify({
        content: {...reply},
      })
    })
    // const result = await res.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
export default postReply;