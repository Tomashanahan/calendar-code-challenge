import { Stack, Tabs } from "expo-router";
import React from "react";
import { CalendarIcon } from "react-native-heroicons/outline";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Action Description",
          tabBarIcon: ({ color, focused }) => <CalendarIcon color={color} />,
        }}
      />
    </Stack>
  );
}
