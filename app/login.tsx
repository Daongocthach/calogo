import { Controller, useForm } from 'react-hook-form'

import {
  ButtonComponent,
  CardContainer,
  ChangeLanguageDropdown,
  ColumnComponent,
  Container,
  FormWrapper,
  Overview,
  SpaceComponent,
  TextComponent,
  TextInputComponent
} from '@/components'

import IMAGES from '@/assets/images'
import useStore from '@/store'

type LoginFormInputs = {
  email: string
  password: string
}

const Login = () => {
  const { setActionName } = useStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormInputs) => {
    setActionName('isLoggedIn', true)
  }

  return (
    <Container isScroll safeTop>
      <ChangeLanguageDropdown
        viewStyle={{ alignSelf: 'flex-end', marginTop: 10 }}
      />
      <Overview
        imageSource={IMAGES.LOGIN_BANNER}
        title="log in to level up your projects"
        caption="unlock tools to manage, collaborate, and excel. Take your projects further — smarter and faster"
      />
      <FormWrapper>
        <SpaceComponent height={20} />
        <CardContainer>
          <ColumnComponent gap={10}>
            <TextComponent text="sign in" type="title1" />
            <TextComponent
              text="sign in with your credentials"
              type="label"
            />
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'invalid email format',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  placeholder="enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'password is required',
                minLength: {
                  value: 3,
                  message: 'password must be at least 3 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  placeholder="enter your password"
                  isPassword
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <ButtonComponent
              onPress={handleSubmit(onSubmit)}
              text="sign in"
            />
          </ColumnComponent>

        </CardContainer>
      </FormWrapper>
    </Container>
  )
}

export default Login
