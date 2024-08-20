import type { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Frame Game',
	description: 'Guess which move wins!',
}
export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/svg+xml" href="/vite.svg" />
			</head>
			<body>
				<div id="root">{children}</div>
			</body>
		</html>
	)
}
