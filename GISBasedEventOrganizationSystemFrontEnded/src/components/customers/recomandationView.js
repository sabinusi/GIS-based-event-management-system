import React from 'react';
import LeftBar from '../layouts/leftbar';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import constants from '../../constants/consants'
import Loadable from 'react-loading-overlay';
import LoadingIndicator from 'react-loading-indicator';
import swal from 'sweetalert';



class RecomandationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            user_amount: sessionStorage.getItem("amount"),
            user_services: sessionStorage.getItem("servicesName").split(','),
            serviceNames: [],
            user_services_name:sessionStorage.getItem("services_names").toString().split(',') ,
            loadingOptions: true,

            render_control: 'openModel',
            // activate recomandation
            active_mc: '',
            active_halls: '',
            active_dec: '',
            active_music: '',
            active_display: '',
            // activate recomandation
            suggested_decorations:[],
            suggested_halls:[],
            suggested_musicians:[],
            suggested_master_of_ceremony:[]





        };
        // this.recomandation=this.recomandation.bind(this)
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };
    recomandation = () => {
        
        
      
          console.log(this.state.user_amount,this.state.user_services_name);
        var url = constants.BASE_URL_SERVICEPROVIDER + 'recomandation?price=' + this.state.user_amount + '&name='+this.state.user_services;
console.log("url ",url);
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

                        if (response.data[index].name == music_price_id && response.data[index].price <= mc_price) {
                            suggested_musicians.push(response.data[index])
                        }
                        //  here looking for music

                        // here looking for halls

                        if (response.data[index].name == hall_price_id && response.data[index].price <= mc_price) {
                            suggested_halls.push(response.data[index])
                        }
                        // here looking for halls




                    }



                    console.log("suggested musicians", suggested_musicians.length)
                    console.log("suggested decorators", suggested_decorations.length);
                    console.log("suggested master_ceremony", suggested_master_of_ceremony);
                    console.log("suqqested halls", suggested_halls);
                    if (suggested_musicians.length > 0) {
                        this.setState({
                            active_music:'active',active_display:'mus'
                            
                        });
                        
                    } else if(suggested_decorations.length > 0) {
                        this.setState({
                            active_dec:'active',active_display:'dec'
                        });
                        
                    }else if( suggested_master_of_ceremony.length > 0){
this.setState({
    active_mc:'active',active_display:'mc'
});
                    }else {
this.setState({active_halls:'active',active_display:'hal'});
                    }
                    if (suggested_musicians.length != 0 || suggested_musicians.length != 0 || suggested_master_of_ceremony != 0 || suggested_halls.length != 0) {
                        this.setState({
                            render_control: 'openResult',
                            suggested_decorations: suggested_decorations,
                            suggested_halls: suggested_halls,
                            suggested_musicians: suggested_musicians,
                            suggested_master_of_ceremony: suggested_master_of_ceremony

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
    changeActiveLink = (e) => {
        switch (e) {
            case "mc":
                this.setState({
                    active_mc: 'active', active_music: '',
                    active_dec: '', active_halls: '', active_display: 'mc'
                });
                break;
            case "mus":
                this.setState({
                    active_mc: '', active_music: 'active',
                    active_dec: '', active_halls: '', active_display: 'mus'
                });
                break;
            case "dec":

                this.setState({
                    active_mc: '', active_music: '', active_display: 'dec',
                    active_dec: 'active', active_halls: ''
                });
                break;
            case "hal":
                this.setState({
                    active_mc: '', active_music: '', active_display: 'hal',
                    active_dec: '', active_halls: 'active'
                });
                break;

            default:
                break;
        }
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
        this.recomandation()
    }


    render() {

        let dataSource = [
            { id: 1, name: 'Item1' },
            {
                id: 2,
                name: 'Item2',

            }
        ]

        let dataSourceConfig = {
            label: 'id',
            text: 'name'
        }
        const mcs = () => {
            return (
                <div className="row cm-fix-height">
                    {this.state.suggested_master_of_ceremony.map((m) => {
                        return (
                            <Link to={'/masterOfCeremony/' + m.service_provider.id}>
                                <div style={{ cursor: "pointer", color: "black" }} className="col-sm-4">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <img src={m.service_provider.pic_url} height="100%" width="100%" />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p>Name:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    {m.service_provider.first_name}&emsp;{m.service_provider.last_name}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p>price:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    {m.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}





                </div>
            )


        }
        const deco = () => {
            return (
                <div className="row cm-fix-height">
                    {this.state.suggested_decorations.map((m) => {
                        return (
                            <Link to={'/decorators/' + m.service_provider.id}>
                                <div style={{ cursor: "pointer", color: "black" }} className="col-sm-4">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <img src={m.service_provider.pic_url} height="100%" width="100%" />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p>Name:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    {m.service_provider.first_name}&emsp;{m.service_provider.last_name}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p>price:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    {m.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}





                </div>
            )
        }
        const halls = () => {
            return (
                <div className="row cm-fix-height">
                    {this.state.suggested_halls.map((m) => {
                        return (
                            <Link to={'/halls/' + m.service_provider.id}>
                                <div style={{ cursor: "pointer", color: "black" }} className="col-sm-4">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <img src={m.service_provider.pic_url} height="100%" width="100%" />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p>Name:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    {m.service_provider.first_name}&emsp;{m.service_provider.last_name}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p>price:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    {m.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}





                </div>
            )
        }
        const musician = () => {
            return (
                <div className="row cm-fix-height">
                    {this.state.suggested_halls.map((m) => {
                        return (
                            <Link to={'/halls/' + m.service_provider.id}>
                                <div style={{ cursor: "pointer", color: "black" }} className="col-sm-4">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <img src={m.service_provider.pic_url} height="100%" width="100%" />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p>Name:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    {m.service_provider.first_name}&emsp;{m.service_provider.last_name}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p>price:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    {m.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}





                </div>
            )
        }
        return (
            <div>
                <div id="cm-menu">
                    <nav className="cm-navbar cm-navbar-primary">
                        <div className="cm-flex"><a href="index.html" className="cm-logo"></a></div>
                        <div className="btn btn-primary md-menu-white" data-toggle="cm-menu"></div>
                    </nav>
                    <LeftBar active="rcm" />
                </div>
                {/* <header id="cm-header">
                    <nav className="cm-navbar cm-navbar-primary">
                        <div className="btn btn-primary md-menu-white hidden-md hidden-lg" data-toggle="cm-menu"></div>
                        <div className="cm-flex">
                            <h1>Recomandation</h1>
                        </div>
                    </nav>
                </header> */}
                <div id="global">
                   <div>


                                        <header id="cm-header">
                                            <nav className="cm-navbar cm-navbar-primary">
                                                <div className="btn btn-primary md-menu-white hidden-md hidden-lg" data-toggle="cm-menu"></div>
                                                <div className="cm-flex">
                                                    <h1>Recomandations found on system </h1>

                                                </div>


                                            </nav>
                                            <nav className="cm-navbar cm-navbar-default cm-navbar-slideup">
                                                <div className="cm-flex">
                                                    <div className="nav-tabs-container">
                                                        <ul className="nav nav-tabs">
                                                            {this.state.user_services_name.map(x => {
                                                                if (x.toString().includes("mast")) {
                                                                    return (
                                                                        <li onClick={this.changeActiveLink.bind(this, "mc")} className={this.state.active_mc}><a>Master of ceremony (MC's) ({this.state.suggested_master_of_ceremony.length}) </a></li>
                                                                    )

                                                                }
                                                                if (x.toString().includes("hal")) {
                                                                    return (
                                                                        <li onClick={this.changeActiveLink.bind(this, "hal")} className={this.state.active_halls}><a>Halls ({this.state.suggested_halls.length})</a></li>
                                                                    )

                                                                }
                                                                if (x.toString().includes("music")) {
                                                                    return (
                                                                        <li onClick={this.changeActiveLink.bind(this, "mus")} className={this.state.active_music}><a>Decorations ({this.state.suggested_musicians.length})</a></li>
                                                                    )

                                                                }
                                                                if (x.toString().includes("deco")) {
                                                                    return (
                                                                        <li onClick={this.changeActiveLink.bind(this, "dec")} className={this.state.active_dec}><a>Muscians ({this.state.suggested_decorations})</a></li>
                                                                    )

                                                                }




                                                            })}





                                                        </ul>
                                                    </div>
                                                </div>
                                            </nav>
                                        </header>
                                        <div id="global">
                                            <div className="container-fluid cm-container-white">

                                            </div>
                                            <div style={{ marginTop: "4%" }} className="container-fluid">
                                                {/* {this.state.displayImages ? images() : videos()} */}
                                                {(() => {
                                                    switch (this.state.active_display) {
                                                        case "mc":
                                                        if (this.state.suggested_master_of_ceremony.length > 0) {
                                                             return (
                                                                mcs()
                                                            )
                                                        } else {
                                                                                                                return (
                                                                <center style={{ marginTop: "20%", }}> 
<div className="alert btn btn-primary">
    
    <strong>Sorry!</strong> There was a no iteam suquestion in this category.
</div>
                                                                </center>
                                                            )
                                                        }
                                                          
                                                            break;
                                                        case "dec":
                                                        if (this.state.suggested_decorations.length > 0) {
                                                              return (
                                                                deco()
                                                            )
                                                        } else {
                                                             return (
                                                                <center style={{ marginTop: "20%" }}> 
<div className="alert btn btn-primary">
    
    <strong>Sorry!</strong> There was a no iteam suquestion in this category.
</div>
                                                                </center>
                                                            )
                                                        }
                                                          
                                                            break;
                                                        case "mus":
                                                        if (this.state.suggested_master_of_ceremony.length > 0) {
                                                             return (
                                                                musician()
                                                            )
                                                        } else {
                                                                                               return (
                                                                <center style={{ marginTop: "20%", }}> 
<div className="alert btn btn-primary">
    
    <strong>Sorry!</strong> There was a no iteam suquestion in this category.
</div>
                                                                </center>
                                                            )
                                                        }
                                                           
                                                            break;
                                                        case "hal":
                                                        if (this.state.suggested_halls.length > 0) {
                                                            
                                                            return (
                                                                halls()

                                                            )
                                                        } else {
                                                            return (
                                                                <center style={{ marginTop: "20%", }}> 
<div className="alert btn btn-primary">
    
    <strong>Sorry!</strong> There was a no iteam suquestion in this category.
</div>
                                                                </center>
                                                            )
                                                        }
                                                            
                                                            break;
                                                        default:
                                                            break;
                                                    }
                                                })()}


                                            </div>


                                        </div>
                                    </div>
                </div>
            </div>
        );
    }
}



export default RecomandationView;
