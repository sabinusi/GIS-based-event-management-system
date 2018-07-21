import React from 'react';
import LeftBar from '../layouts/leftbar';
import constants from './../../constants/consants';
import Modal from 'react-responsive-modal';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";
import Axios from 'axios'
import { Link } from 'react-router-dom';



class OneMc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            open: false,
            imageActive: 'active',
            comments: '',
            videoActive: '',
            displayImages: true,
            comment_id: 0,
            fetchError: false,
            images: [],
            videos: []
        };
    }
    changeActiveLink() {
        if (this.state.imageActive == 'active') {
            this.setState({ videoActive: 'active', imageActive: '', displayImages: false });
        } else {
            this.setState({ imageActive: 'active', videoActive: '', displayImages: true });
        }
    }
    onOpenModal = (id) => {
        this.setState({ open: true });

        this.setState({ comment_id: id });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    componentDidMount() {
        // const script = document.createElement("script");
        // script.src = "js/lib/jquery-2.1.3.min.js";
        // script.type = "text/babel";
        // script.async = true;
        // document.body.appendChild(script);


        // const script1 = document.createElement("script");
        // script1.src = "js/jquery.mousewheel.min.js";
        // script1.async = true;
        // ;

        // document.body.appendChild(script1);

        // const script2 = document.createElement("script");
        // script2.src = "js/jquery.cookie.min.js";
        // script.type = "text/babel";

        // script2.async = true;
        // document.body.appendChild(script2);

        // const script3 = document.createElement("script");
        // script3.src = "js/fastclick.min.js";
        // script3.async = true;
        // script.type = "text/babel";

        // document.body.appendChild(script3);

        // const script4 = document.createElement("script");
        // script4.src = "js/bootstrap.min.js";
        // script4.async = true;
        // script.type = "text/babel";

        // document.body.appendChild(script4);

        // const script5 = document.createElement("script");
        // script5.src = "js/clearmin.min.js"
        // script.type = "text/babel";
        // ;
        // script5.async = true;
        // document.body.appendChild(script5);
    }
    componentWillMount() {




        console.log(this.props.match.params.id);
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

                response.map((resp) => {
                    if (resp.id == this.props.match.params.id) {
                        this.setState({ user: resp });
                        console.log(this.state.user);
                    }
                })

            }

        });
        fetch(constants.BASE_URL_SERVICEPROVIDER + 'images/' + this.props.match.params.id).then(response => {
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
                this.setState({ images: response });




            }

        });
        fetch(constants.BASE_URL_SERVICEPROVIDER + 'videos/' + this.props.match.params.id).then(response => {
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
                this.setState({ videos: response });




            }

        });



    }
    imageLike(id, like) {

        var ur = constants.BASE_URL_SERVICEPROVIDER + 'likeImage/' + id

        Axios.put(ur, {
            likes: like + 1
        }).then((response) => {
            console.log("Passport uploaded", response);
        }).then().catch((error) => {
            alert('erro in likes')
        })
    }
    dislikeLikeImage(id, like) {

        var ur = constants.BASE_URL_SERVICEPROVIDER + 'dislikeImage/' + id

        Axios.put(ur, {
            dislikes: like + 1
        }).then((response) => {
            console.log("Passport uploaded", response);
        }).then().catch((error) => {
            alert('erro in likes')
        })
    }
    comments() {
        var ur = constants.BASE_URL_SERVICEPROVIDER + 'createImageComments'

        Axios.post(ur, {
            comments: this.state.comments,
            image: this.state.comment_id
        }).then((response) => {
            if (response.status) {
                alert('succesful comment')
                this.setState({ open: false });
            }
        }).then().catch((error) => {
            alert("failed to login")
        })

    }
    render() {

        const images = () => {
            return (
                <div className="rowcm-fix-height">

                    {this.state.images.map(img => {
                        return (
                            <div className="col-sm-6">
                                <div className="panel panel-default">
                                    <div className="panel-heading">{img.descriptions}</div>

                                    <div className="panel-body">
                                        <img src={img.url} alt="" height="250px;" width="100%" />
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <button onClick={this.imageLike.bind(this, img.id, img.likes)} className="btn btn-success glyphicon glyphicon-thumbs-up"></button>  <span>21</span>
                                            </div>
                                            <div className="col-sm-5">
                                                <button onClick={this.dislikeLikeImage.bind(this, img.id, img.dislikes)} className="btn btn-danger glyphicon glyphicon-thumbs-down"></button> <span>2</span>
                                            </div>
                                            <div className="col-sm-2 ">
                                                <button onClick={this.onOpenModal.bind(this, img.id)} className="btn btn-block btn-primary glyphicon glyphicon-comment"></button>
                                                <Modal open={this.state.open} onClose={this.onCloseModal} closeOnOverlayClick little showCloseIcon={false}>
                                                    <textarea name="" id="" cols="80" rows="5" onChange={event => {
                                                        this.setState({ comments: event.target.value });
                                                    }

                                                    } placeholder="Please type your comments here ......."></textarea>


                                                    <div className="pull-right" style={{ marginLeft: '5px' }}>
                                                        <button onClick={this.comments.bind(this)} className="btn btn-success"> Send &emsp;</button> <hr /> <button className="btn btn-danger" onClick={this.onCloseModal}>cancel</button>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}



                </div>
            )
        }
        const videos = () => {
            return (
                <div className="row cm-fix-height">
                    {this.state.videos.map(video => {
                        return (
                            <div class="col-sm-6">
                                <div className="panel panel-default">
                                    <div className="panel-heading">{video.descriptions}</div>
                                    <div className="panel-body">
                                        <Player className="video">
                                            <source src={video.url} />
                                        </Player>
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <button className="btn btn-success glyphicon glyphicon-thumbs-up"></button>  <span>21</span>
                                            </div>
                                            <div className="col-sm-5">
                                                <button className="btn btn-danger glyphicon glyphicon-thumbs-down"></button> <span>2</span>
                                            </div>
                                            <div className="col-sm-2 ">
                                                <button onClick={this.onOpenModal.bind(this, video.id)} className="btn btn-block btn-primary glyphicon glyphicon-comment"></button>
                                                <Modal open={this.state.open} onClose={this.onCloseModal} closeOnOverlayClick little showCloseIcon={false}>
                                                    <textarea name="" id="" cols="80" rows="5" placeholder="Please type your comments here ......."></textarea>


                                                    <div className="pull-right" style={{ marginLeft: '5px' }}>
                                                        <button className="btn btn-success"> Send &emsp;</button> <hr /> <button className="btn btn-danger" onClick={this.onCloseModal}>cancel</button>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                    <LeftBar />
                </div>
                <header id="cm-header">
                    <nav className="cm-navbar cm-navbar-primary">
                        <div className="btn btn-primary md-menu-white hidden-md hidden-lg" data-toggle="cm-menu"></div>
                        <div className="cm-flex">
                            <h1>  {this.state.user.first_name} {this.state.user.last_name} (master of ceremony) </h1>

                        </div>


                    </nav>
                    <nav className="cm-navbar cm-navbar-default cm-navbar-slideup">
                        <div className="cm-flex">
                            <div className="nav-tabs-container">
                                <ul className="nav nav-tabs">
                                    <li onClick={this.changeActiveLink.bind(this)} className={this.state.imageActive}><a>Images </a></li>
                                    <li onClick={this.changeActiveLink.bind(this)} className={this.state.videoActive}><a>Videos</a></li>
                                    <li>
                                        <a> <Link to={'/profile/' + this.props.match.params.id}>Profile   </Link></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <div id="global">
                    <div className="container-fluid cm-container-white">

                    </div>
                    <div style={{ marginTop: "8%" }} className="container-fluid">
                        {this.state.displayImages ? images() : videos()}

                    </div>


                </div>
            </div>
        );
    }
}



export default OneMc;
