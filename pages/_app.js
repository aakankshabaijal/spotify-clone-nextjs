import 'tailwindcss/tailwind.css';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			{/* allow us to persist login state as we move around in the app */}
			<RecoilRoot>
				{/* using Recoil for global state management */}
				<Component {...pageProps} />
			</RecoilRoot>
		</SessionProvider>
	);
}

export default MyApp;
