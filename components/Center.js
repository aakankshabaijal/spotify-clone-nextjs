import { useSession } from 'next-auth/react';

function Center() {
	const { data: session } = useSession();

	if (session && session.user) {
		return (
			<div className="flex flex-grow text-white">
				<h1>Center component</h1>
				<header>
					<div className="">
						<img className="rounded-full w-10 h-10" src={session.user.image} alt="user image" />
						<h2>{session.user.name}</h2>
					</div>
				</header>
			</div>
		);
	}
	else {
		return <div>No session</div>;
	}
}

export default Center;
