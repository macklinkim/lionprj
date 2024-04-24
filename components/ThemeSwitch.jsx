"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (resolvedTheme === "dark") {
		return (
			<div>
				<button onClick={() => setTheme("light")}>🌜모드</button>
				{/* <FiSun onClick={() => setTheme("light")} /> */}
			</div>
		);
	}

	if (resolvedTheme === "light") {
		return (
			<div>
				<button onClick={() => setTheme("dark")}>🌅모드</button>
				{/* <FiMoon  onClick={() => setTheme("dark")} /> */}
			</div>
		);
	}
}
