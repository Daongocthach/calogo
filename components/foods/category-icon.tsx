import IconComponent from "@/components/common/icon-component"
import { icons } from "lucide-react-native"
import { View } from "react-native"

export default function CategoryIcon({
    icon,
    iconColor,
    backgroundColor,
}: {
    icon: keyof typeof icons
    iconColor?: string
    backgroundColor: string
}) {
    return (
        <View style={{ padding: 10, backgroundColor, borderRadius: 100 }}>
            <IconComponent name={icon} size={16} color={iconColor} />
        </View>
    )
}

