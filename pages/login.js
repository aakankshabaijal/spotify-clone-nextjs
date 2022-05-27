import React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { HeartIcon } from '@heroicons/react/solid';

function Login({ providers }) {
	return (
		<div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
			<img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="Spotify Logo" />
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button
						className="bg-[#18D860] text-white p-5 rounded-full"
						onClick={() => signIn(provider.id, { callbackUrl: '/' })}
					>
						Login with {provider.name}
					</button>
				</div>
			))}
			<p className="text-white mt-5">
				Open Spotify on any of your devices to view your playlists and control playback from this clone
			</p>

			<p className="text-white flex-end absolute bottom-5 mb-2">
				Made with <HeartIcon className="w-5 h-5 inline " /> by{' '}
				<a href="https://www.linkedin.com/in/aakankshabaijal/" className="text-white">
					Aakanksha Baijal
				</a>
			</p>
		</div>
	);
}

export default Login;

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props : {
			providers
		}
	};
}
