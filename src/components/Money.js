import React from 'react'

export type Props = {
    amount: number,
}

class Money extends React.Component {

    props: Props;

    render() {
        return (
            <div>
                {typeof(this.props.amount) === "undefined" ? "0CHF" : this.props.amount.toFixed(2)+"CHF"}
            </div>
        )
    }

}

export default Money