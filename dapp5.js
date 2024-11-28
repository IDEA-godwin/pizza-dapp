
import {
	createAppKit,
	WagmiAdapter,
	Viem,
	networks
 } from 'https://cdn.jsdelivr.net/npm/@reown/appkit-cdn@1.3.0/dist/appkit.js'
 import { 
	reconnect, http, getAccount, 
	readContracts, writeContract,
	waitForTransactionReceipt,
	watchContractEvent,
	watchAccount
} from 'https://esm.sh/@wagmi/core@2.x'

const NETWORK = "";
const BOX_ADDRESS = "0x4ae57798aef4af99ed03818f83d2d8aca89952c7";
const PIZZA_ADDRESS = "0xe6616436ff001fe827e37c7fad100f531d0935f0";
const MULTISIG_ADDRESS = "0xBA5E28a2D1C8cF67Ac9E0dfc850DC8b7b21A4DE2";
const BOX_ABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "approved",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address",
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool",
			},
		],
		name: "ApprovalForAll",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "old",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "current",
				type: "uint256",
			},
		],
		name: "BTCETHPriceUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "a",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "n",
				type: "uint256",
			},
		],
		name: "Gift",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "artworkURI",
				type: "uint256",
			},
		],
		name: "InternalArtworkAssigned",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [],
		name: "PresaleAllowedUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "old",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "current",
				type: "uint256",
			},
		],
		name: "SaleStartTimestampUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldConsumer",
				type: "address",
			},
			{
				indexed: false,
				internalType: "address",
				name: "newConsumer",
				type: "address",
			},
		],
		name: "VRFConsumerUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "claimCompleted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "claimStarted",
		type: "event",
	},
	{
		inputs: [],
		name: "MAX_MINTABLE_SUPPLY",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "MAX_PURCHASABLE_SUPPLY",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "MAX_TOKEN_SUPPLY",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "_minted_pizza_count",
		outputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "_purchased_pizza_count",
		outputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "_uriBase",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "approve",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "owner", type: "address" }],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "batchMintCount",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "batchMintRandom",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "bitcoinPriceInWei",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "claim",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "claimWhiteList",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "claimed",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		name: "claims",
		outputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "contractURI",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "finishBatchMint",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "request", type: "uint256" },
			{ internalType: "uint256[]", name: "random", type: "uint256[]" },
		],
		name: "fulfillRandomWords",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes32", name: "request", type: "bytes32" },
			{ internalType: "uint256", name: "random", type: "uint256" },
		],
		name: "fulfillRandomness",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "getApproved",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getBitcoinPriceInWei",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getPrice",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getPriceInWei",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "toPizzaiolo", type: "address" },
			{ internalType: "uint256", name: "count", type: "uint256" },
		],
		name: "gift",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "chainlinkBTCETHFeed",
				type: "address",
			},
		],
		name: "initialize",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "operator", type: "address" },
		],
		name: "isApprovedForAll",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "maxNewPurchases",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "maxSupply",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "toPizzaiolo", type: "address" },
			{ internalType: "uint8", name: "count", type: "uint8" },
		],
		name: "mint",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "n", type: "uint256" }],
		name: "multiPurchase",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "multiPurchaseLimit",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "ownerOf",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
			{ internalType: "uint256", name: "n", type: "uint256" },
		],
		name: "prePurchase",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "preSaleWhitelist",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "price",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "publicSaleStart_timestampInS",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "purchase",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "toPaisano", type: "address" }],
		name: "purchaseTo",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
			{ internalType: "bytes", name: "_data", type: "bytes" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "operator", type: "address" },
			{ internalType: "bool", name: "approved", type: "bool" },
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "n", type: "uint256" }],
		name: "setMaxNewPurchases",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint8", name: "count", type: "uint8" },
			{
				internalType: "address[]",
				name: "toPaisanos",
				type: "address[]",
			},
		],
		name: "setPresaleAllowed",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "epochSeconds", type: "uint256" },
		],
		name: "setSaleStartTimestamp",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes32", name: "b", type: "bytes32" }],
		name: "setSaleWhitelist",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "consumer", type: "address" }],
		name: "setVRFConsumer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes32", name: "b", type: "bytes32" }],
		name: "setclaimWhiteList",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "n", type: "uint256" }],
		name: "setmultiPurchaseLimit",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address[]", name: "users", type: "address[]" },
			{ internalType: "uint256", name: "count", type: "uint256" },
		],
		name: "startBatchMint",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "status",
		outputs: [
			{
				internalType: "enum RarePizzasBoxV3Fix.batchMintStatus",
				name: "",
				type: "uint8",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
		name: "tokenByIndex",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "uint256", name: "index", type: "uint256" },
		],
		name: "tokenOfOwnerByIndex",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "tokenURI",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalNewPurchases",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "fallbackValue", type: "uint256" },
		],
		name: "updateBitcoinPriceInWei",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "withdraw",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
