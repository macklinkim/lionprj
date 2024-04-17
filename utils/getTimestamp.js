function addZero(n) {
	return (n < 10 ? "0" + n : n);
}
async function getTimestamp(date) {
	console.log(date);
	let createdAt = `${date.getFullYear()}.${addZero(date.getMonth()+1)}.${addZero(date.getDate())} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
	return createdAt;
}
export default getTimestamp;
