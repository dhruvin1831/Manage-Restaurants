import React from 'react'
import "../../styles/RestaurantSelection.css"
import { Link } from "react-router-dom";
function RestaurantSelection() {
    return (
        <div>
            Hello These are some best recommendations for you!!
            <Link to="/restaurant">
                demo restaurant
            </Link>
        </div>
    )
}

export default RestaurantSelection
