import { icons } from "lucide-react-native"

import ColumnComponent from "@/components/common/column-component"
import IconComponent from "@/components/common/icon-component"
import RadioCircle from "@/components/common/radio"
import RowComponent from "@/components/common/row-component"
import TextComponent from "@/components/common/text-component"
import { useTheme } from "@/hooks"
import { TouchableOpacity } from "react-native"

interface GoalSelectorProps {
    goal: string | null
    setGoal: (value: string) => void
}

const goalOptions = [
    {
        key: "lose",
        title: "lose weight",
        subtitle: "create a calorie deficit",
        icon: "TrendingDown",
    },
    {
        key: "maintain",
        title: "maintain weight",
        subtitle: "stay at current weight",
        icon: "Scale",
    },
    {
        key: "gain",
        title: "gain muscle",
        subtitle: "build lean muscle mass",
        icon: "TrendingUp",
    },
]

export default function GoalSelector({ goal, setGoal }: GoalSelectorProps) {
    const { colors } = useTheme()

    return (
        <ColumnComponent gap={8}>
            <TextComponent
                text="goal"
                type="label"
                size={14}
                color="onSurface"
            />

            <ColumnComponent gap={12}>
                {goalOptions.map(item => {
                    const isSelected = goal === item.key

                    return (
                        <TouchableOpacity
                            key={item.key}
                            onPress={() => setGoal(item.key)}
                            style={{
                                borderWidth: 1,
                                borderColor: isSelected ? colors.primary : colors.outlineVariant,
                                padding: 16,
                                borderRadius: 16,
                            }}
                        >
                            <RowComponent justify="space-between">
                                <RowComponent gap={12}>
                                    <RadioCircle selected={isSelected} />

                                    <ColumnComponent>
                                        <TextComponent
                                            text={item.title}
                                            type="body"
                                            color={isSelected ? "primary" : "onSurface"}
                                            fontWeight="semibold"
                                        />

                                        <TextComponent
                                            text={item.subtitle}
                                            type="caption"
                                            size={13}
                                            color="onSurfaceVariant"
                                        />
                                    </ColumnComponent>
                                </RowComponent>

                                <IconComponent
                                    name={item.icon as keyof typeof icons}
                                    color={isSelected ? "primary" : "onSurfaceVariant"}
                                    size={24}
                                />
                            </RowComponent>
                        </TouchableOpacity>
                    )
                })}
            </ColumnComponent>
        </ColumnComponent>
    )
}
