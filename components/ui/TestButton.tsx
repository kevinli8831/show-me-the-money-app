import { Text, TouchableOpacity } from 'react-native';
import { cn } from '../../lib/utils';
import React from 'react';

export function TestButton({ className }: { className?: string }) {
  return (
    <TouchableOpacity className={cn("bg-blue-500 p-4 rounded-lg", className)}>
      <Text className="text-white font-bold">Test Button</Text>
    </TouchableOpacity>
  );
}
