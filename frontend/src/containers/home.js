import React from 'react';
import Header from '../components/Header';
import Upload from '../components/Upload';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Upload />
            </div>
        )
    }
}