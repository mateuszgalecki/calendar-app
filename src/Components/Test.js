import React, { Component } from 'react';
import { useSelector } from 'react-redux';

function Test(props) {

    const screen = useSelector(state => state.screen);

    return(
        <p>
            {screen}
        </p>
    )
}

export default Test;