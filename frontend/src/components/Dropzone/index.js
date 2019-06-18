import React from 'react';
import './styles.css';

export default class DropZone extends React.Component {
    constructor() {
        super();
        this.inputRef = React.createRef();
        this.state = {
            file: null,
            error: null
        };
    }

    openFileExplorer = () => {
        this.inputRef.current.click();
    }

    onFilesAdded = e => {
        e.stopPropagation();
        let uploaded = e.target.files[0];
        e.target.value = '';
        this.props.onFileAdded(uploaded);
    }

    render() {
        return (
            <div className="dropzone" onClick={this.openFileExplorer}>
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