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

let BoxInstance;
let PizzaInstance;
let maxNewPurchases = 6000;
let priceInWei = 80000000000000000;
let walletAddress = 0;
let addresses = 0;
let ethPrice = 2045; // fallback (only used on v1 where pizza estimate were shown)
let metamaskInstalled = false;
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

// Unpkg imports
const Web3Modal = window.Web3Modal.default;
// const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;

// Web3modal instance
let web3Modal;

// Chosen wallet provider given by the dialog window
let provider;

// Address of the selected account
let selectedAccount;

let web3;

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

	const promptMetamask = async () => {
		// Metamask only
		// window.ethereum
		// 	.enable()
		// 	.then(async () => {
		// 		walletButton.innerHTML = "<center>Connected</center>";
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});

		// Web3Modal
		if (walletAddress == 0) {
			console.log("Opening a dialog", web3Modal);
			try {
				provider = await web3Modal.connect();
				provider.chainId != "0x1" ? alert(wrongNetworkMessage) : null;
				walletButton.innerHTML = "<center>Disconnect</center>";
				await startApp();
			} catch (e) {
				console.log("Wallet connection cancelled by user", e);
				return;
			}
		} else {
			console.log("Logging user out");

			// If the cached provider is not cleared,
			// WalletConnect will default to the existing session
			// and does not allow to re-scan the QR code with a new wallet.
			// Depending on your use case you may want or want not his behavir.
			await web3Modal.clearCachedProvider();
			console.log("clear cached");
			provider = null;
			walletAddress = 0;
			walletButton.innerHTML = "Connect Wallet";
		}
	};

	const triggerPurchase = () => {
		boxTxLabel.innerHTML = "Waiting for confirmation";
		hide(buyButton);
		//const gasPrice = 145;
		const gasLimit = 256 * 1000;
		let txHash = 0;
		let numberToMint = selectMintQuantity.value;
        web3.eth.getGasPrice().then((gasPrice)=>{
            BoxInstance.methods
			.multiPurchase(numberToMint)
			.send({
				from: walletAddress,
				value: priceInWei * numberToMint,
				gasPrice: web3.utils.toHex(gasPrice),
				gasLimit: web3.utils.toHex(gasLimit),
			})
			.on("transactionHash", (hash) => {
				console.log("transactionHash: ", hash);

				txHash = hash;
				display(buyButton);
			})
			.on("receipt", async (receipt) => {
				console.log("receipt: ", receipt);
				boxTxLabel.innerHTML = `Transaction confirmed, enjoy your 🍕! <p>
			              <a href='https://${NETWORK}etherscan.io/tx/${txHash}' target='_blank' class="link-81"> Transaction link </a> </p>`;
				await updateValues();
			})
			.on("error", (err, receipt) => {
				console.log("Transaction failed: ", err, "br/", receipt);

				if (err.code === 4001) {
					boxTxLabel.innerHTML = "Transaction rejected";
				} else {
					boxTxLabel.innerHTML = "Something went wrong, try again!";
				}
				display(buyButton);
			});
        })
		
	};

	const updateValues = async () => {
		// Checking total supplies
		BoxInstance.methods
			.totalSupply()
			.call()
			.then((amount) => {
				console.log("BoxInstance.totalSupply: ", amount);
				//boxesLabel.innerHTML = numberWithCommas(10000 - amount) // for prev versions
			})
			.catch((error) => {
				console.log("box totalSupply failed: ", error);
			});

		BoxInstance.methods
			.totalNewPurchases()
			.call()
			.then((amount) => {
				boxesLabel.innerHTML = numberWithCommas(maxNewPurchases - amount);
			})
			.catch((error) => {
				console.log("box totalNewPurchases failed: ", error);
			});

		PizzaInstance.methods
			.totalSupply()
			.call()
			.then((amount) => {
				console.log("PizzaInstance.totalSupply: ", amount);
				pizzasLabel.innerHTML = numberWithCommas(amount);
			})
			.catch((error) => {
				console.log("pizza totalSupply failed: ", error);
			});

		if (walletAddress != 0) {
			// Check number of boxes
			console.log("walletAddress: ", walletAddress);
			BoxInstance.methods
				.balanceOf(walletAddress)
				.call()
				.then(async (balance) => {
					console.log(walletAddress, " owns ", balance, "boxes");

					const boxes = [];
					const promises = [];

					for (let i = balance; i > 0; i--) {
						promises.push(
							BoxInstance.methods
								.tokenOfOwnerByIndex(
									walletAddress,
									web3.utils.toBN(balance - i)
								)
								.call()
								.then((boxId) => boxes.push(boxId))
						);
					}

					await Promise.all(promises);

					const results = await Promise.all(
						boxes.map((boxId) =>
							PizzaInstance.methods
								.isRedeemed(boxId)
								.call()
								.then((value) => !value)
						)
					);

					// clear out select box before we fill it again
					while (selectBox.options.length > 1) {
						// if it's the default select option, return
						if (!selectBox.options[0].value) {
							return;
						}

						selectBox.remove(0);
					}

					boxes
						.filter((_v, index) => results[index])
						.sort((a, b) => parseInt(a) - parseInt(b))
						.forEach((boxId) => {
							const boxOption = document.createElement("option");
							boxOption.setAttribute("value", boxId);
							boxOption.innerHTML = boxId;
							selectBox.add(boxOption);
						});
				})
				.catch((error) => {
					console.log("box balanceOf failed: ", error);
				});

			PizzaInstance.methods
				.balanceOf(walletAddress)
				.call()
				.then((balance) => {
					console.log(walletAddress, " owns ", balance, "pizzas");
				})
				.catch((error) => {
					console.log("pizza balanceOf failed: ", error);
				});
		}
	};

	const handleUser = async () => {
		console.log("handling user");

		await web3.eth
			.getAccounts()
			.then(async (accounts) => {
				addresses = accounts;

				if (!accounts.length) {
					walletButton.innerHTML = "<center>Connect Wallet</center>";
				} else {
					walletButton.innerHTML = "<center>Disconnect</center>";
					walletAddress = (await web3.eth.getAccounts())[0];
					console.log("User wallet: ", walletAddress);
				}
			})
			.catch((err) => {
				console.log("Error fetching accounts: ", err);
			});
	};

	const buyButtonHandler = () => {
		console.log("Buy button pressed");
		console.log("addresses.length: ", addresses.length);

		if (!addresses.length) {
			promptMetamask();
		} else {
			triggerPurchase();
		}
	};

	const checkButtonHandler = () => {
		console.log("Check button pressed");

		if (!addresses.length) {
			console.log("prompting metamask");
			promptMetamask();
		} else {
			console.log("checking redeemed: ", boxIdField.value);
			if (boxIdField.value < 0 || boxIdField.value > 9999) {
				boxCheckLabel.innerHTML = "Box does not exist!";
			} else {
				PizzaInstance.methods
					.isRedeemed(boxIdField.value)
					.call()
					.then((value) => {
						console.log("isRedeemed: ", value);
						if (value) {
							boxCheckLabel.innerHTML = "Box was already opened!";
						} else {
							boxCheckLabel.innerHTML = "Box is still closed!";
						}
					})
					.catch((error) => {
						boxCheckLabel.innerHTML = "Error: " + error;
						console.log("isRedeemed failed: ", error);
					});
			}
		}
	};

	const bakePieHandler = async () => {
		console.log("Bake pie button pressed");
		if (selectBox.options.length > 1) {
			await handleUser();

			if (!addresses.length) {
				console.log("prompting metamask");
				promptMetamask();
			} else if (selectBox.value) {
				console.log("selectBox.value: ", selectBox.value);
				pizzaTxLabel.innerHTML = "Waiting for confirmation";
				console.log("Trying to bake");
				console.log("parseFloat boxId", parseFloat(selectBox.value));
				PizzaInstance.methods
					.redeemRarePizzasBox(
						parseFloat(selectBox.value),
						parseFloat(selectRecipe.value)
					)
					.send({ from: walletAddress })
					.on("transactionHash", (hash) => {
						console.log("transactionHash: ", hash);

						txHash = hash;
						display(buyButton);
					})
					.on("receipt", async (receipt) => {
						console.log("receipt: ", receipt);

						pizzaWarning.innerHTML = `Transaction confirmed, enjoy your 🍕! <p>
			           <a href='https://${NETWORK}etherscan.io/tx/${txHash}' target='_blank'> Transaction link </a> </p>`;

						await updateValues();
					})
					.on("error", (err, receipt) => {
						console.log("Transaction failed: ", err, "br/", receipt);

						if (err.code === 4001) {
							pizzaTxLabel.innerHTML = "Transaction rejected";
						} else {
							pizzaTxLabel.innerHTML = "Something went wrong, try again!";
						}
						display(buyButton);
					});
			} else {
				pizzaTxLabel.innerHTML = "Select the box you want to open";
			}
		}
	};

	const walletButtonHandler = () => {
		console.log("Wallet button pressed");
		// Metamask only
		// if (metamaskInstalled) {
		// 	promptMetamask();
		// } else {
		// 	window.open("https://www.metamask.io");
		// }

		// Web3Modal
		promptMetamask();
	};

	const startApp = async () => {
		console.log("APP STARTING");
		// Web3Modal additions start
		web3 = new Web3(provider);

		// Subscribe to accounts change
		provider.on("accountsChanged", (accounts) => {
			console.log("accounts: ", accounts);
			updateValues();
			handleUser();
		});

		// Subscribe to chainId change
		provider.on("chainChanged", (chainId) => {
			console.log("chainId changed: ", chainId);
			updateValues();
			handleUser();
		});

		// Subscribe to networkId change
		provider.on("networkChanged", (networkId) => {
			console.log("networkId changed: ", networkId);
			provider.chainId != "0x1" ? alert(wrongNetworkMessage) : null;
			updateValues();
			handleUser();
		});
		// Web3Modal additions end

		BoxInstance = new web3.eth.Contract(BOX_ABI, BOX_ADDRESS);
		PizzaInstance = new web3.eth.Contract(PIZZA_ABI, PIZZA_ADDRESS);

		BoxInstance.events
			.Transfer((err, e) => {
				console.log(e);
			})
			.on("data", async (e) => {
				console.log("event: ", e);
				await updateValues();
			})
			.on("changed", (i) => {
				console.log("changed: ", i);
			})
			.on("error on Transfer", console.error);

		await handleUser();
		await updateValues();
	};

	const initWeb3 = () => {
		// Metamask only
		// if (window.ethereum) {
		// 	console.log("Window.ethereum exists");

		// 	metamaskInstalled = true;
		// 	window.web3 = new Web3(window.ethereum);

		// 	startApp();
		// } else if (window.web3) {
		// 	console.log("Window.web3 exists");

		// 	metamaskInstalled = true;
		// 	window.web3 = new Web3(window.web3.currentProvider);

		// 	startApp();
		// } else if (isMobile) {
		// 	console.log("Mobile initiated");

		// 	metamaskInstalled = true;
		// 	startApp();
		// } else {
		// 	console.log("Non-ethereum browser detected");

		// 	window.alert("Browser not compatible. Try Chrome and MetaMask!");

		// 	alert("Try Chrome and MetaMask!");
		// 	metamaskInstalled = false;
		// }

		// Web3Modal

		console.log("Initializing example");
		// console.log("WalletConnectProvider is", WalletConnectProvider);
		console.log("Fortmatic is", Fortmatic);
		console.log(
			"window.web3 is",
			window.web3,
			"window.ethereum is",
			window.ethereum
		);

		// Check that the web page is run in a secure context,
		// as otherwise MetaMask won't be available
		// if (location.protocol !== "https:") {
		// 	// https://ethereum.stackexchange.com/a/62217/620
		// 	window.alert("Use https!");
		// 	// TO-DO: Disable connect/buy button
		// 	// const alert = document.querySelector("#alert-error-https");
		// 	// alert.style.display = "block";
		// 	// document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
		// 	return;
		// }

		// Tell Web3modal what providers we have available.
		// Built-in web browser provider (only one can exist as a time)
		// like MetaMask, Brave or Opera is added automatically by Web3modal
		const providerOptions = {

			//wallet connect provider depreceated
			// walletconnect: {
			// 	package: WalletConnectProvider,
			// 	options: {
			// 		infuraId: "19ccc986a817478881bf060e6104402f",
			// 	},
			// },

			fortmatic: {
				package: Fortmatic,
				options: {
					key: "pk_live_38D9CE8398A2E562",
				},
			},

			portis: {
				package: Portis, // required
				options: {
					id: "2e2f473c-69d4-4c15-bc0b-63b81124630c", // required
				},
			},

			authereum: {
				package: Authereum, // required
			},

			torus: {
				package: Torus, // required
				// options: {
				//   networkParams: {
				//     host: "https://localhost:8545", // optional
				//     chainId: 1337, // optional
				//     networkId: 1337 // optional
				//   },
				//   config: {
				//     buildEnv: "development" // optional
				//   }
				//}
			},

			// mewconnect: {
			//   package: MewConnect, // required
			//   options: {
			//     infuraId: "8043bb2cf99347b1bfadfb233c5325c0" // required
			//   }
			// },
			//
			// frame: {
			//   package: ethProvider // required
			// }
		};

		web3Modal = new Web3Modal({
			cacheProvider: true, // optional
			providerOptions, // required
			disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
		});

		console.log("Web3Modal instance is", web3Modal);
	};

	initWeb3();

	walletButton.addEventListener("click", walletButtonHandler);
	buyButton.addEventListener("click", buyButtonHandler);
	checkButton.addEventListener("click", checkButtonHandler);
	bakePie.addEventListener("click", bakePieHandler);

	// Metamask only
	// // detect account change
	// window.ethereum.on("accountsChanged", function (accounts) {
	// 	console.log("accountsChanges", accounts);
	// });

	// // detect network change
	// window.ethereum.on("chainChanged", function (chainId) {
	// 	console.log("chainChanged", chainId);
	// });
};

window.addEventListener("load", onLoadHandler, { once: true });