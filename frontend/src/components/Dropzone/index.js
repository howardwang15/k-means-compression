import React from 'react';
import ErrorPopup from '../ErrorPopup';
import './styles.css';

export default class DropZone extends React.Component {
    constructor() {
        super();
        this.inputRef = React.createRef();
        this.state = {
            file: null
        };
    }

    openFileExplorer = () => {
        this.inputRef.current.click();
    }

    validate = filename => {
        let extension = filename.split('.').pop();
        if (extension != 'png' && extension != 'jpg' && extension != 'pdf') {
            return false;
        }
        return true;
    }

    onFilesAdded = e => {
        e.stopPropagation();
        let uploaded = e.target.files[0];
        if (this.validate(uploaded.name)) {
            this.setState((prevState, props) => {
                return { file: uploaded }
            });
        } else {

        }
    }

    render() {
        return (
            <div className="dropzone" onClick={this.openFileExplorer}>
                <ErrorPopup />
                <img
                    alt="upload"
                    className="icon"
                    src="https://tinyurl.com/cloud-file-upload"
                />
                <input
                    ref={this.inputRef}
                    className="fileInput"
                    type="file"
                    onChange={this.onFilesAdded} />
                <span>Upload Files</span>
            </div>
        )
    }
}