import React from 'react';
import LeftBar from '../layouts/leftbar';
import Modal from 'react-responsive-modal';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios'
import constants from '../../constants/consants'
import Loadable from 'react-loading-overlay';
import LoadingIndicator from 'react-loading-indicator';
import swal from 'sweetalert';



class Recomandation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            user_amount: '',
            user_services: [],
            serviceNames: [],
            user_services_name: [],
            loadingOptions: true,

            render_control: 'openModel',
            // activate recomandation
            active_mc: '',
            active_halls: '',
            active_dec: '',
            active_music: '',
            active_display: ''
            // activate recomandation



        };
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };
    recomandation = (event) => {
        event.preventDefault()
        this.setState({
            render_control: 'openLoader'
        });
        var url = constants.BASE_URL_SERVICEPROVIDER + 'recomandation?price=' + this.state.user_amount + '&name=' + this.state.user_services;

        Axios.get(url

        ).then(
            response => {
                if (response.status === 200) {
                    var user_services_count = this.state.user_services.length
                    var each_amount = this.state.user_amount / user_services_count
                    var mc_price = 0
                    var mc_price_id = 0
                    var hall_price = 0
                    var hall_price_id = 0
                    var decor_price = 0
                    var decor_price_id = 0
                    var music_price = 0
                    var music_price_id = 0
                    var suggested_musicians = []
                    var suggested_halls = []
                    var suggested_decorations = []
                    var suggested_master_of_ceremony = []

                    for (let index = 0; index < this.state.user_services_name.length; index++) {

                        console.log(this.state.user_services_name[index].toString());
                        if (this.state.user_services_name[index].toString().includes("mast")) {
                            mc_price = each_amount
                            mc_price_id = this.state.user_services[index]

                        } if (this.state.user_services_name[index].toString().includes("hal")) {
                            hall_price = each_amount
                            hall_price_id = this.state.user_services[index]


                        }
                        if (this.state.user_services_name[index].toString().includes("music")) {
                            music_price = each_amount
                            music_price_id = this.state.user_services[index]


                        }
                        if (this.state.user_services_name[index].toString().includes("deco")) {
                            decor_price = each_amount
                            decor_price_id = this.state.user_services[index]

                        }

                    }
                    for (let index = 0; index < response.data.length; index++) {
                        // here looking for mc price if existed

                        if (response.data[index].name == mc_price_id && response.data[index].price <= mc_price) {
                            suggested_master_of_ceremony.push(response.data[index])
                        }

                        // here looking for mc price if existed

                        // here looking for decoration

                        if (response.data[index].name == decor_price_id && response.data[index].price <= mc_price) {
                            suggested_decorations.push(response.data[index])
                        }
                        // here looking for decoration

                        // here looking for music

                        if (response.data[index].name == music_price_id && response.data[index].G48price <= mc_price) {
                            suggested_musicians.push(response.data[index])
                        }
                        //  here looking for music

                        // here looking for halls

                        if (response.data[index].name == hall_price_id && response.data[index].price <= mc_price) {
                            suggested_halls.push(response.data[index])
                        }
                        // here looking for halls




                    }

                    if (suggested_musicians.length != 0 || suggested_musicians.length != 0 || suggested_master_of_ceremony != 0 || suggested_halls.length != 0) {
                        sessionStorage.clear()
                        sessionStorage.setItem("amount", this.state.user_amount)
                        sessionStorage.setItem("servicesName", this.state.user_services)
                        sessionStorage.setItem("services_names", this.state.user_services_name)
                        this.setState({
                            render_control: 'leave',
                        });




                    } else {
                        swal("Amount is too small system hasn't found any suggestion", "Please Try Again Later", "error")
                        this.setState({
                            render_control: 'openModel'
                        });
                    }


                }
            }
        ).catch((error) => {
            console.log(error)

        })
    }

    componentWillMount() {
        var url = constants.BASE_URL_SERVICEPROVIDER + 'serviceNames';
        console.log(url);
        Axios.get(url

        ).then(
            response => {
                if (response.status === 200) {

                    this.setState({
                        serviceNames: response.data,
                        loadingOptions: false
                    });
                }
            }
        ).catch((error) => {
            console.log(error)

        })
    }

    render() {



        return (
            <div>
                <div id="cm-menu">
                    <nav className="cm-navbar cm-navbar-primary">
                        <div className="cm-flex"><a href="index.html" className="cm-logo"></a></div>
                        <div className="btn btn-primary md-menu-white" data-toggle="cm-menu"></div>
                    </nav>
                    <LeftBar active="rcm" />
                </div>

                <div id="global">
                    {(() => {
                        switch (this.state.render_control) {
                            case 'openModel':
                                return (<Modal open={this.state.open} onClose={this.onCloseModal} closeOnOverlayClick={false} showCloseIcon={false}>
                                    <div className="row cm-fix-height">
                                        <div className="col-lg-12">
                                            <div className="panel panel-default">
                                                <div className="panel-heading">Please fill required details for recomandation</div>
                                                <div className="panel-body">
                                                    <form className="form-horizontal" onSubmit={this.recomandation}>
                                                        <div className="form-group">
                                                            <label htmlFor="inputEmail3" className="col-sm-2 control-label">Services</label>
                                                            <div className="col-sm-10">
                                                                <Loadable
                                                                    active={this.state.loadingOptions}
                                                                    spinner
                                                                    text='Fetching options... '>
                                                                    <select className="form-control" required id="" multiple onChange={event => {
                                                                        var options = event.target.options;
                                                                        var value = [];
                                                                        var name = []
                                                                        for (var i = 0, l = options.length; i < l; i++) {
                                                                            if (options[i].selected) {
                                                                                value.push(options[i].value);
                                                                                name.push(options[i].text);
                                                                            }
                                                                        }
                                                                        this.setState({
                                                                            user_services: value,
                                                                            user_services_name: name

                                                                        }

                                                                        )
                                                                    }}>

                                                                        {this.state.serviceNames.map(x => {
                                                                            return (

                                                                                <option value={x.id}>{x.name} </option>

                                                                            )

                                                                        })}


                                                                    </select>
                                                                </Loadable>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="inputPassword3" className="col-sm-2 control-label">Amount</label>
                                                            <div className="col-sm-10">
                                                                <input type="number" required className="form-control" id="inputPassword3" placeholder="ex: 500/="
                                                                    onChange={event => {
                                                                        this.setState({
                                                                            user_amount: event.target.value
                                                                        }

                                                                        );
                                                                    }} onBlur={event => {
                                                                        if (this.state.user_amount.charAt(0) == 0) {
                                                                            alert("no ammount start with 0")

                                                                        }
                                                                    }

                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-group" style={{ marginBottom: "0" }}>
                                                            <div className="col-sm-offset-2 col-sm-10">
                                                                <button type="reset" className="btn btn-default">Clear</button>&emsp;
                                                    <button type="reset" className="btn btn-danger">
                                                                    <Link to={'/'}>Return</Link>

                                                                </button>&emsp;
                                                    <button type="submit" className="btn  btn-primary" >Submit</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Modal>


                                )

                                break;
                            case 'openLoader':
                                return (
                                    <div style={{ marginLeft: "50%", marginTop: "15%" }}>
                                        <LoadingIndicator
                                            segments={12}
                                            segmentWidth={10}
                                            segmentLength={30}
                                        />
                                    </div>
                                )
                                break;

                            case 'leave':
                                return (
                                    <Redirect exact to={'/recomadationView'} />

                                );

                                break;
                            default:

                                break;
                        }
                    })()}

                </div>
            </div>
        );
    }
}



export default Recomandation;
