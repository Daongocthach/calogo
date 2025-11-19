import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'

import ButtonComponent from '@/components/common/button-component'
import CardContainer from '@/components/common/card-container'
import ColumnComponent from '@/components/common/column-component'
import DateTimePickerComponent from '@/components/common/date-time-picker'
import TextComponent from '@/components/common/text-component'
import TextInputComponent from '@/components/common/text-input-component'
import UserAvatar from '@/components/common/user-avatar'

import { useTheme } from '@/hooks'
import useStore from '@/store'
import { format } from 'date-fns'

type FormValues = {
    first_name: string
    last_name: string
    dob: string
    employee_code: string
}

export default function UserDetail() {
    const { userData, setActionName } = useStore()
    const { colors } = useTheme()

    const {
        control,
        handleSubmit,
        formState: { isValid, isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            first_name: "",
            last_name: "",
            dob: "",
            employee_code: "",
        },
    })

    const handleSubmitProfile = (data: FormValues) => {
    }

    return (
        <CardContainer>
            <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 50 }}>
                <View
                    style={{
                        padding: 12,
                        borderRadius: 100,
                        position: 'relative',
                        backgroundColor: colors.primaryContainer,
                        alignSelf: 'center'
                    }}
                >
                    <UserAvatar
                        avatarSize={70}
                        userName={userData?.name || ''}
                    />
                </View>

                <ColumnComponent gap={2}>
                    <TextComponent text='profile' type='display' />
                    <TextComponent type='label' text='update your personal details' />
                </ColumnComponent>

                <Controller
                    control={control}
                    name="first_name"
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                        <TextInputComponent
                            label="first name"
                            placeholder="enter your first name"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="last_name"
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                        <TextInputComponent
                            label="last name"
                            placeholder="enter your last name"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="dob"
                    render={({ field: { value, onChange } }) => (
                        <DateTimePickerComponent
                            mode='date'
                            label='date of birth'
                            placeholder='select date of birth'
                            dateTime={value ? new Date(value) : undefined}
                            setDateTime={(date) =>
                                onChange(date ? format(date, 'yyyy-MM-dd') : '')
                            }
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="employee_code"
                    render={({ field: { value, onChange } }) => (
                        <TextInputComponent
                            label="employee code"
                            placeholder="enter your employee code"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                <ButtonComponent
                    text="submit"
                    onPress={handleSubmit(handleSubmitProfile)}
                />

            </ScrollView>
        </CardContainer>
    )
}
