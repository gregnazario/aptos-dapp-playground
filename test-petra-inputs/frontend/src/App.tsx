import {WalletSelector} from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import {Button} from "antd";
import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {AccountAddress, U64} from "@aptos-labs/ts-sdk";

function App() {
    let {signAndSubmitTransaction} = useWallet();

    async function runButton() {
        let txn = await signAndSubmitTransaction({
            data: {
                function: "0x1::aptos_account::transfer",
                functionArguments: ["0x12345", 0]
            },
            options: {
                maxGasAmount: 0,
            }
        })
        console.log(`TXN: ${JSON.stringify(txn)}`)
    }


    async function runButtonUsingEncoded() {
        let txn = await signAndSubmitTransaction({
            data: {
                function: "0x1::aptos_account::transfer",
                functionArguments: [AccountAddress.fromString("0x12345"), new U64(0)]
            },
            options: {
                maxGasAmount: 0,
            }
        })
        console.log(`TXN: ${JSON.stringify(txn)}`)
    }


    async function runButtonUsingMixed() {
        let txn = await signAndSubmitTransaction({
            data: {
                function: "0x1::aptos_account::transfer",
                functionArguments: ["0x12345", new U64(0)]
            },
            options: {
                maxGasAmount: 0,
            }
        })
        console.log(`TXN: ${JSON.stringify(txn)}`)
    }

    async function runButtonUsingMixed2() {
        let txn = await signAndSubmitTransaction({
            data: {
                function: "0x1::aptos_account::transfer",
                functionArguments: [AccountAddress.from("0x12345"), 0]
            },
            options: {
                maxGasAmount: 0,
            }
        })
        console.log(`TXN: ${JSON.stringify(txn)}`)
    }

    return (
        <>
            <div className="navbar">
                <div className="navbar-text">Create Aptos Dapp</div>
                <div>
                    <WalletSelector/>
                </div>
            </div>
            <div className="center-container">
                <Button
                    onClick={runButton}
                    type="primary"
                    style={{height: "40px", backgroundColor: "#3f67ff"}}
                >
                    Plain string inputs
                </Button>
                <Button
                    onClick={runButtonUsingEncoded}
                    type="primary"
                    style={{height: "40px", backgroundColor: "#3f67ff"}}
                >
                    BCS encoded inputs
                </Button>
                <Button
                    onClick={runButtonUsingMixed}
                    type="primary"
                    style={{height: "40px", backgroundColor: "#3f67ff"}}
                >
                    Mixed encoded inputs
                </Button>
                <Button
                    onClick={runButtonUsingMixed2}
                    type="primary"
                    style={{height: "40px", backgroundColor: "#3f67ff"}}
                >
                    Mixed encoded inputs different mixture
                </Button>
            </div>

        </>
    );
}

export default App;
