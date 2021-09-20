import React from 'react'
import NavComponent from './NavComponent'
import Tab from 'react-bootstrap/Tab'
import Join from './Players/Join'
import Host from './Host/Host'

const Navbar = () => {
    return (
        <NavComponent>
            <Tab eventKey="home" title="Join">
                <Join />
            </Tab>
            <Tab eventKey="profile" title="Host" tabClassName = {'ml-5'}>
                <Host />
            </Tab>
        </NavComponent>
    )
}

export default Navbar
