export const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "judge",
				"type": "address"
			}
		],
		"name": "CaseAssignedJudge",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "lawyer",
				"type": "address"
			}
		],
		"name": "CaseAssignedLawyer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "police",
				"type": "address"
			}
		],
		"name": "CaseCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "hearingCount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "judgement",
				"type": "string"
			}
		],
		"name": "CaseUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "proofName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "proofCID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "submitter",
				"type": "address"
			}
		],
		"name": "ProofSubmitted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "judge",
				"type": "address"
			}
		],
		"name": "assignJudgeToCase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "lawyer",
				"type": "address"
			}
		],
		"name": "assignLawyerToCase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "enum CourtHearingSystem.Role",
				"name": "role",
				"type": "uint8"
			}
		],
		"name": "assignRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "cases",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "firDocumentCID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "judgement",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "hearingCount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "assignedJudge",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "assignedLawyer",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "firDocumentCID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "initialProofName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "initialProofCID",
				"type": "string"
			}
		],
		"name": "createCase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			}
		],
		"name": "getCase",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "caseId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "firDocumentCID",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "cid",
								"type": "string"
							}
						],
						"internalType": "struct CourtHearingSystem.Proof[]",
						"name": "proofs",
						"type": "tuple[]"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "judgement",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "hearingCount",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "assignedJudge",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "assignedLawyer",
						"type": "address"
					}
				],
				"internalType": "struct CourtHearingSystem.Case",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextCaseId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "proofName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "proofCID",
				"type": "string"
			}
		],
		"name": "submitProof",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "caseId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "hearingCount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "judgement",
				"type": "string"
			}
		],
		"name": "updateCase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userRoles",
		"outputs": [
			{
				"internalType": "enum CourtHearingSystem.Role",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]