import React from 'react';
import {
	HeartIcon,
	HomeIcon,
	LibraryIcon,
	PlusCircleIcon,
	PlusIcon,
	RssIcon,
	SearchIcon
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';

const Sidebar = () => {
	const spotifyApi = useSpotify();
	const { data: session, status } = useSession();
	const [ playlists, setPlaylists ] = useState([]);
	const [ playlistId, setPlaylistId ] = useRecoilState(playlistIdState);

	console.log('You picked playlist >>> ', playlistId);

	useEffect(
		() => {
			if (spotifyApi.getAccessToken()) {
				spotifyApi.getUserPlaylists().then((data) => {
					setPlaylists(data.body.items);
				});

				// spotifyApi.getPlaylist(playlistId).then((data) => {
				// 	console.log(data);
				// });
			}
		},
		[ session, spotifyApi ]
	);

	// console.log(playlists);

	return (
		<div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[14rem] hidden md:inline-flex">
			<div className="space-y-4">
				<button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
					<p>Logout</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<HomeIcon className="h-5 w-5" />
					<p>Home</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<SearchIcon className="h-5 w-5" />
					<p>Search</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<LibraryIcon className="h-5 w-5" />
					<p>Your Library</p>
				</button>
				<hr className="border-t-[0.1px] border-gray-900" />
				<button className="flex items-center space-x-2 hover:text-white">
					<PlusCircleIcon className="h-5 w-5" />
					<p>Create Playlist</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<HeartIcon className="h-5 w-5" />
					<p>Liked Songs</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<RssIcon className="h-5 w-5" />
					<p>Your episodes</p>
				</button>
				<hr className="border-t-[0.1px] border-gray-900" />

				{playlists.map((playlist) => (
					<p
						key={playlist.id}
						className="cursor-pointer hover:text-white"
						onClick={() => setPlaylistId(playlist.id)}
					>
						{playlist.name}
					</p>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
