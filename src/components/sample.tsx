"use client";

import { useCallback, useEffect, useState } from "react";
import { RpcProvider, constants } from "starknet";
import { ArgentWebWallet, deployAndExecuteWithPaymaster, SessionAccountInterface } from "@argent/webwallet-sdk";

const ARGENT_DUMMY_CONTRACT_ADDRESS = "0x07557a2fbe051e6327ab603c6d1713a91d2cfba5382ac6ca7de884d3278636d7";
const ARGENT_DUMMY_CONTRACT_ENTRYPOINT = "increase_number";

const provider = new RpcProvider({});

const argentWebWallet = ArgentWebWallet.init({
	appName: "Test",
	environment: "sepolia",
	sessionParams: {
		allowedMethods: [
			{
				contract: ARGENT_DUMMY_CONTRACT_ADDRESS,
				selector: ARGENT_DUMMY_CONTRACT_ENTRYPOINT,
			},
		],
	},
	// paymasterParams: {
	//    apiKey: "" // avnu paymasters API Key
	// },
});

export default function Home() {
	const [account, setAccount] = useState<SessionAccountInterface | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);
	const [txHash, setTxHash] = useState<string | undefined>();
	const [counter, setCounter] = useState<bigint | undefined>();

	useEffect(() => {
		argentWebWallet
			.connect()
			.then((res) => {

				if (!res) {
					console.log("Not connected");
					return;
				}

				console.log("Connected to Argent Web Wallet", res);
				const { account, callbackData, approvalTransactionHash } = res;

				if (account.getSessionStatus() !== "VALID") {
					console.log("Session is not valid");
					return;
				}

				setAccount(account);
				console.log("Callback data", callbackData); // -- custom_callback_string
				console.log("Approval transaction hash", approvalTransactionHash); // -- custom_callback_string
			})
			.catch((err) => {
				console.error("Failed to connect to Argent Web Wallet", err);
			});
	}, []);

	const fetchCounter = useCallback(async (account?: SessionAccountInterface) => {
		if (!account) {
			return BigInt(0);
		}

		const [counter] = await provider.callContract({
			contractAddress: ARGENT_DUMMY_CONTRACT_ADDRESS,
			entrypoint: "get_number",
			calldata: [account?.address],
		});
		return BigInt(counter);
	}, []);

	const handleConnect = async () => {
		try {
			const response =  await argentWebWallet.requestConnection({
				callbackData: "custom_callback_data",
				approvalRequests: [
					{
						tokenAddress: "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
						amount: BigInt("100000000000000000").toString(),
						// Your dapp contract
						spender: "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a",
					},
				],
			});

			if (response) {
				const { account: sessionAccount } = response

				if (response.deploymentPayload) {
					console.log("Deploying an account");
					const isDeployed = await sessionAccount.isDeployed()

					if (!isDeployed && response.approvalRequestsCalls) {
						setConnectStatus("Deploying account")

						// @note If you're not willing to sponsor deployment, notify user to fund his wallet
						const resp = await deployAndExecuteWithPaymaster(sessionAccount, paymasterParams, response.deploymentPayload, response.approvalRequestsCalls)

						if (resp) {
							console.log("Deployment hash: ", resp.transaction_hash);

							await provider.waitForTransaction(resp.transaction_hash)

							console.log("Account deployed");
						}

					} else {
						console.log("Account already deployed");
					}
				}

				setAccount(sessionAccount);
			} else {
				console.log("requestConnection response is undefined");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleSubmitTransactionButton = async () => {
		try {
			if (!account) {
				throw new Error("Account not connected");
			}
			setIsLoading(true);

			const call = {
				contractAddress: ARGENT_DUMMY_CONTRACT_ADDRESS,
				entrypoint: ARGENT_DUMMY_CONTRACT_ENTRYPOINT,
				calldata: ["0x1"],
			};

			const { resourceBounds: estimatedResourceBounds } = await account.estimateInvokeFee(call, {
				version: "0x3",
			});

			const resourceBounds = {
				...estimatedResourceBounds,
				l1_gas: {
					...estimatedResourceBounds.l1_gas,
					max_amount: "0x28",
				},
			};

			const { transaction_hash } = await account.execute(call, {
				version: "0x3",
				resourceBounds,
			});
			setTxHash(transaction_hash);

			// Wait for transaction to be mined
			await account.waitForTransaction(transaction_hash);
			setIsLoading(false);

			// refetch counter
			const newCounter = await fetchCounter(account);
			setCounter(newCounter);
			setTxHash(undefined);

		} catch (err) {
			console.error(err);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCounter(account).then(setCounter);
	}, [account, fetchCounter]);

	const truncateHex = (hex: string) => `${hex.slice(0, 6)}...${hex.slice(-4)}`;

	return (
		<div>
			{!account && (
				<button onClick={handleConnect} disabled={isLoading}>
					Connect
				</button>
			)}

			{account && (
				<>
					<div>
						<div>{account.address}</div>
						<button onClick={handleSubmitTransactionButton} disabled={isLoading}>
							Send tx
						</button>
					</div>
					<div>
						{txHash && (<p>
							Transaction hash:{" "}
							<a href={`https://sepolia.starkscan.co/tx/${txHash}`} target="_blank">
								<code>{truncateHex(txHash)}</code>
							</a>
						</p>)}
						{counter !== undefined && (
							<p>Counter value: <code>{counter.toString()}</code></p>
						)}
					</div>
				</>
			)}
		</div>
	);
}