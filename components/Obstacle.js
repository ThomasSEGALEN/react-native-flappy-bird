import { View } from "react-native";
import Matter from "matter-js";

const Obstacle = (props) => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

    const xBody = props.body.position.x - widthBody / 2;
    const yBody = props.body.position.y - heightBody / 2;

    return (
        <View
            style={{
                borderWidth: 5,
                borderColor: "black",
                backgroundColor: "red",
                position: "absolute",
                top: yBody,
                left: xBody,
                width: widthBody,
                height: heightBody,
            }}
        />
    );
};

export default (world, label, pos, size) => {
    const initialObstacle = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label,
            isStatic: true,
        }
    );
    Matter.Composite.add(world, initialObstacle);

    return {
        body: initialObstacle,
        pos,
        renderer: <Obstacle />,
    };
};
