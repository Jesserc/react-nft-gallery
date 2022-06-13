import {useState} from "react";
import {NFTCard} from "./components/NFTCard";
import "../styles/index.scss";
const Home = () => {
	const [wallet, setWalletAddress] = useState("");
	const [collection, setCollectionAddress] = useState("");
	const [NFTs, setNFTs] = useState([]);
	const [fetchForCollection, setFetchForCollection] = useState(false);

	const fetchNFTs = async () => {
		let nfts;
		console.log("fetching nfts");
		const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM";
		const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;

		if (!collection.length) {
			var requestOptions = {
				method: "GET",
			};

			const fetchURL = `${baseURL}?owner=${wallet}`;

			nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
		} else {
			console.log("fetching nfts for collection owned by address");
			const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
			nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
		}

		if (nfts) {
			console.log("nfts:", nfts);
			setNFTs(nfts.ownedNfts);
		}
	};

	const fetchNFTsForCollection = async () => {
		if (collection.length) {
			var requestOptions = {
				method: "GET",
			};
			const api_key = "d1GAutHvkWYkWqcW5T6sNrogHYQrhrua";
			const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
			const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
			const nfts = await fetch(fetchURL, requestOptions).then(data =>
				data.json()
			);
			if (nfts) {
				console.log("NFTs in collection:", nfts);
				setNFTs(nfts.nfts);
			}
		}
	};

	return (
		<div className="container">
			<div className="title-section">
				<h3>Ethereum NFT Gallery</h3>
			</div>
			<div className="search-section">
				<input
					className="input"
					disabled={fetchForCollection}
					onChange={e => {
						setWalletAddress(e.target.value);
					}}
					value={wallet}
					type={"text"}
					placeholder="Add your wallet address"
				></input>
				<input
					className="input"
					onChange={e => {
						setCollectionAddress(e.target.value);
					}}
					value={collection}
					type={"text"}
					placeholder="Add the collection address"
				></input>
				<div className="check-box-section">
					<label>
						<input
							className="check-box"
							onChange={e => {
								setFetchForCollection(e.target.checked);
							}}
							type={"checkbox"}
						></input>
						Fetch for collection
					</label>
					<button
						onClick={() => {
							if (fetchForCollection) {
								fetchNFTsForCollection();
							} else fetchNFTs();
						}}
					>
						Let's go!{" "}
					</button>
				</div>
			</div>
			<div className="nft-container">
				{NFTs.length &&
					NFTs.map(nft => {
						return <NFTCard nft={nft}></NFTCard>;
					})}
			</div>
		</div>
	);
};

export default Home;
