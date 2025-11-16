import { icons } from "lucide-react-native"

import ButtonComponent from "@/components/common/button-component"
import ColumnComponent from "@/components/common/column-component"
import RowComponent from "@/components/common/row-component"
import TextComponent from "@/components/common/text-component"
import { useTheme } from "@/hooks"

interface GenderSelectorProps {
  gender: string
  setGender: (value: string) => void
}

const genderOptions = [
  { key: "male", icon: "Mars" },
  { key: "female", icon: "Venus" },
]

export default function GenderSelector({
  gender,
  setGender,
}: GenderSelectorProps) {
  const { colors } = useTheme()

  return (
    <ColumnComponent gap={8}>
      <TextComponent text='gender' type="label" size={14} color="onSurface" />

      <RowComponent gap={10}>
        {genderOptions.map((item) => {
          const isSelected = gender === item.key

          return (
            <ButtonComponent
              text={item.key}
              key={item.key}
              icon={item.icon as keyof typeof icons}
              outline
              iconColor={isSelected ? colors.primary : colors.onSurfaceVariant}
              textStyle={{ color: isSelected ? colors.primary : colors.onSurfaceVariant }}
              buttonStyle={{ borderColor: isSelected ? colors.primary : colors.outlineVariant, borderRadius: 16 }}
              style={{ flex: 1 }}
              onPress={() => setGender(item.key)}
            />
          )
        })}
      </RowComponent>
    </ColumnComponent>
  )
}
