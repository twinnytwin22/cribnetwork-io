import Image from "next/image";
import Link from "next/link";
export const LoginForm = ({ logo }) => {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 w-screen ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="/" className="flex items-center p-8">
          <Image
            src={logo}
            className="h-8 mr-3 dark:invert w-auto"
            alt="Crib Logo"
            width={145}
            height={100}
            priority
          />
        </Link>
        <div className="w-full bg-white rounded-md shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-zinc-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-zinc-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="/auth/login"
              method="post"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  //  onChange={(e) => setEmail(e.target.value)}
                  //  value={email}
                  id="email"
                  className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-md focus:ring-red-300 focus:border-zinc-800 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-800 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-red-300 dark:focus:border-red-300"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  //  onChange={(e) => setPassword(e.target.value)}
                  //  value={password}
                  placeholder="••••••••"
                  className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-md focus:ring-red-300 focus:border-zinc-800 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-800 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-red-300 dark:focus:border-red-300"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-zinc-300 rounded bg-zinc-50 focus:ring-3 focus:ring-primary-300 dark:bg-zinc-700 dark:border-zinc-800 dark:focus:ring-red-300 dark:ring-offset-zinc-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-zinc-500 dark:text-zinc-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-zinc-800 dark:text-zinc-300 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                formAction={"/auth/login"}
                //  onClick={() =>signInWithEmail(email, password)}
                type="submit"
                className="w-full text-black font-semibold bg-red-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-md text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-zinc-500 dark:text-zinc-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-medium text-zinc-800 dark:text-zinc-300 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
