import 'tailwindcss/tailwind.css';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			{/* allow us to persist login state as we move around in the app */}
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
