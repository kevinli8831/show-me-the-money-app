import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function () {
  const params = useLocalSearchParams(); // 返 { key: 'value' } object
  console.log(' params:', params);

  return (
    <p>Call back</p>
  );
}