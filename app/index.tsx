import { Redirect } from "expo-router";

export default function Index() {
    // Redirects from the root "/" to your home tab
    return <Redirect href="/(tabs)/home" />;
}