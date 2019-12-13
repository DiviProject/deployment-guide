import './Guide.scss';

import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

export type GuideProps = {

};

export type GuideState = {
    active: number;
};

export class Guide extends Component<GuideProps, GuideState> {
    public constructor(props: any) {
        super(props);
        this.state = { active: 0 };
    }

    public scrollEvent(e: any) {
        const e0: any = document.querySelector('div#e0');
        const e1: any = document.querySelector('div#e1');
        const e2: any = document.querySelector('div#e2');
        const e3: any = document.querySelector('div#e3');
        const e4: any = document.querySelector('div#e4');
        const e5: any = document.querySelector('div#e5');

        if (e0) {
            if (e0.getBoundingClientRect().bottom - 50 > 0) {
                this.setState({ active: 0 });
            } else if (e1.getBoundingClientRect().bottom - 50 > 0) {
                this.setState({ active: 1 });
            } else if (e2.getBoundingClientRect().bottom - 50 > 0) {
                this.setState({ active: 2 });
            } else if (e3.getBoundingClientRect().bottom - 50 > 0) {
                this.setState({ active: 3 });
            } else if (e4.getBoundingClientRect().bottom - 50 > 0) {
                this.setState({ active: 4 });
            } else if (e5.getBoundingClientRect().bottom - 50 > 0) {
                this.setState({ active: 5 });
            }
        }
    }

    public scrollTo(element: any, e: any) {
        const el: any = document.querySelector(element);
        const top = el.offsetTop - 30;

        window.scrollTo({
           left: 0,
           top,
           behavior: 'smooth',
        });
    }

    public componentDidMount() {
        window.addEventListener('scroll', this.scrollEvent.bind(this));
    }

