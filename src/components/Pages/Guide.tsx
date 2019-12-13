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
                            After spending a fair bit of time configuring our own testnet and mainnet networks for Divi.
                            We decided to write a guide on how to set one up. Currently, there is no concise or clear
                            guide on how to deploy a network for Bitcoin on search engines (that we know of).
                            Thus, we decided to write a guide to deploying and configuring a network from scratch.
                            Hopefully this is of benefit to other people.
                        </p>
                    </div>
                    <div className="guide-content" id="e1">
                        <h2>Seed Node Configuration</h2>
                        <p>
                            Seed nodes are trusted nodes that help new nodes connect to the rest of the network.
                            You can still technically have a network work without seed nodes. But, if you don't have
                            seed nodes preconfigured. You will have to use the addnode command via rpc.
                        </p>
                        <p>
                            In order to setup and configure seed nodes for your new network.
                            You will need to configure it with the instructions from <b>/contrib/seeds</b>.
                            Note that the markdown file in the repository mentions curling for sipa's
                            seed nodes. However, in our case. We want to setup our own custom seed nodes.
                            So ignore what's mentioned
                        </p>
                        <p>
                            Spin up several VPSes on any cloud hosting provider. Once you configure
                            those you can modify <b>nodes_main.txt</b> and <b>nodes_test.txt</b>.
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
                            Once you complete this. You can then have the seed nodes hardcoded into your network.
                            You will need to run the python script in <b>/contrib/seeds</b> which will have these
                            nodes coded into <b>/src/chainparamsseeds.h</b>.
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
                            Once you have setup the seed node IPs. You will need all the VPSes to be
                            setup and configured as full nodes. Assuming that you have a fork and your new
                            source in <b>/src/chainparamsseeds.h</b> committed to git. You can configure
                            each node on each VPS as you would for any other Bitcoin full node.
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
                            Once the network is configured. Any IP that is assigned to <b>nodes_main.txt</b> should be run as a mainnet
                            node. While any IP that is assigned to <b>nodes_test.txt</b> should be run as a testnet node.
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
                            Setting up a full node to mine transactions is a necessity in order for actual data to be submitted to
                            the network. Elsewise, if a new node were to connect and submit a transaction. Nothing would happen.
                        </p>
                    </div>
                    <div className="guide-content" id="e4">
                        <h2>Verifying Blocks</h2>
                        <p>

                        </p>
                    </div>
                    <div className="guide-content" id="e5">
                        <h2>Submitting Blocks &amp; Transactions</h2>
                        <p>

                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