const PIZZA_ABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "approved",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address",
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool",
			},
		],
		name: "ApprovalForAll",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "bytes32",
				name: "artworkURI",
				type: "bytes32",
			},
		],
		name: "InternalArtworkAssigned",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "previous",
				type: "address",
			},
			{
				indexed: false,
				internalType: "address",
				name: "current",
				type: "address",
			},
		],
		name: "OrderAPIClientUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "previous",
				type: "address",
			},
			{
				indexed: false,
				internalType: "address",
				name: "current",
				type: "address",
			},
		],
		name: "RarePizzasBoxContractUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "state",
				type: "bool",
			},
		],
		name: "SaleActive",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{
		inputs: [],
		name: "_uriBase",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "boxTokenId", type: "uint256" }],
		name: "addressOfRedeemer",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "approve",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "owner", type: "address" }],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "contractURI",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes32", name: "request", type: "bytes32" },
			{ internalType: "bytes32", name: "result", type: "bytes32" },
		],
		name: "fulfillResponse",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "getApproved",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "rarePizzasBoxContract",
				type: "address",
			},
		],
		name: "initialize",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "operator", type: "address" },
		],
		name: "isApprovedForAll",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "boxTokenId", type: "uint256" }],
		name: "isRedeemed",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "ownerOf",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "boxTokenId", type: "uint256" },
			{ internalType: "uint256", name: "recipeId", type: "uint256" },
		],
		name: "redeemRarePizzasBox",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
			{ internalType: "bytes", name: "_data", type: "bytes" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "saleIsActive",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "operator", type: "address" },
			{ internalType: "bool", name: "approved", type: "bool" },
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "string", name: "URI", type: "string" }],
		name: "setContractURI",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "orderAPIClient",
				type: "address",
			},
		],
		name: "setOrderAPIClient",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
			{ internalType: "bytes32", name: "artworkURI", type: "bytes32" },
		],
		name: "setPizzaArtworkURI",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "boxContract", type: "address" }],
		name: "setRarePizzasBoxContract",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "toggleSaleIsActive",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
		name: "tokenByIndex",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "uint256", name: "index", type: "uint256" },
		],
		name: "tokenOfOwnerByIndex",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "tokenURI",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "withdraw",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

const pizzaContract = {
	address: PIZZA_ADDRESS,
	abi: PIZZA_ABI
} 

const boxContract = {
	address: BOX_ADDRESS,
	abi: BOX_ABI
} 

let account;
let maxNewPurchases = 6000n;
let price = 0.08;
let walletAddress = 0;
let addresses = 0;
let ethPrice = 2045; // fallback (only used on v1 where pizza estimate were shown)
let saleStart = 0;
let inActivePurchase = false;
let wrongNetworkMessage = "Change to ETH mainnet to use this dapp 🍕";

// Helpers
const numberWithCommas = (x) =>
	x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const isMobile = () =>
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
const hide = (element) => {
	console.log("disabling element");
	inActivePurchase = true;
	element.style.pointerEvents = "none";
	element.style.borderColor = "#303436";
};
const display = (element) => {
	console.log("enabling element");
	inActivePurchase = false;
	element.style.pointerEvents = "auto";
	element.style.borderColor = "#ffcf55";
};

// Web3modal instance
let appkitModal;

