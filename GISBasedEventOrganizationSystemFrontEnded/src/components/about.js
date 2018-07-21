import React from 'react';
import LeftBar from './layouts/leftbar';
import { connect } from 'react-redux';


class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };



    }



    render() {



        return (
            <div>
                <div id="cm-menu">
                    <nav className="cm-navbar cm-navbar-primary">
                        <div className="cm-flex"><a href="index.html" className="cm-logo"></a></div>
                        <div className="btn btn-primary md-menu-white" data-toggle="cm-menu"></div>
                    </nav>
                    <LeftBar active='abt' />
                </div>
                <header id="cm-header">
                    <nav className="cm-navbar cm-navbar-primary">
                        <div className="btn btn-primary md-menu-white hidden-md hidden-lg" data-toggle="cm-menu"></div>
                        <div className="cm-flex">
                            <h1>Home</h1>
                        </div>
                    </nav>
                </header>
                <div id="global">
                    <div className="container-fluid cm-container-white">
                        <h2 className="welcome">Welcome to Event Organization and Management System</h2>
                        <p>This is event organization and management system, where you can book defferent services like halls,decorators,master of ceremony
                             and music through payment!Also the system can rccommend to you services you can have
                            according to the amount of money you have.
                        </p>
                    </div>
                    <div className="container-fluid cm-container-white">
                        <h3 className="welcome">Terms and condition</h3>
                        <p> Service provider will pay 5% of payment to the system</p>
                    </div>


                </div>
            </div>
        )
    }



}

export default About;



