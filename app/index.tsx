import {
  useQuery
} from '@tanstack/react-query';
import { View } from "react-native";

export default function Index() {
            const { isPending, error, data } = useQuery({
              queryKey: ['repoData'],
              queryFn: () =>
                fetch('https://api.github.com/repos/TanStack/query').then((res) =>
                  res.json(),
                ),
            })

            if (isPending) return 'Loading...'

            if (error) return 'An error has occurred: ' + error.message

  return (

    <View className="flex-1 items-center justify-center bg-white">
            <h1>{data.name}</h1>
            <p>{data.description}</p>

    </View>
  );
}