const onLoadHandler = () => {
	// Loading UI components
	const walletButton = document.querySelector("#walletButton");
	const boxesLabel = document.querySelector("#boxesLabel");
	const pizzasLabel = document.querySelector("#pizzasLabel");
	const selectMintQuantity = document.querySelector("#selectionMintQuantity");
	const buyButton = document.querySelector("#buyButton");
	const boxTxLabel = document.querySelector("#boxTxLabel");
	const pizzaTxLabel = document.querySelector("#pizzaTxLabel");
	const boxIdField = document.querySelector("#BoxID");
	const checkButton = document.querySelector("#checkButton");
	const boxCheckLabel = document.querySelector("#boxCheckLabel");
	const disabledOrder = document.querySelector("#disabledOrder");
	const selectBox = document.querySelector("#selectBox");
	const selectRecipe = document.querySelector("#selectRecipe");
	const bakePie = document.querySelector("#bakePie");
	const pizzaWarning = document.querySelector("#pizzaWarning");
	const boxContractLabel = document.querySelector("#boxContractLabel");
	const pizzaContractLabel = document.querySelector("#pizzaContractLabel");
	boxContractLabel.innerHTML = `<a href='https://${NETWORK}etherscan.io/address/${BOX_ADDRESS}' target='_blank' class="link-83">${BOX_ADDRESS}</a>`;
	pizzaContractLabel.innerHTML = `<a href='https://${NETWORK}etherscan.io/address/${PIZZA_ADDRESS}' target='_blank' class="link-83">${PIZZA_ADDRESS}</a>`;

	const buyButtonHandler = async () => {
		console.log("Buy button pressed");
		if (!appkitModal.getWalletProviderType()) {
			appkitModal.open()
			return
		}
		
		boxTxLabel.innerHTML = "Waiting for confirmation";
		hide(buyButton);
		//const gasPrice = 145;
		const gasLimit = 256 * 1000;
		let txHash = 0;
		let numberToMint = selectMintQuantity.value;

		try {
			const { parseEther } = Viem
			const config = appkitModal.adapter.wagmiConfig
			const result = await writeContract(config, {
				...boxContract,
				functionName: 'multiPurchase',
				args: [numberToMint],
				value: parseEther("" + (price * numberToMint))
			})
			display(buyButton);
			const reciept = await waitForTransactionReceipt(config, {
				hash: result,
			})
			boxTxLabel.innerHTML = `Transaction confirmed, enjoy your 🍕! <p>
						  <a href='https://${NETWORK}etherscan.io/tx/${result}' target='_blank' class="link-81"> Transaction link </a> </p>`;
			await updateValues_v2()
		} catch (e) {
			display(buyButton);
			console.log(e.details)
			console.log("Transaction failed: ", e);
			if (e.code === 4001) {
				boxTxLabel.innerHTML = "Transaction rejected";
			} else {
				boxTxLabel.innerHTML = e.details ? e.details : "Something went wrong, try again!";
			}
		}

	};

	const bakePieHandler = async () => {
		console.log("Bake pie button pressed");
		if (!appkitModal.getWalletProviderType()) {
			appkitModal.open()
			return
		}

		if(selectBox.options.length <= 1 || !selectBox.value) {
			pizzaTxLabel.innerHTML = "Select the box you want to open";
			pizzaTxLabel.style.color = 'red'
			return
		}
		
		console.log("selectBox.value: ", selectBox.value);
		pizzaTxLabel.innerHTML = "Waiting for confirmation";
		console.log("Trying to bake");
		console.log("parseFloat boxId", parseFloat(selectBox.value));

		try {
			const config = appkitModal.adapter.wagmiConfig
			const result = await writeContract(config, {
				...pizzaContract,
				functionName: 'redeemRarePizzasBox',
				args: [parseFloat(selectBox.value), parseFloat(selectRecipe.value)],
			})
			display(buyButton);
			const reciept = await waitForTransactionReceipt(config, {
				hash: result,
			})
			boxTxLabel.innerHTML = `Transaction confirmed, enjoy your 🍕! <p>
						  <a href='https://${NETWORK}etherscan.io/tx/${result}' target='_blank' class="link-81"> Transaction link </a> </p>`;
			boxTxLabel.style.color = 'green'
			await updateValues_v2()
		} catch (e) {
			display(buyButton);
			console.log(e.details)
			console.log("Transaction failed: ", e);
			if (e.code === 4001) {
				boxTxLabel.innerHTML = "Transaction rejected";
			} else {
				boxTxLabel.innerHTML = e.details ? e.details : "Something went wrong, try again!";
			}
		}
	};

	const checkButtonHandler = async () => {
		console.log("Check button pressed");
		if (!appkitModal.getWalletProviderType()) {
			appkitModal.open()
			return
		}

		if(!boxIdField.value) return;
		
		let value = Number.parseInt(boxIdField.value)
		console.log("checking redeemed: ", value);
		if (value < 0 || value > 9999) {
			boxCheckLabel.innerHTML = "Box does not exist!";
			boxCheckLabel.style.color = 'red';
			return
		} 

		try {
			const config = appkitModal.adapter.wagmiConfig
			const [redeemed] = await readContracts(config, {
				contracts: [
					{
						...pizzaContract,
						functionName: 'isRedeemed',
						args: [value],
					}
				]
			})
			console.log(redeemed)
			if (redeemed.result) {
				boxCheckLabel.innerHTML = "Box has been opened!";
			} else {
				boxCheckLabel.innerHTML = "Box is still closed!";
			}
		} catch (e) {
			boxCheckLabel.innerHTML = "Error: " + e;
			console.log("isRedeemed failed: ", e);
		}

		
	};

	const evaluateBoxes = async balance => {
		const config = appkitModal.adapter.wagmiConfig

		if(balance < 1) return

		let contracts = Array.from(Array(balance), (_, index) => ({
			...boxContract,
			functionName: 'tokenOfOwnerByIndex',
			args: [account?.address, index]
		}))

		let boxIds = await readContracts(config, { contracts })

		let contracts_pizza = await readContracts(config, {
			contracts: boxIds.map(id => ({
				...pizzaContract,
				functionName: 'isRedeemed',
				args: [id]
			}))
		})

		// clear out select box before we fill it again
		while (selectBox.options.length > 1) {
			// if it's the default select option, return
			if (!selectBox.options[0].value) {
				return;
			}

			selectBox.remove(0);
		}

		boxIds
			.filter((_v, index) => contracts_pizza[index])
			.sort((a, b) => parseInt(a) - parseInt(b))
			.forEach((boxId) => {
				const boxOption = document.createElement("option");
				boxOption.setAttribute("value", boxId);
				boxOption.innerHTML = boxId;
				selectBox.add(boxOption);
			});
	}

	const updateValues_v2 = async () => {
		const [pizzaBal, pizzaSupply, boxBal, boxSupply, boxPurchases] = await readContracts(appkitModal.adapter.wagmiConfig, {
			contracts: [
				{
					...pizzaContract,
					functionName: 'balanceOf',
					args: [account?.address]
				},
				{
					...pizzaContract,
					functionName: 'totalSupply'
				},
				{
					...boxContract,
					functionName: 'balanceOf',
					args: [account?.address]
				},
				{
					...boxContract,
					functionName: 'totalSupply'
				},
				{
					...boxContract,
					functionName: 'totalNewPurchases'
				},
			]
		})

		console.log("Box total Supply: ", boxSupply.result);
		//boxesLabel.innerHTML = numberWithCommas(10000 - amount) // for prev versions
		console.log(account?.address, " owns ", pizzaBal.result, "pizzas");
		pizzasLabel.innerHTML = numberWithCommas(pizzaSupply.result);
		boxesLabel.innerHTML = numberWithCommas(maxNewPurchases - boxPurchases.result);
		console.log(account?.address, " owns ", boxBal.result, "boxes");
		evaluateBoxes(boxBal.result)
	}

	const connected = async () => {
		walletButton.innerHTML = "<center>Disconnect</center>"
		console.log(appkitModal.adapter)
		const config = appkitModal.adapter.wagmiConfig
		account = getAccount(config)
		await updateValues_v2()

		const unwatch = watchContractEvent(config, {
			BOX_ABI,
			eventName: 'Transfer', 
			onLogs(logs) {
			  console.log('Logs changed!', logs)
			  updateValues_v2().then()
			},
		 })

		const unWatchAcct = watchAccount(config,  {
			async onChange(_prev, _curr) {
				account = getAccount(config)
				await updateValues_v2()
			} 
		})
		
	}

	const initWeb3 = async () => {

		console.log("Initializing example");
		// console.log(
		// 	"window is", window,
		// 	"window.web3 is", window.web3,
		// 	"window.ethereum is", window.ethereum,
		// );

		const projectId = "5c273bafcd34bc0b510415376e6b1a36"
		const networkList = [ networks.mainnet ]

		try {
			const { createClient } = Viem
			const wagmiAdapter = new WagmiAdapter({
				projectId,
				networks: networkList,
				client({ chain }) {
					return createClient({ chain, transport: http() })
				},
			})

			appkitModal = createAppKit({
				adapters: [wagmiAdapter],
				networks: networkList,
				projectId,
				metadata: {
				  name: 'PizzaDao Dapp',
				  description: 'Pizza dao implementation of walletconnect',
				  url: 'https://pizzadao.xyz',
				  icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4']
				},
				features: {
					email: false,
					socials: [],
				 }
			})
			await reconnect(wagmiAdapter.wagmiConfig)
			if (appkitModal.getWalletProviderType()) {
				await connected()
			}
		} catch (e) {
			console.error('Error creating or using modal:', e)
		}
	};

	initWeb3();

	appkitModal?.subscribeEvents(async e => {
		const { event } = e.data
		if (event === 'CONNECT_SUCCESS') await connected()
	})

	walletButton.addEventListener("click", () => {
		console.log("Wallet button pressed");
		if (walletButton.innerHTML.includes('Dis')) {
			appkitModal.adapter?.connectionControllerClient?.disconnect()
				.then(() => {
					walletButton.innerHTML = "<center>Connect Wallet</center>";
				})
		} else appkitModal.open()
	});

	buyButton.addEventListener("click", buyButtonHandler);
	checkButton.addEventListener("click", checkButtonHandler);
	bakePie.addEventListener("click", bakePieHandler);
};

window.addEventListener("load", onLoadHandler, { once: true });