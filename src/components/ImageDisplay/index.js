import React from 'react';
import "./styles.css";

export default class ImageDisplay extends React.Component {
    render() {
        return (
            <div className="image-container">
                <img src={this.props.previewUrl} />
                <img src={this.props.compressedUrl} />
            </div>
        )
    }
}
