import { JsonRpcProvider, Wallet, ethers } from 'ethers';
import artifacts from '../artifacts/contracts/Lock.sol/Lock.json';

async function main() {
    // const provider = new JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
    const provider = new JsonRpcProvider('https://bsc-testnet.public.blastapi.io');
    // const provider = new JsonRpcProvider('https://endpoints.omniatech.io/v1/bsc/testnet/public');
    

    if (!process.env.PRIVATE_KEY) {
        throw new Error('PRIVATE_KEY is not defined in the environment variables');
    }

    const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
    console.log(`Deploying from address: ${wallet.address}`);

    const Lock = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
    
    // Set unlock time to 24 hours in the future
    const unlockTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    console.log('Deploying Lock contract...');
    
    // ✅ Pass the constructor argument
    const lock = await Lock.deploy(unlockTime, { value: ethers.parseEther("0.01") }); 
    await lock.waitForDeployment();

    console.log(`Lock contract deployed to: ${await lock.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
