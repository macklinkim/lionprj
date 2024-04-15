async function getReply(id) {
	try {
		try {
			const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/reply/${id}`, {
				next: { revalidate: +process.env.NEXT_PUBLIC_REVALDATE },
			});
			const replies = await res.json();
			return replies.replies;
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log("Error loading products: ", error);
	}
}

export default getReply;
