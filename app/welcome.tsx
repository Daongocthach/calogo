import {
  ColumnComponent,
  Container,
  IconComponent,
  RowComponent,
  TextComponent,
  TextInputComponent
} from "@/components"
import { useTheme } from "@/hooks"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import { TouchableOpacity, View } from "react-native"

export default function WelcomeScreen() {
  const router = useRouter()
  const { colors } = useTheme()

  const [name, setName] = useState("")
  const [gender, setGender] = useState<"male" | "female" | null>(null)
  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain" | null>(null)

  const isComplete =
    name && gender && age && height && weight && activityLevel && goal

  const handleContinue = () => {
    if (isComplete) router.push("/")
  }

  return (
    <Container safeTop>
      <RowComponent justify="center" style={{ marginBottom: 16 }}>
        <View
          style={{
            width: 24,
            height: 4,
            borderRadius: 4,
            backgroundColor: colors.primary,
            marginRight: 4,
          }}
        />
        <View
          style={{
            width: 24,
            height: 4,
            borderRadius: 4,
            backgroundColor: colors.surface,
            marginRight: 4,
          }}
        />
        <View
          style={{
            width: 24,
            height: 4,
            borderRadius: 4,
            backgroundColor: colors.surface,
          }}
        />
        <TextComponent
          text="1/3"
          type="caption"
          color="onSurfaceVariant"
          style={{ marginLeft: "auto" }}
        />
      </RowComponent>

      <ColumnComponent gap={6}>
        <TextComponent text="Welcome to CaloGo 👋" type="display" />
        <TextComponent
          text="Let's personalize your daily calorie goal."
          type="body"
          color="onSurfaceVariant"
        />
      </ColumnComponent>

      <ColumnComponent style={{ marginTop: 20 }}>
        <TextInputComponent
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </ColumnComponent>

      <ColumnComponent style={{ marginTop: 16 }} gap={8}>
        <TextComponent text="Gender" type="label" color="onSurface" />
        <RowComponent gap={10}>
          {[
            { key: "male", label: "Male" },
            { key: "female", label: "Female" },
          ].map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => setGender(item.key as any)}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor:
                  gender === item.key ? colors.primary : colors.outlineVariant,
                borderRadius: 12,
                paddingVertical: 12,
                alignItems: "center",
                backgroundColor:
                  gender === item.key ? colors.primaryContainer : "transparent",
              }}
            >
              <TextComponent
                text={item.label}
                type="body"
                color={
                  gender === item.key ? "onPrimaryContainer" : "onSurfaceVariant"
                }
              />
            </TouchableOpacity>
          ))}
        </RowComponent>
      </ColumnComponent>

      {/* Age */}
      <ColumnComponent style={{ marginTop: 16 }}>
        <TextInputComponent
          label="Age"
          placeholder="Enter your age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </ColumnComponent>

      {/* Height & Weight */}
      <RowComponent gap={10} style={{ marginTop: 16 }}>
        <ColumnComponent style={{ flex: 1 }}>
          <TextInputComponent
            label="Height (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            placeholder="170"
          />
        </ColumnComponent>
        <ColumnComponent style={{ flex: 1 }}>
          <TextInputComponent
            label="Weight (kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            placeholder="70"
          />
        </ColumnComponent>
      </RowComponent>

      {/* Activity Level */}
      <ColumnComponent style={{ marginTop: 16 }}>
        <TextComponent text="Activity Level" type="label" color="onSurface" />
        <TouchableOpacity
          onPress={() => { }}
          style={{
            borderWidth: 1,
            borderColor: colors.outlineVariant,
            borderRadius: 10,
            paddingVertical: 14,
            paddingHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextComponent
            text={
              activityLevel ? activityLevel : "Select activity level"
            }
            color={activityLevel ? "onSurface" : "onSurfaceVariant"}
          />
          <IconComponent name="ChevronDown" size={20} color="onSurfaceVariant" />
        </TouchableOpacity>
      </ColumnComponent>

      {/* Goal */}
      <ColumnComponent style={{ marginTop: 16 }} gap={10}>
        <TextComponent text="Goal" type="label" color="onSurface" />
        {[
          {
            key: "lose",
            title: "Lose Weight",
            desc: "Create a calorie deficit",
            icon: "MinusCircle",
          },
          {
            key: "maintain",
            title: "Maintain Weight",
            desc: "Stay at current weight",
            icon: "Activity",
          },
          {
            key: "gain",
            title: "Gain Muscle",
            desc: "Build lean muscle mass",
            icon: "PlusCircle",
          },
        ].map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => setGoal(item.key as any)}
            style={{
              borderWidth: 1,
              borderColor:
                goal === item.key ? colors.primary : colors.outlineVariant,
              backgroundColor:
                goal === item.key ? colors.primaryContainer : "transparent",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <RowComponent justify="space-between" alignItems="center">
              <ColumnComponent>
                <TextComponent
                  text={item.title}
                  type="title2"
                  color={
                    goal === item.key ? "onPrimaryContainer" : "onSurface"
                  }
                />
                <TextComponent
                  text={item.desc}
                  type="caption"
                  color={
                    goal === item.key
                      ? "onPrimaryContainer"
                      : "onSurfaceVariant"
                  }
                />
              </ColumnComponent>
              <IconComponent
                name={item.icon as any}
                size={20}
                color={
                  goal === item.key ? "onPrimaryContainer" : "onSurfaceVariant"
                }
              />
            </RowComponent>
          </TouchableOpacity>
        ))}
      </ColumnComponent>
    </Container>
  )
}
