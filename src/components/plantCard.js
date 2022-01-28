import * as React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';


const PlantCard = (props) => {

    const { classes, plant } = props;
    return (
        <Card sx={{ maxWidth: 345 }} className={props.getCardClass(plant.plantId)}>
            <CardMedia
                component="img"
                height="350"
                image={props.image}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Plant Id: {props.plant.plantId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Name: {props.plant.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={()=>{props.waterPlant(plant.plantId);}}>{
                     props.canWater(plant.plantId)? "Water":"Stop water"
                }</Button>
                {/* <Button variant="outlined">Stop Water</Button> */}
            </CardActions>
        </Card>
    );
};

export default PlantCard;