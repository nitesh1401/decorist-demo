import React from 'react';
import Aux from './hoc/Aux';

const quote = props => {
    return (
        <Aux>
            <div class="quote-mark pull-left">“</div>
            <div class="pull-right clearfix quote-width">
                <div class="quote">
                    {props.quote/* A luxe vision on a startup budget. */}
                </div>
                <div class="quote-author">
                    {props.author + ", " + props.designation/* Alexis Robbins, Decorist Elite Designer */}
                    <br/>
                    {props.quoteDescription/* Featured in MyDomaine for Weddington Way */}
                </div>
            </div>
        </Aux>
    )
}

export default quote;