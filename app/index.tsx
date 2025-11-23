import {
    useQuery
} from '@tanstack/react-query';
import { Text, View } from "react-native";
import { TopUpBar } from "./components/top-up-bar";

export default function Index() {
            const { isPending, error, data } = useQuery({
              queryKey: ['repoData'],
              queryFn: () =>
                fetch('https://api.github.com/repos/TanStack/query').then((res) =>
                  res.json(),
                ),
            })


            if (isPending) return <Text>Loading...</Text>;

            if (error) return <Text>An error has occurred: {error.message}</Text>;

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <TopUpBar />
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold mb-2">{data.name}</Text>
        <Text className="text-base text-gray-700 dark:text-gray-200">{data.description}</Text>
      </View>
    </View>
  );
}
