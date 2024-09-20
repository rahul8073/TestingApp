import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const birdSize = 50;
const pipeWidth = 100;
const pipeGap = 200; // Constant gap between pipes
const pipeSpeed = 2;
const gravity = 3; // Adjusted gravity to be more balanced
const jumpHeight = -400; // Adjusted upward movement

const HomeScreen = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const birdY = useSharedValue(height / 2); // Bird starts in the middle of the screen
  const pipeX = useSharedValue(width); // Pipes start off-screen
  const gamearea = useSharedValue(width); // Pipes start off-screen
  const gapPosition = useSharedValue(Math.random() * (height - pipeGap)); // Random position for the gap

  const handlePress = () => {
    if (gameOver) {
      resetGame();
    } else {
      // Move the bird upward by a fixed jump height
      birdY.value = withSpring(birdY.value + jumpHeight);
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
    birdY.value = height / 2;
    pipeX.value = width;
    gapPosition.value = Math.random() * (height - pipeGap); // Set a new random gap position
  };

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!gameOver) {
        // Move pipes to the left
        pipeX.value = withTiming(pipeX.value - pipeSpeed, { duration: 16 });
        gamearea.value = withTiming(gamearea.value + width)
        // Bird falls due to gravity
        birdY.value = withSpring(birdY.value + gravity); // Adjust gravity speed here

        // Reset pipes and gap when off-screen
        if (pipeX.value < -pipeWidth) {
          pipeX.value = width;
          gapPosition.value = Math.random() * (height - pipeGap); // Random new position for the gap
          setScore(prev => prev + 1); // Increase score
        }

        // Check if the bird touches the ground or flies too high
        if (birdY.value >= height - birdSize || birdY.value <= 0) {
          setGameOver(true);
        }

        // Collision detection with pipes
        // No need for complex logic here, just ensure we have proper collision logic
        const birdTop = birdY.value;
        const birdBottom = birdTop + birdSize;

        const topPipeBottom = gapPosition.value;
        const bottomPipeTop = gapPosition.value + pipeGap;

        if (
          (birdTop < topPipeBottom || birdBottom > bottomPipeTop) &&
          pipeX.value <= 50 + birdSize && pipeX.value + pipeWidth >= 50
        ) {
          setGameOver(true);
        }
      }
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameOver]);

  useEffect(() => {
    gamearea.value = withTiming(0, { duration: 3000 }); // Move to 0 over 3 seconds
  }, []);

  const animatedBirdStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: birdY.value }],
    };
  });

  const animatedPipeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: pipeX.value }],
    };
  });
  const animatedGameAreaStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: gamearea.value }],
    };
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>

        <View style={styles.gameArea}>
          <Animated.Image
            source={require('../Assets/bg.jpg')}
            style={[
            ,
              { height: '100%', width: '100%', position: 'absolute' }
            ]}
          />
          {/* Top pipe */}
          <Animated.View
            style={[styles.pipe, animatedPipeStyle, { height: gapPosition.value, top: 0 }]}
          />
          {/* Bottom pipe */}
          <Animated.View
            style={[styles.pipe, animatedPipeStyle, { height: height - gapPosition.value - pipeGap, bottom: 0 }]}
          />
          {/* Bird */}
          <Animated.Image source={require('../Assets/bird.png')} style={[styles.bird, animatedBirdStyle]} />
          {gameOver && <Text style={styles.gameOverText}>Game Over! Tap to restart</Text>}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Score: {score}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none'
  },
  scoreContainer: {
    position: 'relative',
    top: 40,
    left: 40,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red'
  },
  gameArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#87CEEB',
    position: 'relative',
  },
  pipe: {
    width: pipeWidth,
    backgroundColor: '#228B22',
    position: 'absolute',
  },
  bird: {
    position: 'absolute',
    left: 50,
    height: birdSize,
    width: birdSize,
    // backgroundColor: 'blue',
  },
  gameOverText: {
    position: 'absolute',
    top: height / 2,
    left: width / 2 - 100,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default HomeScreen;
