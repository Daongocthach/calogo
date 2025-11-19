import { useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import {
  ButtonComponent,
  ColumnComponent,
  Container,
  GenderSelector,
  GoalSelector,
  HelloWave,
  InlineDropdown,
  RowComponent,
  TextComponent,
  TextInputComponent
} from "@/components"
import { activitiyLevels } from "@/lib"

type FormValues = {
  gender: string
  age: string
  height: string
  weight: string
  activity_level: string
  goal: string
}

export default function WelcomeScreen() {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      gender: "male",
      age: "20",
      height: "165",
      weight: "50",
      activity_level: "sedentary",
      goal: "maintain",
    },
  })

  const onSubmit = handleSubmit((data) => {
    router.push("/")
  })

  return (
    <Container safeTop isScroll>
      <ColumnComponent gap={15} style={{ marginTop: 20 }}>
        <ColumnComponent gap={10}>
          <RowComponent gap={10}  >
            <TextComponent text="welcome to calogo" type="display" size={24} />
            <HelloWave />
          </RowComponent>

          <TextComponent
            text="let's personalize your daily calorie goal"
            type="body"
            color="onSurfaceVariant"
          />
        </ColumnComponent>

        <Controller
          control={control}
          name="gender"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <GenderSelector
              gender={value}
              setGender={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="age"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <TextInputComponent
              label="age"
              placeholder="enter your age"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <RowComponent gap={10}>
          <Controller
            control={control}
            name="height"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextInputComponent
                label={t("height") + " (cm)"}
                placeholder="170"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="weight"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextInputComponent
                label={t("weight") + " (kg)"}
                placeholder="70"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </RowComponent>

        <Controller
          control={control}
          name="activity_level"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <InlineDropdown
              label="activity level"
              select={value}
              setSelect={onChange}
              selects={activitiyLevels}
              placeholder="select activity level"
            />
          )}
        />

        <Controller
          control={control}
          name="goal"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <GoalSelector
              goal={value}
              setGoal={onChange}
            />
          )}
        />
        <ButtonComponent
          text="continue"
          disabled={!isValid}
        />
      </ColumnComponent>
    </Container>
  )
}
