import React, { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

import { useTheme } from "@/hooks"
import { FONT_FAMILIES } from '@/lib/constants'
import { DropdownProps } from '@/lib/types'

import Icon from './icon-component'
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
  disabled?: boolean
  isLoading?: boolean
  onOpen?: () => void
  isFetchingNextPage?: boolean
  onEndReached?: () => void
  onEndReachedThreshold?: number
  hideFooter?: boolean
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
  disabled = false,
  isLoading = false,
  onOpen,
  isFetchingNextPage,
  onEndReached,
  onEndReachedThreshold,
  hideFooter = false,
}: InlineDropdownProps) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const dropdownRef = useRef<any>(null)

  const dataTranslated = useMemo(
    () => selects.map(data => ({ ...data, label: t(data.label) })),
    [selects, t]
  )

  const safeValue = useMemo(() => {
    return dataTranslated.some(data => data.value === select) ? select : ''
  }, [dataTranslated, select])

  return (
    <View style={viewStyle}>
      {label && (
        <TextComponent
          text={label}
          type="caption"
          style={[{ marginBottom: 4, textTransform: 'uppercase' }]}
        />
      )}

      <View style={{ position: 'relative', minHeight: 48 }}>
        <Dropdown
          disable={disabled}
          data={dataTranslated}
          ref={dropdownRef}
          labelField="label"
          valueField="value"
          value={safeValue}
          placeholder={t(placeholder)}
          search={isSearch}
          onChange={(item: DropdownProps) => setSelect(item.value)}
          style={[
            {
              borderWidth: 1,
              borderColor: colors.outlineVariant,
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 10,
              backgroundColor: colors.background,
              paddingRight: isClearable && safeValue ? 44 : 10,
            },
            style as any,
          ]}
          placeholderStyle={{
            color: colors.onSurfaceDisabled,
            fontSize: 13,
            fontFamily: FONT_FAMILIES.REGULAR
          }}
          selectedTextStyle={{
            color: colors.onSurfaceVariant,
            fontSize: 13,
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
          onFocus={() => onOpen?.()}
          flatListProps={{
            onEndReached: () => onEndReached?.(),
            onEndReachedThreshold: onEndReachedThreshold ?? 0.3,
            ListFooterComponent: hideFooter
              ? null
              : (isLoading || isFetchingNextPage)
                ? (
                  <TextComponent
                    textAlign='center'
                    type='caption'
                    text="loading"
                    style={{ marginVertical: 16 }}
                  />
                )
                : selects.length > 0
                  ? (
                    <TextComponent
                      textAlign='center'
                      type='caption'
                      text="end of page"
                      style={{ marginVertical: 16 }}
                    />
                  )
                  : null
          }}
          renderItem={(item) => {
            const isSelected = item.value === safeValue

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

        {!isLoading && isClearable && !!safeValue && (
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
