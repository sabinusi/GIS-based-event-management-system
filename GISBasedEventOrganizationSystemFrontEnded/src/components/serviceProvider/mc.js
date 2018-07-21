import React from 'react';
import LeftBar from '../layouts/leftbar';
import { Link } from 'react-router-dom';


import constants from './../../constants/consants';



class Mc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mc: [],
            fetchError: false
        };
    }
    componentWillMount() {
        fetch(constants.BASE_URL_SERVICEPROVIDER + 'list').then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                this.setState({
                    fetchError: true
                });
                console.log(response);
            }
        }).then(response => {
            if (!this.state.fetchError) {
                console.log(response);
                var mcs = []
                response.map((resp) => {
                    resp.services.map((res) => {
                        if (res.name == "master ceremony") {
                            mcs.push(resp)
                        }
                    })
                })
                console.log(mcs)
                this.setState({ mc: mcs });

            }

        });

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
                    <LeftBar active="mc" />
                </div>
                <header id="cm-header">
                    <nav className="cm-navbar cm-navbar-primary">
                        <div className="btn btn-primary md-menu-white hidden-md hidden-lg" data-toggle="cm-menu"></div>
                        <div className="cm-flex">
                            <h1>Master's of ceremony (Mc's)</h1>
                            <form id="cm-search" action="index.html" method="get">
                                <input type="search" name="q" autoComplete="off" placeholder="Search..." />
                            </form>
                        </div>
                        <div className="pull-right">
                            <div id="cm-search-btn" className="btn btn-primary md-search-white" data-toggle="cm-search"></div>
                        </div>

                    </nav>
                </header>
                <div id="global">
                    <div className="container-fluid cm-container-white">

                    </div>

                    <div className="container-fluid">
                        <div className="row cm-fix-height">
                            {this.state.mc.map((m) => {
                                return (
                                    <Link to={'/masterOfCeremony/' + m.id}>
                                        <div style={{ cursor: "pointer", color: "black" }} className="col-sm-4">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <img src={m.pic_url} height="100%" width="100%" />
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <p>Name:</p>
                                                        </div>
                                                        <div className="col-sm-9">
                                                            {m.first_name}&emsp;{m.last_name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}





                        </div>


                    </div>


                </div>
            </div>
        );
    }
}



export default Mc;
