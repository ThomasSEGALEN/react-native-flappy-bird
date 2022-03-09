import { Image, View } from "react-native";
import Matter from "matter-js";

const Floor = (props) => {
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
                source={require("../assets/floor.png")}
                resizeMode="repeat"
                style={{
                    width: widthBody,
                    height: heightBody,
                }}
            />
        </View>
    );
};

export default (world, pos, size) => {
    const initialFloor = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: "Floor",
            isStatic: true,
        }
    );
    Matter.Composite.add(world, initialFloor);

    return {
        body: initialFloor,
        pos,
        renderer: <Floor />,
    };
};
