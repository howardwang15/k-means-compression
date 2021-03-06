import React from 'react';
import ImageDisplay from '../ImageDisplay';
import Upload from '../Upload';
import './styles.css';

export default class MainComponent extends React.Component {
    render() {
        return (
            <div className="main-container">
                <Upload
                    uploadFile={this.props.uploadFile}
                    updatePreviewUrl={this.props.updatePreviewUrl}
                    updateCompressedUrl={this.props.updateCompressedUrl}
                    />
                <ImageDisplay
                    previewUrl={this.props.previewUrl}
                    compressedUrl={this.props.compressedUrl}
                    />
            </div>
        )
    }
}
