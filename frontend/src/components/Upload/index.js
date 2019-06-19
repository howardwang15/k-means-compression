import React from 'react';
import Dropzone from '../Dropzone';
import ErrorPopup from '../ErrorPopup';
import './styles.css';

export default class Upload extends React.Component {
    constructor() {
        super();
        this.state = {
            files: [],
            error: null
        };
    }

    
    validate = filename => {
        let extension = filename.split('.').pop();
        if (extension != 'png' && extension != 'jpg' && extension != 'pdf') {
            return false;
        }
        return true;
    }

    onFileAdded = uploaded => {
        if (this.validate(uploaded.name)) {
            this.setState((prevState, props) => {
                return { file: uploaded }
            });
        } else {
            this.setState((prevState, props) => {
                return { error: 'Invalid file format!' }
            });
        }
    }

    onErrorClose = () => {
        this.setState((prevState, props) => {
            return { error: null }
        });
    }

    render() {
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
                            this.state.files.map(file => (
                                <div key={file.name} className="Row">
                                    <span className="Filename">{file.name}</span>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    <div className="actions" />
                    <Dropzone onFileAdded={this.onFileAdded}/>
                </div>
            </div>
        )
    }
}