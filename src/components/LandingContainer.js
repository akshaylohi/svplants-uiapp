import { CssBaseline, Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux'
import * as actions from "../actions"
import _ from "lodash";
import store from "store";
import PlantCard from "./plantCard";
import Navbar from "./Appbar";
import { withStyles } from '@material-ui/core/styles';
import plant1Image from '../resources/images/plant1.jpg';
import plant2Image from '../resources/images/plant2.jpg';
import plant3Image from '../resources/images/plant3.jpg';
import plant4Image from '../resources/images/plant4.jpg';
import plant5Image from '../resources/images/plant5.jpg';
import { toast } from "react-toastify";

const getImage = (id) => {
    switch (id) {
        case 0: { return plant1Image; break; }
        case 1: { return plant2Image; break; }
        case 2: { return plant3Image; break; }
        case 3: { return plant4Image; break; }
        case 4: { return plant5Image; break; }
        default: { return null; }
    }
};



const styles = theme => ({
    noHighlight: {
        marginTop: '30px',
        marginBottom: '30px',
    },
    plantContainer: {
        background: '#f2f2f2',
        padding: '20px'
    },
    highlight: {
        marginTop: '30px',
        marginBottom: '30px',
        border: '2px solid red'
    }
});
const LandingContainer = (props) => {
    const [duePlants, setDuePlants] = useState([]);
    const [wateringPlants, setWateringPlants] = useState([]);
    const plantState = useSelector((state) => state.plants);


    useEffect(() => {
        var duePlantsOld = store.get("due_plants");
        var wateringPlantsOld = store.get("watering_plants");
        if (!duePlantsOld) {
            store.set("due_plants", []);
            setDuePlants([]);
        } else {
            store.set("due_plants", duePlantsOld);
            setDuePlants(duePlantsOld);
        }
        if (!wateringPlantsOld) {
            store.set("watering_plants", []);
            setWateringPlants([]);
        } else {
            store.set("watering_plants", wateringPlantsOld);
            setWateringPlants(wateringPlantsOld);
        }
    }, [])

    //componentDidMount
    useEffect(() => {
        props.getPlants();
    }, [])


    const { classes } = props;

    const getCardClass = (plantId) => {
        if (duePlants.includes(plantId)) {
            return classes.hightlight;
        }
        return classes.noHighlight;
    }

    const WaterPlantWrapper = (plant) => {
        if ((new Date() - (new Date(plant.lastWateredTime)))/1000 < 30) {
            toast.error("Please wait for 30seconds");
            return;
        }
        
        if (canWater(plant.plantId)) {
            props.waterPlant(plant.plantId);
            setTimeout(() => {
            stopWaterWrapper(plant);
        }, 10000);
        } else {
            stopWaterWrapper(plant);
        }

    }

    const stopWaterWrapper = (plant) =>{
        plant = _.find(plantState, {'plantId': plant.plantId});
        if(plant.status=="busy"){
            props.stopWatering(plant.plantId);
        }
    }

    const canWater = (plantId) => {
        var out = false;
        var plantTime;
        props.plants.forEach(plant => {
            plantTime = new Date(plant.lastWateredTime);
            if (plant.plantId == plantId && plant.status === "ok" && ((new Date() - plantTime) / 1000) > 30) {
                out = true;
            }
        })
        return out;
    }


    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar addPlant={props.addPlant}/>
            <Container maxWidth="sm" className={classes.plantContainer}>

                <Grid id="plantsGrid" container>
                    {

                        props.plants.map((plant, index) => {
                            return (
                                <Grid item key={index} sm={12}>
                                    <PlantCard
                                        classes={classes}
                                        getCardClass={getCardClass}
                                        image={getImage(index)}
                                        plant={plant}
                                        waterPlant={WaterPlantWrapper}
                                        //stopWaterPlant={stopWaterWrapper}
                                        canWater={canWater}
                                        deletePlant={props.deletePlant}
                                    />
                                </Grid>
                            );
                        })}

                </Grid>
            </Container>
        </React.Fragment>
    )


}
const mapStateToProps = state => {
    return {
        plants: _.values(state.plants)
    };
}
const mapActionToProps = {
    getPlants: actions.getPlants,
    waterPlant: actions.waterPlant,
    stopWatering: actions.stopWaterPlant,
    addPlant: actions.addPlant,
    deletePlant: actions.deletePlant
}
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(LandingContainer));