import logo from '../../assets/logo.png';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export type HeaderProps = {

};

export type HeaderState = {
    menu: boolean;
};

export class Header extends Component<HeaderProps, HeaderState> {
    public constructor(props: any) {
        super(props);
        this.state = { menu: false };
    }

    public toggleMenu(e: any) {
        this.setState({ menu: !this.state.menu });
    }

    public render() {
        return(
            <header>
                <Link className="brand" to="/">
                    <img src={logo} alt="logo" title="logo"/>
                    <h1>Deploying your own Bitcoin network</h1>
                </Link>
            </header>
        );
    }
}