    public componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollEvent.bind(this));
    }

    public render() {
        return(
            <div className="page-wrap page-examples">
                <div className="page-column table-of-contents">
                    <h3>Table of Contents</h3>
                    <a className={`link ${this.state.active === 0 ? 'active' : ''}`} onClick={this.scrollTo.bind(this, 'div#e0')}>
                        0. Introduction
                    </a>
                    <a className={`link ${this.state.active === 1 ? 'active' : ''}`} onClick={this.scrollTo.bind(this, 'div#e1')}>
                        1. Seed Node Configuration
                    </a>
                    <a className={`link ${this.state.active === 2 ? 'active' : ''}`} onClick={this.scrollTo.bind(this, 'div#e2')}>
                        2. Network Configuration
                    </a>
                    <a className={`link ${this.state.active === 3 ? 'active' : ''}`} onClick={this.scrollTo.bind(this, 'div#e3')}>
                        3. Miner Configuration
                    </a>
                    <a className={`link ${this.state.active === 4 ? 'active' : ''}`} onClick={this.scrollTo.bind(this, 'div#e4')}>
                        4. Verifying Blocks
                    </a>
                    <a className={`link ${this.state.active === 5 ? 'active' : ''}`} onClick={this.scrollTo.bind(this, 'div#e5')}>
                        5. Submitting Blocks &amp; Transactions
                    </a>
                </div>

                <div className="page-column primary">
                    <div className="guide-content" id="e0">
                        <h2 className="title">Deploying your own Bitcoin network</h2>
                        <h3 className="subtitle">A concise guide to configuring seed nodes, miners as well as main-net and test-net networks.</h3>
                        <h2>Introduction</h2>
                        <p>
                            After spending a fair bit of time configuring the testnet and mainnet networks for Divi. We have decided to write a guide on how to set one up. Currently, there is no concise or clear guide on how to deploy a network for Bitcoin on search engines (that we know of). Thus, we decided to write a guide to deploy and configure a network from scratch. Hopefully, this is of benefit to other people.
                        </p>
                    </div>
                    <div className="guide-content" id="e1">
                        <h2>Seed Node Configuration</h2>
                        <p>
                            Seed nodes are trusted nodes that help new nodes connect to the rest of the network. You can still technically have a network work without seed nodes. But, if you don't have seed nodes preconfigured. You need to use the `addnode` command via RPC.
                        </p>
                        <p>
                            To set up and configure seed nodes for your new network. You need to configure the node with the instructions from <b>/contrib/seeds</b>. Note that the markdown file in the repository mentions curling for sipa's seed nodes; however, in our case. We want to set up custom seed nodes. Thus, ignore the contents of that `README.md`.
                        </p>
                        <p>
                            To begin, set up several VPSes on any cloud hosting provider. Once you configure those new VPSes, you can modify the <b>nodes_main.txt</b> and <b>nodes_test.txt</b>.
                        </p>
                        <CodeMirror
                            value={`# nodes_main.txt\nVPS.IP.1\nVPS.IP.2\nVPS.IP.3`}
                            options={{
                                mode: 'shell',
                                theme: 'material',
                                lineNumbers: true
                            }}
                        />
                        <p>
                            Once you complete this, you can then have the seed nodes hardcoded into your network. It would be best if you run the python script in <b>/contrib/seeds</b>, which then hardcodes the seeds into the <b>/src/chainparamsseeds.h</b> file.
                        </p>
                        <CodeMirror
                            value={`cd contrib/seeds\npython3 generate-seeds.py . > ../../src/chainparamsseeds.h`}
                            options={{
                                mode: 'shell',
                                theme: 'material',
                                lineNumbers: true
                            }}
                        />

                    </div>
                    <div className="guide-content" id="e2">
                        <h2>Network Configuration</h2>
                        <p>
                            You need all the VPSes to be set up and configured as full nodes. Assuming that you have a new fork and your new source hardcoded in <b>/src/chainparamsseeds.h</b> committed to git. You can configure each node on each VPS as you would for any other Bitcoin full node.
                        </p>
                        <CodeMirror
                            value={`git clone https://github.com/MyAwesomeBitcoinFork --depth 1 --branch master\n# Make sure to have dependencies installed\n./autogen.sh\n./configure\nmake\nmake install`}
                            options={{
                                mode: 'shell',
                                theme: 'material',
                                lineNumbers: true
                            }}
                        />
                        <p>
                            Upon configuration of the network, any IP assigned to <b>nodes_main.txt</b> should be run as a mainnet node while any IP assigned to <b>nodes_test.txt</b> should run as a testnet node.
                        </p>
                        <CodeMirror
                            value={`# If the IP is for the mainnet\nbitcoind\n\n#If the IP is for the testnet\nbitcoind -testnet`}
                            options={{
                                mode: 'shell',
                                theme: 'material',
                                lineNumbers: true
                            }}
                        />
                    </div>
                    <div className="guide-content" id="e3">
                        <h2>Miner Configuration</h2>
                        <p>
                        Setting up a full node to mine transactions is a necessity for actual data to be submitted to the network. Elsewise, if a new node were to connect and submit a transaction. Nothing would happen. Mining in bitcoin is an adversarial process. That decentralized and adversarial process is part of what secures the ledger. After you've successfully begun mining, wait a while, and you should be able to see the balance with the <b>getwalletinfo</b> command.
                        </p>
                        <p>
                            To start the mining process, you need to configure the full node to mine with the <b>setgenerate</b> command.
                        </p>
                        <CodeMirror
                            value={`bitcoin-cli setgenerate true\n\n# Remember that for testnet you'll need to use the testnet flag\nbitcoin-cli -testnet setgenerate true`}
                            options={{
                                mode: 'shell',
                                theme: 'material',
                                lineNumbers: true
                            }}
                        />
                        <p>
                            After that, you can view if blocks are getting mined with the <b>getblockheight</b> command. And you can get your wallet balance with the <b>getwalletinfo</b> command.
                        </p>
                        <CodeMirror
                            value={`# Confirm that blocks are getting mined\nbitcoin-cli getblockheight\n\n# Confirm that funds are in your full node's wallet\nbitcoin-cli getwalletinfo`}
                            options={{
                                mode: 'shell',
                                theme: 'material',
                                lineNumbers: true
                            }}
                        />
                    </div>
                    <div className="guide-content" id="e4">
                        <h2>Verifying Blocks</h2>
                        <p>
                            In a new network, there is only one block, the genesis block. The genesis block must follow the same consensus rules as all other blocks created afterwards. Though in the software, it appears set in stone, it is arbitrarily when the block verifies as valid. The genesis block must have a matching hash in the definition of the chain (in the case of bitcoin), as that is a requirement.
                        </p>
                        <p>
                            In <b>src/chainparams.cpp</b>, there are functions to create the genesis block. Note that the function <b>static CBlock CreateGenesisBlock()</b> hash a signature <b>pszTimestamp</b> to create the genesis block. It may be a good idea to update this genesis block before mining and creating blocks in your network so that it's unique in comparison to the Bitcoin network.
                        </p>
                        <CodeMirror
                            value={`// Located on line 52 in src/chainparams.cpp
static CBlock CreateGenesisBlock(uint32_t nTime, uint32_t nNonce, uint32_t nBits, int32_t nVersion, const CAmount& genesisReward)
{
    const char* pszTimestamp = "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks";
    const CScript genesisOutputScript = CScript() << ParseHex("04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f") << OP_CHECKSIG;
    return CreateGenesisBlock(pszTimestamp, genesisOutputScript, nTime, nNonce, nBits, nVersion, genesisReward);
}`}
                            options={{
                                mode: 'clike',
                                theme: 'material',
                                lineNumbers: true
                            }}
                        />
                    </div>
                    <div className="guide-content" id="e5">
                        <h2>Submitting Blocks &amp; Transactions</h2>
                        <p>
                            Creating raw transactions requires you to specify the UTXOs that you're spending as well as any address receiving funds. The difference between inputs and outputs is what gets paid as a fee for the transaction processing by miners.
                        </p>
                        <p>
                            To create a raw transaction, you need to use the <b>createrawtransaction</b> command. You need to specify a JSON string with a <b>TXID</b> as a SHA256 hash. The <b>vout</b> is the output value. And finally, the <b>data</b> in hex format.
                        </p>
                        <CodeMirror
                            value={`# First create the transaction\nbitcoin-cli createrawtransaction "[{"txid": "000008e145adf0330e6de3a844b76f5163e0b2011a5ef270c7c7b3d4410c7b31", "vout": 0}]" "{"data": "646f6765"}"\n\n# Remember to specify -testnet for testnet transactions\nbitcoin-cli -testnet createrawtransaction [create transaction inputs]\n\n# Then you can sign the transaction\nbitcoin-cli signrawtransactionwithwallet [create transaction output]\n\n# And then finally can submit the transaction\nbitcoin-cli sendrawtransaction [signed transaction output]`}
                            options={{
                                mode: 'shell',
                                theme: 'material',
                                lineNumbers: true
                            }}
                        />
                        <p>
                            The above is a transaction that submits data to the blockchain. Bitcoin is a giant database. So you can submit any data you want in the hexadecimal format if you want to send money to an address. You can use the <b>sendtoaddress</b> command.
                        </p>
                        <p>
                            Using the <b>sendtoaddress</b> command, you need to make sure to provide a valid address on the network as well as an amount that is greater than your current balance. You can use <b>getwalletinfo</b> to make sure you have the correct balance in your wallet.
                        </p>
                        <CodeMirror
                            value={`bitcoin-cli sendtoaddress [address] [amount]\nbitcoin-cli sendtoaddress 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa 69`}
                            options={{
                                mode: 'shell',
                                theme: 'material',
                                lineNumbers: true
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
