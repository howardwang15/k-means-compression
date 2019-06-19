import React from 'react';

export default class ImageDisplay extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.previewUrl} />
            </div>
        )
    }
}