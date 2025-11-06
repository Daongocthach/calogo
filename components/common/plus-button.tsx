import { useTheme } from '@/hooks'
import { TouchableOpacity, ViewStyle } from 'react-native'
import IconComponent from './icon-component'


type IconComponentProps = {
    size?: number
    iconSize?: number
    style?: ViewStyle
}

const PlusButton = ({
    size = 60,
    iconSize = 30,
    style,
}: IconComponentProps) => {
    const { colors } = useTheme()

    return (
        <TouchableOpacity
            style={{
                position: 'absolute',
                bottom: 20,
                right: 12,
                width: size,
                height: size,
                borderRadius: 30,
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.background
            }}
        >
            <IconComponent
                name='Plus'
                size={iconSize}
                gradientColors={["#818cf8", "#ff6b81"]}
            />
        </TouchableOpacity>
    )
}

export default PlusButton
