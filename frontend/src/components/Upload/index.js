import React from 'react';
import Dropzone from '../Dropzone';
import ErrorPopup from '../ErrorPopup';
import './styles.css';

export default class Upload extends React.Component {
    constructor() {
        super();
        this.state = {
            file: [],
            error: null,
            uploaded: false
        };
    }

    
    validate = uploaded => {
        let filename = uploaded.name;
        let extension = filename.split('.').pop();
        if (extension != 'png' && extension != 'jpg' && extension != 'pdf' && extension != 'txt') {
            return false;
        }
        let img = new Image();
        img.src = URL.createObjectURL(uploaded);
        img.onload = function() {
            console.log(this.width, ", ", this.height);
        }
        return true;
    }

    onFileAdded = uploaded => {
        if (this.validate(uploaded)) {
            let url = URL.createObjectURL(uploaded);
            this.setState((prevState, props) => {
                return { file: [uploaded], uploaded: true };
            });
            this.props.updatePreviewUrl(url);
        } else {
            this.setState((prevState, props) => {
                return { error: 'Invalid file format!' }
            });
        }
    }

    resetUpload = () => {
        this.setState((prevState, props) => {
            return { error: null, file: [] };
        });
        this.props.updatePreviewUrl(null);
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
                                    <img src="https://www.sccpre.cat/mypng/detail/1-14062_green-check-png-green-circle-check-mark.png" width="15px" height="15px"/>
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