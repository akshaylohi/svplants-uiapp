//import { } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from "../actions"

const LandingContainer = (props) => {
    
    //componentDidMount
    useEffect(() => {
        props.getPlants();
    }, [])

    // useEffect(() => {
    //     /* Interval functions to check which plant was last watered 6 hours before
    //      * and then create an alert for the user to know
    //      */
    //     const interval = setInterval(() => {
    //         CheckPlantsForWater()
    //       }, 60000);
        
    //       return () => clearInterval(interval);
    // }, [props.plantList])

    
    const WaterThePlant = (plant) =>{
        props.WaterThePlant(plant)
    }
    const formateDate = timeStamp =>{
        var x=new Date(timeStamp);
        var Datestring = `${x.getDate()}/${x.getMonth()+1}/${x.getFullYear()} - ${x.getHours()}:${x.getMinutes()}:${x.getSeconds()}`;
        return Datestring;
    }
    const DeletePlant = plantid => {
        props.DeleteAPlant(plantid);
    }
    return (
        <div>
            IT WORKED
        </div>
    )
}
const mapStateToProps = state =>{
    return {
        plants: _.values(state.plants)
      };
}
const mapActionToProps = {
    getPlants: action.getPlants
}
export default connect(mapStateToProps, mapActionToProps)(LandingContainer);