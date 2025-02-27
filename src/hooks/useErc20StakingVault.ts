import { useActiveAccount, AccountProvider, useWalletBalance } from "thirdweb/react";

function useErc20StakingVault() {

    const account = useActiveAccount();
    

    return {
        address : account?.address || null
    }
}

export default useErc20StakingVault;