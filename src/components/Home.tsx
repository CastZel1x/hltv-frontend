import React from "react";

export default class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <a href="/players/compare">Standart Players Compare</a>
                <a href="/players/mapcompare">Players Compare Map</a>
                <a href="/teams/compare">Teams Compare</a>
            </div>
        )
    }
}