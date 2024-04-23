async function getImages(filename) {
	if (Array.isArray(filename)) {
		const imageFiles = [];
		filename.forEach(async (element, index) => {
			try {
				const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL +`/api/download/${element}`, {
					cache: "force-cache",
				});
				const pos = await res.json();
        imageFiles.push(pos.image);
			} catch (error) {
				console.log(error);
			}
		});
    return imageFiles;
	} else {
		try {
			const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL +`/api/download/${filename}`, {
				cache: "force-cache",
			});
			const pos = await res.json();
      
			return pos.image;
		} catch (error) {
			console.log(error);
		}
	}
}

export default getImages;
