import * as React from "react";
import {Link,useRouter } from "next/router";
// import Signup from './Signup';
function Home() {
  const router = useRouter();
  return (
    <div align="center">
      This is a Home Page. Please Sign in
      <Link href="/S"
      >
        Sign-up
      </Link>
      <Link href="/Signin">Sign-in</Link>
    </div>
  );
}

export default Home;
