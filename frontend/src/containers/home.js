import React from 'react';
import Header from '../components/Header';
import Upload from '../components/Upload';

export default class Home extends React.Component {
    render() {
        return (
            <div style={{position: 'relative', width: '100%', right: '0', left: 0, marginTop: '0', marginLeft: '0'}}>
                <Header />
                <Upload />
            </div>
        )
    }
}