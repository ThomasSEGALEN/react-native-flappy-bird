import Matter from "matter-js";
import { Dimensions } from "react-native";
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";
import { getPipeSizePosPair } from "../utils/random";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default (restart) => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    engine.gravity.y = 0.4;

    const pipeSizePosA = getPipeSizePosPair();
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);

    return {
        physics: { engine, world },
        Bird: Bird(
            world,
            { x: 50, y: 300 },
            { radius: 20 }
        ),
        ObstacleTop1: Obstacle(
            world,
            "ObstacleTop",
            pipeSizePosA.pipeTop.pos,
            pipeSizePosA.pipeTop.size
        ),
        ObstacleBottom1: Obstacle(
            world,
            "ObstacleBottom",
            pipeSizePosA.pipeBottom.pos,
            pipeSizePosA.pipeBottom.size
        ),
        ObstacleTop2: Obstacle(
            world,
            "ObstacleTop",
            pipeSizePosB.pipeTop.pos,
            pipeSizePosB.pipeTop.size
        ),
        ObstacleBottom2: Obstacle(
            world,
            "ObstacleBottom",
            pipeSizePosB.pipeBottom.pos,
            pipeSizePosB.pipeBottom.size
        ),
        Floor: Floor(
            world,
            { x: windowWidth / 2, y: windowHeight },
            { width: windowWidth, height: 180 }
        ),
    };
};
