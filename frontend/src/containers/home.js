import React from 'react';
import Header from '../components/Header';
import Upload from '../components/Upload';
import MainComponent from '../components/MainComponent';
import Spinner from '../components/Spinner';
import axios from 'axios';

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            previewUrl: null,
            spinner: false
        };
    }

    updatePreviewUrl = (url) => {
        this.setState((prevState, props) => {
            return { previewUrl: url };
        })
    }

    uploadFile = (file) => {
        this.setState((prevState, props) => {
            return { spinner: true };
        })
        file = file[0];
        let formdata = new FormData();
        formdata.append("file", file);
        formdata.append("name", "file");
        axios({
            url: 'http://localhost:5000/upload',
            method: 'POST',
            data: formdata,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then((res) => {
            this.setState((prevState, props) => {
                return { spinner: false };
            })
            console.log(res.data)
        })
    }

    render() {
        return (
            <div>
                {this.state.spinner ? <Spinner /> : null }
                <div style={{position: 'relative', width: '100%', right: '0', left: 0, marginTop: '0', marginLeft: '0'}}>
                    <Header />
                    {/* <Upload uploadFile={this.uploadFile} /> */}
                    <MainComponent uploadFile={this.uploadFile} previewUrl={this.state.previewUrl} updatePreviewUrl={this.updatePreviewUrl} />
                </div>
            </div>
        )
    }
}