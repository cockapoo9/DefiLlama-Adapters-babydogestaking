const sdk = require('@defillama/sdk');

const stakingContract = '0xA6d3C6bdBfd6b0504Ca469d932A849aA12f68a43';

const abi = [
    {
        "inputs": [],
        "name": "contractBalance",
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
        "inputs": [],
        "name": "stakingToken",
        "outputs": [
            {
                "internalType": "contract IERC20Upgradeable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

async function staking(timestamp, block, chainBlocks) {
    const balances = {};

    const contractBalanceRes = await sdk.api.abi.call({
        abi: abi[0],
        target: stakingContract,
        chain: 'bsc',
        block: chainBlocks.bsc,
    });

    const stakingTokenRes = await sdk.api.abi.call({
        abi: abi[1],
        target: stakingContract,
        chain: 'bsc',
        block: chainBlocks.bsc,
    });

    const stakedAmount = contractBalanceRes.output;
    const tokenAddress = stakingTokenRes.output;

    sdk.util.sumSingleBalance(balances, `bsc:${tokenAddress.toLowerCase()}`, stakedAmount);

    return balances;
}

module.exports = {
    methodology: "Staking TVL is computed by calling contractBalance() on the staking contract to retrieve the total staked tokens.",
    bsc: {
        staking,
    },
};
