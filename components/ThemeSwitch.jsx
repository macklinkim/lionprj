"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeSwitch() {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (resolvedTheme === "dark") {
		return (
			<div>
				<div>다크모드</div>
				<FiSun onClick={() => setTheme("light")} />
			</div>
		);
	}

	if (resolvedTheme === "light") {
		return (
			<div>
				<div>라이트모드</div>
				<FiMoon onClick={() => setTheme("dark")} />
			</div>
		);
	}
}
