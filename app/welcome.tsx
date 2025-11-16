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
import FormWrapper from "@/components/common/form-wrapper"
import { useTheme } from "@/hooks"
import { activitiyLevels } from "@/lib"
import { useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"


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
  const { colors } = useTheme()

  const {
    control,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      gender: "",
      age: "",
      height: "",
      weight: "",
      activity_level: "",
      goal: "",
    },
  })

  const onSubmit = handleSubmit((data) => {
    router.push("/")
  })

  return (
    <Container safeTop>
      <FormWrapper scroll>
        <ColumnComponent gap={20}>
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
        </ColumnComponent>
      </FormWrapper>
      <ButtonComponent
        text="continue"
        disabled={!isValid}
      />
    </Container>
  )
}
