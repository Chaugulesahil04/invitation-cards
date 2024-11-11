import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <h1>Invitation Maker</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/see-templates">See Templates</Link></li>
                <li><Link to="/edit-template">Edit Template</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
