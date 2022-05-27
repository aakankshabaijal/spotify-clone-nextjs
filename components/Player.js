import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import { useState, useEffect, useCallback } from 'react';
import { SwitchHorizontalIcon, HeartIcon, VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { RewindIcon, FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { debounce } from 'lodash';

function Player() {
	const spotifyApi = useSpotify();
	const { data: session, status } = useSession();
	const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);
	const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState);
	const [ volume, setVolume ] = useState(50);

	const songInfo = useSongInfo();

	const fetchCurrentSong = () => {
		if (!songInfo) {
			spotifyApi.getMyCurrentPlayingTrack().then((data) => {
				if (data.body) {
					console.log('Now Playing', data.body.item);
					setCurrentTrackId(data.body.item.id);

					spotifyApi.getMyCurrentPlaybackState().then((data) => {
						setIsPlaying(data.body.is_playing);
					});
				}
			});
		}
	};

	const handlePlayPause = () => {
		spotifyApi.getMyCurrentPlaybackState().then((data) => {
			if (data.body.is_playing) {
				spotifyApi.pause();
				setIsPlaying(false);
			}
			else {
				spotifyApi.play();
				setIsPlaying(true);
			}
		});
	};

	const debouncedAdjustVolume = useCallback(
		debounce((volume) => {
			spotifyApi.setVolume(volume).catch((err) => {});
		}, 500),
		[]
	);

	useEffect(
		() => {
			if (spotifyApi.getAccessToken() && !currentTrackId) {
				//fetch song info
				fetchCurrentSong();
				setVolume(50);
			}
		},
		[ currentTrackId, spotifyApi, session ]
	);

	useEffect(
		() => {
			if (volume > 0 && volume < 100) {
				debouncedAdjustVolume(volume);
			}
		},
		[ volume ]
	);

	let songImg;
	let songName;
	let artistName;
	if (songInfo && songInfo.album && songInfo.album.images) {
		songImg = songInfo.album.images[0].url;
		songName = songInfo.name;
		artistName = songInfo.artists[0].name;
	}

	return (
		<div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-sm px-2 md:px-8">
			{/* Left */}
			<div className="flex items-center space-x-4 ">
				<img className="hidden md:inline h-10 w-10" src={songImg} alt="" />
				<div>
					<h3>{songName}</h3>
					<p>{artistName}</p>
				</div>
			</div>

			{/* Center */}
			<div className="flex items-center justify-evenly">
				<SwitchHorizontalIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
				<RewindIcon
					className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
					onClick={() => spotifyApi.skipToPrevious()}
				/>
				{isPlaying ? (
					<PauseIcon
						className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
						onClick={handlePlayPause}
					/>
				) : (
					<PlayIcon
						className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
						onClick={handlePlayPause}
					/>
				)}

				<FastForwardIcon
					className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
					onClick={() => spotifyApi.skipToNext()}
				/>
				<ReplyIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
			</div>

			{/* Right */}

			<div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
				<VolumeDownIcon
					className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
					onClick={() => volume > 0 && setVolume(volume - 10)}
				/>
				<input
					type="range"
					value={volume}
					min={0}
					max={100}
					className="w-14 md:w-28"
					onChange={(e) => setVolume(Number(e.target.value))}
				/>
				<VolumeUpIcon
					className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
					onClick={() => volume < 100 && setVolume(volume + 10)}
				/>
			</div>
		</div>
	);
}

export default Player;
