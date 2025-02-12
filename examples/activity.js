require('dotenv').config()
const ParasSDK = require('../index')
const { parseNearAmount } = require('near-api-js/lib/utils/format')

const main = async () => {
	const parasSDK = new ParasSDK()

	await parasSDK.init(
		{
			networkId: 'default',
			nodeUrl: 'https://rpc.testnet.near.org',
			walletUrl: 'https://wallet.testnet.near.org',
			appName: 'Paras Testnet',
			contractName: parasSDK.CONTRACT_DEV,
			apiUrl: parasSDK.API_DEV,
		},
		{
			isServer: true,
		}
	)

	const cred = {
		account_id: process.env.ROOT_ACCOUNT_ID,
		public_key: process.env.ROOT_PUBLIC_KEY,
		private_key: process.env.ROOT_PRIVATE_KEY,
	}

	await parasSDK.login(cred)

	try {
		// possible query
		// const query = {
		//  _id: id,
		//  tokenId: tokenId,
		//  creatorId: creatorId,
		//  from: from,
		//  to: to,
		//  type: type,
		//  minPrice: minPrice,
		//  maxPrice: maxPrice,
		// }
		const query = {
            type: 'marketBuy',
            minPrice: parseNearAmount('0.1'),
            maxPrice: parseNearAmount('0.5'),
		}
		const res = await parasSDK.getActivity(query, 0, 10)
		console.log(res)
	} catch (err) {
		console.log(err)
	}
}

main()
