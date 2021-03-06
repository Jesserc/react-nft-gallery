import "./nftcard.scss";
import {CopyToClipboard} from "react-copy-to-clipboard";

export const NFTCard = ({nft}) => {
	return (
		<div className="nft-card">
			<div className="nft-image">
				<img src={nft.media[0].gateway}></img>
			</div>
			<div className="nft-body">
				<div className="nft-title">
					<h2>{nft.title}</h2>
					<p>Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
					<div className="nft-address">
						<div className="details">
							<p>{`${nft.contract.address.substr(
								0,
								4
							)}...${nft.contract.address.substr(
								nft.contract.address.length - 4
							)}`}</p>
						</div>

						<div className="copy-btn">
							<CopyToClipboard
								className="btn"
								text={nft.contract.address}
								// onCopy={() => this.setState({copied: true})}
							>
								<button>Copy Address</button>
							</CopyToClipboard>
						</div>
					</div>
				</div>

				{/* <div className="nft-description">
					<p>{nft.description?.substr(0, 150)}</p>
				</div> */}
				<div className="etherscan-btn">
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
