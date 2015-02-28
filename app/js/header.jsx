/** @jsx React.DOM */
import React from 'react'

export default React.createClass({
    displayName: 'Header',
    render: function() {
        return (
            <header className="site-header">
                <h1>benson</h1>
                <div className="site-header__tagline">private event invites</div>
            </header>
        )
    }
})
