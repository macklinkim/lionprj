async function postReply(reply) {
  console.log('[POST REPLY]before api call :', reply);
  try {
    console.log(process.env.NEXT_PUBLIC_URL + `/api/reply/${reply.productId}`);
    const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/reply/${reply.productId}`, {
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