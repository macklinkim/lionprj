async function getUser(id) {
	try {
		const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/user/${id}`, {
			next: { revalidate: +process.env.NEXT_PUBLIC_REVALDATE },
		});
		const user = await res.json();
		return user.user;
	} catch (error) {}
}

export default getUser;
