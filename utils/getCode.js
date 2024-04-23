async function getCode(code, id) {
	try {
		const res = await fetch( process.env.NEXT_PUBLIC_BASE_URL +`/api/code/${code}`, {
      method:"GET",
			cache: "force-cache",
		});
		const resValue = await res.json();
    const aCode = resValue.codes.find(code => code.code === id);
    // console.log('find code: ',aCode);
		return aCode.value;
	} catch (error) {
    console.log(error);
  }
}

export default getCode;
