'use client';
import { client } from "@/app/client";
import { ConnectButton } from "thirdweb/react";
import { IoIosInformationCircle } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { linea, sepolia } from "thirdweb/chains";
import useErc20StakingVault from "@/hooks/useErc20StakingVault";
import Erc20StackingSection from "@/components/erc20-stacking-section";
import LoginSection from "@/components/login-section";

function Erc20StakingVault() {
    const { address } = useErc20StakingVault();
     if(address) return (<Erc20StackingSection />);
    else return ( <LoginSection message="Stake your Erc20 tokens and unlock exclusive rewards. 🚀"/>)
}

export default Erc20StakingVault;