import { Pressable, StyleSheet, Text, TextInput, View, Image } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require("@/assets/images/logo.png")} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry
      />
      
      <Pressable
        style={styles.signInButton}
        onPress={() => {
          router.push("/(tabs)");
        }}
      >
        <Text style={styles.signInText}>Sign in</Text>
      </Pressable>
      
      <Link href="/register" replace asChild>
        <Pressable style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>Create a new account</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0c0c3b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#5fecc0',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'white',
  },
  signInButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#5fecc0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  signInText: {
    color: 'white',
    fontSize: 18,
  },
  createAccountButton: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    color: 'white',
    fontSize: 16,
  }
});