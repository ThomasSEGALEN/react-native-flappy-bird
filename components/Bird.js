import { Image, View } from "react-native";
import Matter from "matter-js";

const Bird = (props) => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

    const xBody = props.body.position.x - widthBody / 2;
    const yBody = props.body.position.y - heightBody / 2;

    return (
        <View
            style={{
                position: "absolute",
                top: yBody,
                left: xBody,
                width: widthBody,
                height: heightBody,
            }}
        >
            <Image
                source={require("../assets/flappy-bird.png")}
                resizeMode="stretch"
                style={{
                    width: widthBody,
                    height: heightBody,
                }}
            />
        </View>
    );
};

export default (world, pos, size) => {
    const initialBird = Matter.Bodies.circle(pos.x, pos.y, size.radius, {
        label: "Bird",
    });
    Matter.Composite.add(world, initialBird);

    return {
        body: initialBird,
        pos,
        renderer: <Bird />,
    };
};
