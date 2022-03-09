import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getPipeSizePosPair } from "./utils/random";

const windowWidth = Dimensions.get("window").width;

export default Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine;

    touches
        .filter((touch) => touch.type === "press")
        .forEach(() => {
            Matter.Body.setVelocity(entities.Bird.body, {
                x: 0,
                y: -6,
            });
        });

    Matter.Engine.update(engine, time.delta);

    for (let index = 1; index <= 2; index++) {
        if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${index}`].score) {
            entities[`ObstacleTop${index}`].score = true;
            dispatch({type: 'addScore'});
        }

        if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);

            Matter.Body.setPosition(
                entities[`ObstacleTop${index}`].body,
                pipeSizePos.pipeTop.pos
            );
            Matter.Body.setPosition(
                entities[`ObstacleBottom${index}`].body,
                pipeSizePos.pipeBottom.pos
            );

            entities[`ObstacleTop${index}`].score = false;
        }

        Matter.Body.translate(entities[`ObstacleTop${index}`].body, {
            x: -4,
            y: 0,
        });
        Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
            x: -4,
            y: 0,
        });
    }

    Matter.Events.on(engine, "collisionStart", (event) => {
        dispatch({ type: "gameOver" });
    });

    return entities;
};
