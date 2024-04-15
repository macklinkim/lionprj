async function getCode(code, id) {
	try {
    console.log('getcode code: ', code);
		const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/code/${code}`, {
      method:"GET",
			cache: "force-cache",
      next: { revalidate: +process.env.NEXT_PUBLIC_REVALDATE },
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
