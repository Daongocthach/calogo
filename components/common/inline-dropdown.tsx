import React, { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { RadioButton } from 'react-native-paper'

import { useTheme } from "@/hooks"
import { FONT_FAMILIES, windowWidth } from '@/lib/constants'
import { DropdownProps } from '@/lib/types'

import ColumnComponent from './column-component'
import Icon from './icon-component'
import ImageComponent from './image-component'
import RowComponent from './row-component'
import TextComponent from './text-component'

interface InlineDropdownProps {
  selects: { label: string, value: string | number }[]
  select: string | number
  setSelect: (value: any) => void
  label?: string
  placeholder?: string
  style?: object
  viewStyle?: ViewStyle
  isClearable?: boolean
  isSearch?: boolean
  searchPlaceholder?: string
  isGaugeItem?: boolean
  disabled?: boolean
  loading?: boolean
  labelColor?: string
  labelStyle?: TextStyle
}

const InlineDropdown = ({
  selects,
  select,
  setSelect,
  label,
  placeholder = 'select an option',
  style,
  viewStyle,
  isClearable = false,
  isSearch = false,
  searchPlaceholder = 'search',
  isGaugeItem = false,
  disabled = false,
  loading = false,
  labelColor,
  labelStyle
}: InlineDropdownProps) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const dropdownRef = useRef<any>(null)

  const dataTranslated = useMemo(
    () => selects.map(d => ({ ...d, label: t(d.label) })),
    [selects, t]
  )

  const safeValue = useMemo(() => {
    return dataTranslated.some(d => d.value === select) ? select : ''
  }, [dataTranslated, select])

  return (
    <View style={viewStyle}>
      {label &&
        <TextComponent
          text={label}
          type="label"
          size={14}
          style={[{ marginBottom: 8 }, labelStyle]}
          color={labelColor || "onSurface"}
        />
      }

      <View style={{ position: 'relative', height: 48 }}>
        <Dropdown
          disable={disabled}
          data={dataTranslated}
          ref={dropdownRef}
          labelField="label"
          valueField="value"
          value={safeValue}
          placeholder={loading ? t('loading') + '...' : t(placeholder)}
          search={isSearch}
          onChange={(item: DropdownProps) => setSelect(item.value)}
          style={[
            {
              borderWidth: 1,
              borderColor: colors.outlineVariant,
              borderRadius: 16,
              paddingHorizontal: 10,
              paddingVertical: 10,
              height: 48,
              backgroundColor: colors.background,
              paddingRight: isClearable && safeValue ? 44 : 10,
            },
            style as any,
          ]}
          placeholderStyle={{
            color: colors.onSurfaceVariant,
            fontSize: 14,
            fontFamily: FONT_FAMILIES.REGULAR
          }}
          selectedTextStyle={{
            color: colors.onSurfaceVariant,
            fontSize: 14,
            fontFamily: FONT_FAMILIES.REGULAR
          }}
          searchPlaceholder={t(searchPlaceholder)}
          inputSearchStyle={{
            color: colors.onBackground,
            borderRadius: 8,
          }}
          containerStyle={{
            borderRadius: 8,
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.surfaceDisabled,
          }}
          activeColor={colors.surfaceVariant}
          renderRightIcon={() => (
            <Icon name="ChevronDown" size={18} color="onSurface" />
          )}
          renderItem={(item) => {
            const isSelected = item.value === safeValue

            if (isGaugeItem) {
              return (
                <RowComponent
                  style={{
                    backgroundColor: isSelected ? colors.surface : 'transparent',
                    paddingRight: 8,
                    paddingVertical: 16,
                  }}
                  gap={10}
                  onPress={() => {
                    setSelect(item.value)
                    dropdownRef.current?.close()
                  }}
                >
                  <RowComponent>
                    <RadioButton.Android
                      value={item?.value}
                      status={isSelected ? 'checked' : 'unchecked'}
                      color={colors.primary}
                      uncheckedColor={colors.primary}
                      onPress={() => setSelect(item.value)}
                    />
                    <ImageComponent
                      source={undefined}
                      style={{ width: 80, height: 80, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                  </RowComponent>
                  <ColumnComponent>
                    <TextComponent
                      text={item.label}
                      color={isSelected ? "primary" : "onBackground"}
                    />
                    <TextComponent
                      size={12}
                      color="onSurface"
                      style={{ maxWidth: windowWidth * 0.5 }}
                      text={item.detail}
                    />
                  </ColumnComponent>
                </RowComponent>
              )
            }

            return (
              <RowComponent
                alignItems="center"
                justify="space-between"
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.surface,
                }}
              >
                <TextComponent
                  text={item.label}
                  color={isSelected ? "primary" : "onBackground"}
                />
                {isSelected && <Icon name="Check" size={16} color="primary" />}
              </RowComponent>
            )
          }}
          maxHeight={340}
        />

        {!loading && isClearable && !!safeValue && (
          <TouchableOpacity
            onPress={() => setSelect('')}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: [{ translateY: -12 }],
              width: 24,
              height: 24,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.level2,
            }}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Icon name="X" size={14} color="onSurface" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default InlineDropdown
