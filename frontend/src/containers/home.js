import React from 'react';
import Header from '../components/Header';
import MainComponent from '../components/MainComponent';
import Spinner from '../components/Spinner';
import axios from 'axios';

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            previewUrl: null,
            spinner: false,
            compressedUrl: null
        };
    }

    updatePreviewUrl = (url) => {
        this.setState((prevState, props) => {
            return { previewUrl: url };
        });
    }

    updateCompressedUrl = (url) => {
        this.setState((prevState, props) => {
            return { compressedUrl: url };
        });
    }

    uploadFile = (file) => {
        this.setState((prevState, props) => {
            return { spinner: true };
        })
        file = file[0];
        let formdata = new FormData();
        formdata.append("file", file);
        formdata.append("name", "file");
        fetch("http://localhost:5000/upload", {
            method: "POST",
            mode: "cors",
            body: formdata
        })
        .then(res => res.blob())
        .then(blob => {
            let url = URL.createObjectURL(blob);
            this.setState((prevState, props) => {
                return { spinner: false, compressedUrl: url };
            });
        });
    }

    render() {
        return (
            <div>
                { this.state.spinner ? <Spinner /> : null }
                <div style={{position: 'relative', width: '100%', right: '0', left: 0, marginTop: '0', marginLeft: '0'}}>
                    <Header />
                    <MainComponent
                        uploadFile={this.uploadFile}
                        previewUrl={this.state.previewUrl}
                        compressedUrl={this.state.compressedUrl}
                        updatePreviewUrl={this.updatePreviewUrl}
                        updateCompressedUrl={this.updateCompressedUrl}
                        />
                </div>
            </div>
        )
    }
}
