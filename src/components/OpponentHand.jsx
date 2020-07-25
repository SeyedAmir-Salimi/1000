import React from 'react'

function OpponentHand({count}) {
    let cards = [];
    for (let index = 0; index < count; index++) {
        const imageFile = require(`../assets/images/back-0062ff.png`)
        cards.push(<div className='box' style={{ backgroundImage: `url(${imageFile})` }}></div>)
    }
    return (
        <div>
            {cards}
        </div>
    )
}

export default OpponentHand
