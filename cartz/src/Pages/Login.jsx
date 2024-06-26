import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  InputGroup,
  Stack,
  InputRightElement,
  Link,
  Button,
  Heading,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleButton from "react-google-button";
import { UserAuth } from "../Context/AuthContext";
import { Link as Link1, useNavigate, useLocation } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { userLogin, userLogout } from "../Redux/authReducer/action";

function Login() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const { googleSignIn, user } = UserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { users, isAuth } = useSelector((store) => {
    return {
      users: store.authReducer.users,
      isAuth: store.authReducer.isAuth,
    };
  });

  // const handleLogout = () => {
  //   // Ensure the user data (email and password) is available in the Redux store
  //   if (users && users.email && users.password) {
  //     // Call the userLogout action with the user data to delete it from the API
  //     dispatch(userLogout({ email: users.email, password: users.password }));
  //     console.log("Success")
  //   } else {
  //     // Handle cases where user data is not available
  //     console.error('User data not available for logout');
  //   }
  // };

  const HandleLogin = (e) => {
    e.preventDefault();
    const payload = { email, password };

    // Error Handling
    {
      !email ? setEmailError(true) : setEmailError(false);
    }
    {
      !password ? setPasswordError(true) : setPasswordError(false);
    }

    if (!email || !password) {
      return false;
    }

    dispatch(userLogin(payload)).then(() => {
      if (location.state) {
        // localStorage.setItem("userAccessToken", data.token);
        toast({
          title: "Logged In 👍.",
          description: "Login Successfully!",
          status: "success",
          duration: 1000,
          position: 'top',
          isClosable: true,
        });
        setTimeout(() => {
          navigate(location.state);
        }, 1000);
      } else {
        toast({
          title: "Logged In 👍.",
          description: "Login Successfully!",
          status: "success",
          duration: 1000,
          position: 'top',
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });

    // Login post request
    // fetch(`https://cartz-new-backend.onrender.com/users/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     if (data.token) {
    //       localStorage.setItem("userAccessToken", data.token);
    //       toast({
    //         title: "Logged In 👍.",
    //         description: "Login Successfully!",
    //         status: "success",
    //         duration: 2000,
    //         isClosable: true,
    //       });
    //       navigate("/");
    //     } else {
    //       if (email !== data.email) {
    //         toast({
    //           title: data.msg,
    //           status: "warning",
    //           position: "top",
    //           duration: 5000,
    //           isClosable: true,
    //         });
    //       } else if (password !== data.password) {
    //         toast({
    //           title: data.msg,
    //           status: "warning",
    //           position: "top",
    //           duration: 5000,
    //           isClosable: true,
    //         });
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast({
    //       title: err,
    //       status: "error",
    //       position: "top",
    //       duration: 5000,
    //       isClosable: true,
    //     });
    //   });
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.displayName) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"pink.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} h={400}>
            <form onSubmit={HandleLogin}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ textAlign: "start" }}
              />
              {emailError ? (
                <Text style={{ color: "red", textAlign: "left" }}>
                  Email is Required
                </Text>
              ) : null}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  textAlign={"start"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {passwordError ? (
                <Text style={{ color: "red", textAlign: "left" }}>
                  Password is Required
                </Text>
              ) : null}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"pink.400"}>Forgot password?</Link>
              </Stack>
              <Button
                colorScheme={"white"}
                bgGradient="linear(to-r, pink.400, orange.400)"
                _hover={{
                  bgGradient: "linear(to-r, pink.500, orange.500)",
                }}
                type="submit"
                // onClick={handleLogin}
              >
                Login in
              </Button>
              <p style={{ margin: "10px" }}>OR</p>
              <GoogleButton
                onClick={handleGoogleSignIn}
                style={{
                  width: "90%",
                  margin: "auto",
                  backgroundColor: "white",
                  color: "gray",
                  fontWeight: "600",
                  padding: "0px 55px",
                  borderRadius: "10px",
                }}
              />
              <p style={{ margin: "15px" }}>
                Don't Have an Account ?{" "}
                <Link1 to="/signup" style={{ color: "#008170" }}>
                  {" "}
                  Register
                </Link1>
              </p>
            </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
