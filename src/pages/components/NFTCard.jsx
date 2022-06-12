import "./nftcard.scss";

export const NFTCard = ({nft}) => {
	return (
		<div className="nft-card">
			<div className="nft-image">
				<img src={nft.media[0].gateway}></img>
			</div>
			<div>
				<div className="">
					<h2>{nft.title}</h2>
					<p>Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
					<p>{`${nft.contract.address.substr(
						0,
						4
					)}...${nft.contract.address.substr(
						nft.contract.address.length - 4
					)}`}</p>
				</div>

				<div>
					<p>{nft.description?.substr(0, 150)}</p>
				</div>
				<div>
					<a
						target={"_blank"}
						href={`https://etherscan.io/token/${nft.contract.address}`}
					>
						View on etherscan
					</a>
				</div>
			</div>
		</div>
	);
};
