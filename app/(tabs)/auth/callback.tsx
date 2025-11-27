import { useLocalSearchParams } from 'expo-router';

export default function () {
  const params = useLocalSearchParams(); // 返 { key: 'value' } object
  console.log(' params:', params);

  return (
    <p>Call back</p>
  );
}