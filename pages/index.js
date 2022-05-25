import Sidebar from '../components/Sidebar';

export default function Home() {
	return (
		<div className="bg-black h-screen overflow-hidden font-sans">
			<main className="">
				<Sidebar />
				{/*Center*/}
			</main>
			<div>{/*Player*/}</div>
		</div>
	);
}
