import Animated from "react-native-reanimated"

export default function HelloWave({ fontSize = 20 }: { fontSize?: number }) {
  const lineHeight = fontSize * 1.2

  return (
    <Animated.Text
      style={{
        fontSize,
        lineHeight,
        marginTop: -fontSize * 0.2,
        animationName: {
          "50%": { transform: [{ rotate: "25deg" }] },
        },
        animationIterationCount: 4,
        animationDuration: "300ms",
      }}
    >
      👋
    </Animated.Text>
  )
}
