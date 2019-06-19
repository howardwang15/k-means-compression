import React from 'react';
import ImageDisplay from '../ImageDisplay';
import Upload from '../Upload';
import './styles.css';

export default class MainComponent extends React.Component {
    render() {
        return (
            <div className="main-container">
                <Upload uploadFile={this.props.uploadFile} />
                <ImageDisplay previewUrl={this.props.previewUrl} />
            </div>
        )
    }
}