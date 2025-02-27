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

      <Text style={styles.title}>Register</Text>
      
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
        style={styles.createAccountButton}
        onPress={() => {
          router.push("/(tabs)");
        }}
      >
        <Text style={styles.createAccountText}>Create Account</Text>
      </Pressable>
      
      <Link href="/login" replace asChild>
        <Pressable style={styles.loginButton}>
          <Text style={styles.loginText}>Login to existing account</Text>
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
  createAccountButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#5fecc0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  createAccountText: {
    color: 'white',
    fontSize: 18,
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  }
});