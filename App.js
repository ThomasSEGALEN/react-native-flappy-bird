import { useState, useEffect } from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
    const [running, setRunning] = useState(false);
    const [gameEngine, setGameEngine] = useState(null);
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    const loadScore = (defaultValue = 0) => {
        return AsyncStorage.getItem("bestScore").then((value) => {
            if (value !== null) {
                setBestScore(value);
            }
            return defaultValue;
        });
    };

    const saveScore = (value) => {
        if (value > bestScore) {
            setBestScore(value);
            return AsyncStorage.setItem("bestScore", value.toString());
        }
        return null;
    };

    const resetScore = () => {
        setBestScore(0);
        return AsyncStorage.removeItem("bestScore");
    };

    useEffect(() => {
        setRunning(false);
        loadScore();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Image
                source={require('./assets/background.png')}
                resizeMode="stretch"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: windowWidth,
                    height: windowHeight,
                }}
            />
            <GameEngine
                ref={(ref) => {
                    setGameEngine(ref);
                }}
                systems={[Physics]}
                entities={entities()}
                running={running}
                onEvent={(event) => {
                    switch (event.type) {
                        case "gameOver":
                            setRunning(false);
                            gameEngine.stop();
                            if (currentScore > bestScore)
                                saveScore(currentScore);
                            break;
                        case "addScore":
                            setCurrentScore(currentScore + 1);
                            break;
                    }
                }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 40,
                        fontWeight: "bold",
                    }}
                >
                    {currentScore}
                </Text>
                <StatusBar hidden={true} />
            </GameEngine>
            {!running ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: "black",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                        onPress={() => {
                            resetScore();
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: "white",
                                fontSize: 10,
                            }}
                        >
                            RESET
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "black",
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                        onPress={() => {
                            setCurrentScore(0);
                            setRunning(true);
                            gameEngine.swap(entities());
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: "white",
                                fontSize: 30,
                            }}
                        >
                            START GAME
                        </Text>
                    </TouchableOpacity>
                    <Text>Your Score : {currentScore}</Text>
                    <Text>Best Score : {bestScore}</Text>
                </View>
            ) : null}
        </View>
    );
}
