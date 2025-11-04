import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function HomeScreen() {
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch làm việc</Text>

      <Calendar
        
        onDayPress={(day) => setSelected(day.dateString)}
        markedDates={{
          [selected]: { selected: true, selectedColor: '#00adf5' },
        }}
        theme={{
          todayTextColor: '#ff6347',
          arrowColor: '#00adf5',
        }}
      />

      {selected ? (
        <Text style={styles.selectedDate}>Ngày đã chọn: {selected}</Text>
      ) : (
        <Text style={styles.hint}>Chọn 1 ngày để xem chi tiết</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  selectedDate: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  hint: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#999',
  },
});
