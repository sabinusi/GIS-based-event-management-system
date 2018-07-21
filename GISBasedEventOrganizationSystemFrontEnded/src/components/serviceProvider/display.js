import React from 'react';
import LeftBar from '../layouts/leftbar';

class DisplayHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };



    }

    componentDidMount() {
        // const script = document.createElement("script");
        // script.src = "js/lib/jquery-2.1.3.min.js";
        // script.type = 'text/javascript';
        // script.async = true;
        // document.body.appendChild(script);
        // console.log(script);

        // const script1 = document.createElement("script");
        // script1.src = "js/jquery.mousewheel.min.js";
        // script1.async = true;
        // document.body.appendChild(script1);

        // const script2 = document.createElement("script");
        // script2.src = "js/jquery.cookie.min.js";
        // script2.async = true;
        // document.body.appendChild(script2);

        // const script3 = document.createElement("script");
        // script3.src = "js/fastclick.min.js";
        // script3.async = true;
        // document.body.appendChild(script3);

        // const script4 = document.createElement("script");
        // script4.src = "js/bootstrap.min.js";
        // script4.async = true;
        // document.body.appendChild(script4);

        // const script5 = document.createElement("script");
        // script5.src = "js/clearmin.min.js";
        // script5.async = true;
        // document.body.appendChild(script5);
    }

    render() {



        return (
            <div>
                <div id="cm-menu">
                    <nav className="cm-navbar cm-navbar-primary">
                        <div className="cm-flex"><a href="index.html" className="cm-logo"></a></div>
                        <div className="btn btn-primary md-menu-white" data-toggle="cm-menu"></div>
                    </nav>
                    <LeftBar />
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

                    </div>

                    <div className="container-fluid">
                        <div className="row cm-fix-height">
                            <div className="col-sm-4">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <div >
                                            <h4>
                                                <img src="../../../img/sf/user-male-alt.svg" height="24" width="24" />
                                                <b> Master of ceremony (MC's)</b></h4>

                                        </div>
                                        <br />
                                        <p>This is for mc services, you can view,like,comment and book any MC</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <h4>

                                            <img src="../../../img/sf/user-male.svg" height="24" width="24" />
                                            <b> Halls </b> </h4>
                                        <br />
                                        <p>This is for hall services, you can view,like,comment and book any hall.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <h4>

                                            <img src="../../../img/sf/bullhorn.svg" height="24" width="24" />
                                            <b>  Musician's</b> </h4>
                                        <br />
                                        <p>This is for music services, you can view,like,comment and book any Musician.</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="row cm-fix-height">
                            <div className="col-sm-4">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <h4>

                                            <img src="../../../img/sf/shop.svg" height="24" width="24" />
                                            <b>  Decorator's</b> </h4>
                                        <br />
                                        <p>This is for decotation services, you can view,like,comment and book any decorator.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <h4>

                                            <img src="../../../img/sf/wrench-screwdriver.svg" height="24" width="24" />
                                            <b>  Recomandations</b> </h4>
                                        <br />
                                        <p>The system can reccomend services according to the ammount you have.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <h4>

                                            <img src="../../../img/sf/gift.svg" height="24" width="24" />
                                            <b>  Booking</b> </h4>
                                        <br />
                                        <p>you can book any service you want, once you pay for the service</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        )
    }



}

export default DisplayHome;



