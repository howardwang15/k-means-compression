import React from 'react';
import Dropzone from '../Dropzone';
import ErrorPopup from '../ErrorPopup';
// import Check from x'../../static/check.jpg';
import './styles.css';
import { API_URL } from '../../constants';

export default class Upload extends React.Component {
    constructor() {
        super();
        this.state = {
            file: [],
            error: null,
            uploaded: false
        };
    }


    validate = (uploaded) => {
        return new Promise((resolve, reject) => {
            let filename = uploaded.name;
            let extension = filename.split('.').pop();
            if (extension != 'png' && extension != 'jpg' && extension != 'pdf' && extension != 'txt') {
                resolve(false);
            }
            let img = new Image();
            img.src = URL.createObjectURL(uploaded);
            img.onload = () => {
                if (img.height > 480) {
                    let formdata = new FormData();
                    formdata.append("file", uploaded);
                    fetch(`${API_URL}/resize`, {
                        method: "POST",
                        mode: "cors",
                        body: formdata
                    })
                    .then(res => res.blob())
                    .then(blob => {
                        let url = URL.createObjectURL(blob);
                        this.props.updatePreviewUrl(url);
                        resolve(true);
                    });
                } else {
                    this.props.updatePreviewUrl(URL.createObjectURL(uploaded));
                    resolve(true);
                }
            }
        })
    }

    onFileAdded = uploaded => {
        this.validate(uploaded)
        .then(valid => {
            if (!valid) {
                this.setState((prevState, props) => {
                    return { error: 'Invalid file format!' }
                });
            } else {
                this.setState((prevState, props) => {
                    return { file: [uploaded], uploaded: true };
                });
            }
        })
    }

    resetUpload = () => {
        this.setState((prevState, props) => {
            return { error: null, file: [] };
        });
        this.props.updatePreviewUrl(null);
        this.props.updateCompressedUrl(null);
    }

    onErrorClose = () => {
        this.setState((prevState, props) => {
            return { error: null }
        });
    }

    handleUpload = () => {
        this.props.uploadFile(this.state.file);
    }

    render() {
        const style = this.state.uploaded ? {} : {visibility: "hidden"};
        return (
            <div className="upload-container">
                {
                    this.state.error ? <ErrorPopup message={this.state.error} onClose={this.onErrorClose} /> : null
                }
                <div className="upload">
                    <h2 className="title">Upload Files</h2>
                    <div className="content-upload">
                        <div />
                        <div className="files">
                        {
                            this.state.file.map(file => (
                                <div key={file.name} className="row">
                                    <span className="filename">{file.name}</span>
                                    {/* <img src={Check} width="15px" height="15px" /> */}
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    <Dropzone onFileAdded={this.onFileAdded}/>
                    <button className="button" style={style} onClick={this.handleUpload}>Compress</button>
                    <button className="button" style={style} onClick={this.resetUpload}>Clear</button>
                </div>
            </div>
        )
    }
}
