import DateTimePicker from '@react-native-community/datetimepicker'
import { addYears, endOfYear, format, startOfYear } from 'date-fns'
import { enUS, vi, zhCN, zhTW } from 'date-fns/locale'
import { useState } from 'react'
import { Modal, Platform, Pressable, SafeAreaView, StyleSheet, View } from 'react-native'

import { useTheme } from "@/hooks"
import useStore from '@/store'
import Icon from './icon-component'
import TextComponent from './text-component'

interface DateTimePickerComponentProps {
  mode: 'date' | 'time' | 'datetime' | 'countdown'
  label?: string
  dateTime: Date | undefined
  setDateTime: (date: Date | undefined) => void
  disabled?: boolean
  placeholder?: string
}

const DateTimePickerComponent = ({
  label,
  mode = 'date',
  dateTime,
  setDateTime,
  disabled = false,
  placeholder = 'select date',
}: DateTimePickerComponentProps) => {
  const { currentLanguage } = useStore()
  const { colors } = useTheme()

  const [showPicker, setShowPicker] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const [iosModalVisible, setIosModalVisible] = useState(false)
  const [tempDate, setTempDate] = useState<Date>(dateTime ?? new Date())

  const now = new Date()
  const minDate = startOfYear(addYears(now, -10))
  const maxDate = endOfYear(addYears(now, 10))

  const formatDate = (date: Date) => {
    const locale = currentLanguage === 'vi' ? vi : currentLanguage === 'zh-CN' ? zhCN : currentLanguage === 'zh-TW' ? zhTW : enUS
    if (mode === 'date') return format(date, 'dd MMMM yyyy', { locale })
    if (mode === 'time') return format(date, 'hh : mm a', { locale })
    return format(date, 'dd/MM/yyyy HH:mm:ss', { locale })
  }

  const openPicker = () => {
    if (Platform.OS === 'ios') {
      setTempDate(dateTime ?? new Date())
      setIosModalVisible(true)
      return
    }

    if (mode === 'time') {
      setShowTimePicker(true)
    } else if (mode === 'datetime') {
      setShowDatePicker(true)
    } else {
      setShowPicker(true)
    }
  }

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (event.type === 'set' && selectedDate) {
      const updated = dateTime ? new Date(dateTime) : new Date()
      updated.setFullYear(selectedDate.getFullYear())
      updated.setMonth(selectedDate.getMonth())
      updated.setDate(selectedDate.getDate())
      if (mode === 'datetime' && Platform.OS === 'android') {
        setDateTime(updated)
        setShowTimePicker(true)
      } else {
        updated.setHours(0, 0, 0, 0)
        setDateTime(updated)
      }
    }
  }

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false)
    if (event.type === 'set' && selectedDate) {
      const updated = dateTime ? new Date(dateTime) : new Date()
      updated.setHours(selectedDate.getHours())
      updated.setMinutes(selectedDate.getMinutes())
      updated.setSeconds(selectedDate.getSeconds() || 0)
      updated.setMilliseconds(0)
      setDateTime(updated)
    }
  }

  const handleClear = () => {
    setShowPicker(false)
    setShowDatePicker(false)
    setShowTimePicker(false)
    setIosModalVisible(false)
    setDateTime(undefined)
  }

  const onIosCancel = () => {
    setIosModalVisible(false)
  }

  const onIosDone = () => {
    setIosModalVisible(false)
    setDateTime(new Date(tempDate))
  }

  return (
    <View style={{ flexGrow: 1 }}>
      {label && (
        <TextComponent
          text={label}
          type="label"
          color={'onSurface'}
          fontWeight='medium'
          style={[{ marginBottom: 4 }]}
        />
      )}

      <View style={{ position: 'relative' }}>
        <Pressable
          style={[
            styles.input,
            {
              borderColor: colors.outlineVariant,
              backgroundColor: disabled ? colors.backdrop : 'transparent',
              paddingRight: dateTime && !disabled ? 44 : 10,
            },
          ]}
          onPress={openPicker}
          disabled={disabled}
        >
          <Icon name="Calendar" size={22} color="onSurface" />
          <TextComponent
            numberOfLines={1}
            style={{ width: '80%' }}
            color="onSurface"
            text={dateTime ? formatDate(dateTime) : placeholder}
          />
        </Pressable>

        {!!dateTime && !disabled && (
          <Pressable
            onPress={handleClear}
            accessibilityLabel="Clear date"
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: [{ translateY: -13 }],
              width: 26,
              height: 26,
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.level2,
              zIndex: 2,
            }}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Icon name="X" size={14} color="onSurface" />
          </Pressable>
        )}
      </View>

      {showPicker && (
        <DateTimePicker
          mode={mode === 'datetime' ? 'date' : mode}
          display="spinner"
          value={dateTime ?? new Date()}
          minimumDate={minDate}
          maximumDate={maxDate}
          onChange={(event, selectedDate) => {
            if (event.type === 'set' && selectedDate) {
              if (mode === 'time') {
                const updatedTime = new Date()
                updatedTime.setHours(selectedDate.getHours())
                updatedTime.setMinutes(selectedDate.getMinutes())
                updatedTime.setSeconds(0)
                updatedTime.setMilliseconds(0)
                setDateTime(new Date(updatedTime))
              } else {
                const updatedDate = new Date(selectedDate)
                updatedDate.setDate(selectedDate.getDate())
                setDateTime(updatedDate)
              }
            }
            setShowPicker(false)
          }}
        />
      )}

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          display="calendar"
          value={dateTime ?? new Date()}
          minimumDate={minDate}
          maximumDate={maxDate}
          onChange={handleDateChange}
          style={{ backgroundColor: colors.primary }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          display="clock"
          is24Hour={true}
          value={dateTime ?? new Date()}
          onChange={handleTimeChange}
        />
      )}

      <Modal
        visible={iosModalVisible}
        transparent
        animationType="slide"
        onRequestClose={onIosCancel}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}
            onPress={onIosCancel}
          />
          <View
            style={{
              backgroundColor: colors.background,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              paddingBottom: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingTop: 8,
                paddingBottom: 4,
              }}
            >
              <Pressable onPress={onIosCancel} hitSlop={10}>
                <TextComponent
                  text={'cancel'}
                  color="error"
                  size={16}
                />
              </Pressable>
              <Pressable onPress={onIosDone} hitSlop={10}>
                <TextComponent
                  text={'done'}
                  color="primary"
                  size={16}
                />
              </Pressable>
            </View>

            <DateTimePicker
              mode={mode === 'datetime' ? 'datetime' : mode}
              display="spinner"
              value={tempDate}
              minimumDate={minDate}
              maximumDate={maxDate}
              onChange={(_, selected) => {
                if (selected) setTempDate(selected)
              }}
              themeVariant="light"
              locale={
                currentLanguage === 'vi' ? 'vi-VN' :
                  currentLanguage === 'zh-CN' ? 'zh-CN' :
                    currentLanguage === 'zh-TW' ? 'zh-TW' : 'en-US'
              }
              style={{ backgroundColor: colors.background }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  )
}

export default DateTimePickerComponent

const styles = StyleSheet.create({
  input: {
    height: 48,
    padding: 10,
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '500' as any,
    marginBottom: 2,
  },
})
